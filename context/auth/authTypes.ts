import { ActionTypes } from "../actionTypes";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export interface Session {
  user: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  login_date: string;
  expire: string;
  refresh_expire: string;
}

export interface Permissions {
  // Define permissions properties
}

// Define the state interface

export interface AuthState {
  showAlert: boolean;
  alertText: string;
  alertType: string;
  isStorageLoading: boolean;
  user: User | null;
  session: Session | null;
  permissions: Permissions | null;
}

export interface DisplayAlertAction {
  type: ActionTypes.DISPLAY_ALERT;
  payload: {
    alertType: string;
    alertText: string;
  };
}

export interface ClearAlertAction {
  type: ActionTypes.CLEAR_ALERT;
}

export interface LoginUserSuccessAction {
  type: ActionTypes.LOGIN_USER_SUCCESS;
  payload: {
    user: User;
    session: Session;
    permissions: Permissions | null;
  };
}

export interface RegenerateAccessTokenAction {
  type: ActionTypes.REGENERATE_ACCESS_TOKEN;
  payload: Session;
}

export interface LogoutUserAction {
  type: ActionTypes.LOGOUT_USER;
}

export interface UpdateUserBasicInfoAction {
  type: ActionTypes.UPDATE_USER_BASIC_INFO;
  payload: {
    value: Partial<User>;
  };
}

export interface SetStorageLoadingAction {
  type: ActionTypes.SET_STORAGE_LOADING;
  payload: boolean;
}

export interface SetInitialStateAction {
  type: ActionTypes.SET_INITIAL_STATE;
  payload: {
    user: User | null;
    session: Session | null;
    permissions: Permissions | null;
  };
}

export type AuthAction =
  | DisplayAlertAction
  | ClearAlertAction
  | LoginUserSuccessAction
  | RegenerateAccessTokenAction
  | LogoutUserAction
  | UpdateUserBasicInfoAction
  | SetStorageLoadingAction
  | SetInitialStateAction;

export interface AuthContextProps extends AuthState {
  regenerateTokens: (
    newAccessToken: string,
    newRefreshToken: string,
    expire: string,
    refresh_expire: string,
  ) => void;
  logoutUser: () => Promise<void>;
  setLoginUserSuccess: (
    user: User,
    session: Session,
    permissions: Permissions | null,
  ) => void;
  displayAlert: (alertType: string, alertText: string) => void;
  clearAlert: () => void;
  updateUserBasicInfo: (value: Partial<User>) => void;
}
