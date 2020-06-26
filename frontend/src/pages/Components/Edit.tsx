import { Box, createStyles, Grid, Theme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import { push } from "connected-react-router";
import { BasePage } from "pages/BasePage";
import { createComponentAction } from "actions/application";
import { ComponentLike } from "types/componentTemplate";
import { Namespaces } from "widgets/Namespaces";
import { ApplicationSidebar } from "pages/Application/ApplicationSidebar";
import { H4 } from "widgets/Label";
import { ComponentLikeForm } from "forms/ComponentLike";
import { connect } from "react-redux";
import { withComponent, WithComponentProp } from "hoc/withComponent";

const styles = (theme: Theme) =>
  createStyles({
    secondHeaderRight: {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      paddingLeft: 20,
    },
  });

interface Props extends WithStyles<typeof styles>, WithComponentProp {}

class ComponentEditRaw extends React.PureComponent<Props> {
  private submit = async (formValues: ComponentLike) => {
    const { dispatch, activeNamespaceName } = this.props;
    return await dispatch(createComponentAction(formValues, activeNamespaceName));
  };

  private onSubmitSuccess = () => {
    const { dispatch, activeNamespaceName } = this.props;
    dispatch(push(`/applications/${activeNamespaceName}/components`));
  };

  public render() {
    const { classes, component } = this.props;
    return (
      <BasePage
        secondHeaderLeft={<Namespaces />}
        leftDrawer={<ApplicationSidebar />}
        secondHeaderRight={
          <div className={classes.secondHeaderRight}>
            <H4>Edit {component!.get("name")} Component</H4>
          </div>
        }
      >
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <ComponentLikeForm
                initialValues={component}
                onSubmit={this.submit}
                onSubmitSuccess={this.onSubmitSuccess}
              />
            </Grid>
          </Grid>
        </Box>
      </BasePage>
    );
  }
}

export const ComponentEdit = withComponent(withStyles(styles)(connect()(ComponentEditRaw)));
