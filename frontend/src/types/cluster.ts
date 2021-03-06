import { SSOConfig } from "types/sso";

export const LOAD_CLUSTER_INFO_PENDING = "LOAD_CLUSTER_INFO_PENDING";
export const LOAD_CLUSTER_INFO_FULFILLED = "LOAD_CLUSTER_INFO_FULFILLED";
export const LOAD_CLUSTER_INFO_FAILED = "LOAD_CLUSTER_INFO_FAILED";

export const LOAD_EXTRA_INFO_PENDING = "LOAD_EXTRA_INFO_PENDING";
export const LOAD_EXTRA_INFO_FULFILLED = "LOAD_EXTRA_INFO_FULFILLED";
export const LOAD_EXTRA_INFO_FAILED = "LOAD_EXTRA_INFO_FAILED";

export interface ClusterInfo {
  ingressIP: string;
  ingressHostname: string;
  httpPort: number;
  httpsPort: number;
  tlsPort: number;
  version: string;
  canBeInitialized: boolean;
  isProduction: boolean;
  kubernetesVersion: {
    buildDate: string;
    compiler: string;
    gitCommit: string;
    gitTreeState: string;
    gitVersion: string;
    goVersion: string;
    platform: string;
  };
  kalmVersion: {
    buildDate: string;
    compiler: string;
    gitCommit: string;
    gitTreeState: string;
    gitVersion: string;
    goVersion: string;
    platform: string;
  };
}

export type TemporaryAdmin = {
  username: string;
  password: string;
  email: string;
};

export type InitializeClusterResponse = {
  clusterInfo: ClusterInfo;
  temporaryAdmin: TemporaryAdmin;
  sso: SSOConfig;
};

export interface LoadClusterInfoFulfilledAction {
  type: typeof LOAD_CLUSTER_INFO_FULFILLED;
  payload: ClusterInfo;
}

export interface LoadClusterInfoStatusAction {
  type: typeof LOAD_CLUSTER_INFO_PENDING | typeof LOAD_CLUSTER_INFO_FAILED;
}

export type ClusterActions = LoadClusterInfoStatusAction | LoadClusterInfoFulfilledAction;
