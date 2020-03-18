/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.15.5
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
* ResourceAttributes includes the authorization attributes available for resource requests to the Authorizer interface
*/
export class V1beta1ResourceAttributes {
    /**
    * Group is the API Group of the Resource.  \"*\" means all.
    */
    'group'?: string;
    /**
    * Name is the name of the resource being requested for a \"get\" or deleted for a \"delete\". \"\" (empty) means all.
    */
    'name'?: string;
    /**
    * Namespace is the namespace of the action being requested.  Currently, there is no distinction between no namespace and all namespaces \"\" (empty) is defaulted for LocalSubjectAccessReviews \"\" (empty) is empty for cluster-scoped resources \"\" (empty) means \"all\" for namespace scoped resources from a SubjectAccessReview or SelfSubjectAccessReview
    */
    'namespace'?: string;
    /**
    * Resource is one of the existing resource types.  \"*\" means all.
    */
    'resource'?: string;
    /**
    * Subresource is one of the existing resource types.  \"\" means none.
    */
    'subresource'?: string;
    /**
    * Verb is a kubernetes resource API verb, like: get, list, watch, create, update, delete, proxy.  \"*\" means all.
    */
    'verb'?: string;
    /**
    * Version is the API Version of the Resource.  \"*\" means all.
    */
    'version'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "group",
            "baseName": "group",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "namespace",
            "baseName": "namespace",
            "type": "string"
        },
        {
            "name": "resource",
            "baseName": "resource",
            "type": "string"
        },
        {
            "name": "subresource",
            "baseName": "subresource",
            "type": "string"
        },
        {
            "name": "verb",
            "baseName": "verb",
            "type": "string"
        },
        {
            "name": "version",
            "baseName": "version",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return V1beta1ResourceAttributes.attributeTypeMap;
    }
}
