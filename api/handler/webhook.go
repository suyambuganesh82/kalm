package handler

import (
	"fmt"
	"github.com/kalmhq/kalm/api/resources"
	"github.com/kalmhq/kalm/controller/controllers"
	"github.com/labstack/echo/v4"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd/api"
	"net/http"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"strconv"
	"strings"
	"time"
)

type DeployWebhookCallParams struct {
	DeployKey     string `json:"deployKey"`
	Namespace     string `json:"application"`
	ComponentName string `json:"componentName"`
	ImageTag      string `json:"imageTag"`
}

func (h *ApiHandler) handleDeployWebhookCall(c echo.Context) error {
	var callParams DeployWebhookCallParams

	if err := c.Bind(&callParams); err != nil {
		return err
	}

	if callParams.DeployKey == "" {
		return fmt.Errorf("deployKey can't be blank")
	}

	if callParams.Namespace == "" {
		return fmt.Errorf("application can't be blank")
	}

	if callParams.ComponentName == "" {
		return fmt.Errorf("componentName can't be blank")
	}

	deployKeyConfig, err := h.clientManager.GetClientConfigWithAuthInfo(
		&api.AuthInfo{Token: callParams.DeployKey},
	)

	if err != nil {
		return err
	}

	deployKeyClient, err := kubernetes.NewForConfig(deployKeyConfig)

	if err != nil {
		return err
	}

	builder := resources.NewBuilder(deployKeyClient, deployKeyConfig, h.logger)

	if builder == nil {
		return fmt.Errorf("invalid deploy key")
	}

	crdComp, err := builder.GetComponent(callParams.Namespace, callParams.ComponentName)

	if err != nil {
		return err
	}

	copiedComp := crdComp.DeepCopy()

	if callParams.ImageTag != "" {
		newImg := replaceImageTag(crdComp.Spec.Image, callParams.ImageTag)
		copiedComp.Spec.Image = newImg
	}

	if copiedComp.Annotations == nil {
		copiedComp.Annotations = make(map[string]string)
	}

	updateTs := int(time.Now().Unix())
	copiedComp.Annotations[controllers.AnnoLastUpdatedByWebhook] = strconv.Itoa(updateTs)

	if err := builder.Patch(copiedComp, client.MergeFrom(crdComp)); err != nil {
		h.logger.Infof("fail updating component: %s at %d", copiedComp.Name, updateTs)
		return err
	}

	h.logger.Infof("updating component: %s at %d", copiedComp.Name, updateTs)

	return c.JSON(http.StatusOK, map[string]string{
		"status": "Success",
	})
}

// controller/foo,    v1 -> controller/foo:v1
// controller/foo:v2, v3 -> controller/foo:v3
func replaceImageTag(image string, tag string) string {
	sepIdx := strings.LastIndex(image, ":")
	if sepIdx == -1 {
		return image + ":" + tag
	}

	parts := strings.Split(image, ":")
	parts[len(parts)-1] = tag

	return strings.Join(parts, ":")
}