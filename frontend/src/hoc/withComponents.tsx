import { withNamespace, WithNamespaceProps } from "hoc/withNamespace";
import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "types";

const mapStateToProps = (state: RootState, props: WithNamespaceProps) => {
  // const activeNamespace = props.activeNamespace!;

  return {
    // components: state.get("components").get("components").get(activeNamespace.get("name")),
  };
};

export interface WithComponentsProps extends ReturnType<typeof mapStateToProps>, WithNamespaceProps {
  dispatch: ThunkDispatch<RootState, undefined, Actions>;
}

export const withComponents = (WrappedComponent: React.ComponentType<any>) => {
  const withComponents: React.ComponentType<WithComponentsProps> = class extends React.Component<WithComponentsProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  withComponents.displayName = `withComponent(${getDisplayName(WrappedComponent)})`;
  hoistNonReactStatics(withComponents, WrappedComponent);
  return withNamespace(connect(mapStateToProps)(withComponents));
};

function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}