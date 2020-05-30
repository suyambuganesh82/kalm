import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import { createRoute } from "actions/routes";
import { push } from "connected-react-router";
import { RouteForm } from "forms/Route";
import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AllHttpMethods, HttpRouteForm, methodsModeAll, newEmptyRouteForm } from "types/route";
import { ApplicationViewDrawer } from "widgets/ApplicationViewDrawer";
import { RootState } from "../../reducers";
import { Actions } from "../../types";
import { BasePage } from "../BasePage";
import { Namespaces } from "widgets/Namespaces";
import Container from "@material-ui/core/Container";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  dispatch: ThunkDispatch<RootState, undefined, Actions>;
}

class RouteNewRaw extends React.PureComponent<Props> {
  private submit = async (route: HttpRouteForm) => {
    try {
      if (route.get("methodsMode") === methodsModeAll) {
        route = route.set("methods", AllHttpMethods);
      }
      await this.props.dispatch(createRoute(route.get("name"), route.get("namespace"), route));
      this.props.dispatch(push("/routes"));
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    return (
      <BasePage leftDrawer={<ApplicationViewDrawer />} secondHeaderLeft={<Namespaces />}>
        <Container className={this.props.classes.root} maxWidth="lg">
          <RouteForm onSubmit={this.submit} initialValues={newEmptyRouteForm()} />
        </Container>
      </BasePage>
    );
  }
}

export const RouteNew = withStyles(styles)(connect()(RouteNewRaw));
