import React, {
  useReducer,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './authReducer';
import {ActionTypes} from '../actionTypes';
import {
  AuthState,
  User,
  Session,
  Permissions,
  AuthContextProps,
} from './authTypes';

const initialState: AuthState = {
  showAlert: false,
  alertText: '',
  alertType: '',
  isStorageLoading: true,
  user: null,
  session: null,
  permissions: null,
};

const AuthContext = createContext<AuthContextProps>({
  ...initialState,
  regenerateTokens: () => {},
  logoutUser: async () => {},
  setLoginUserSuccess: () => {},
  displayAlert: () => {},
  clearAlert: () => {},
  updateUserBasicInfo: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const getStorageData = async () => {
      try {
        const storageUser = await AsyncStorage.getItem('cd_user');
        const storageSession = await AsyncStorage.getItem('cd_session');
        const storagePermissions = await AsyncStorage.getItem('cd_permissions');
        dispatch({
          type: ActionTypes.SET_INITIAL_STATE,
          payload: {
            user: storageUser ? JSON.parse(storageUser) : null,
            session: storageSession ? JSON.parse(storageSession) : null,
            permissions: storagePermissions
              ? JSON.parse(storagePermissions)
              : null,
          },
        });
      } catch (e) {
        console.error('Error loading data from AsyncStorage:', e);
      }
    };
    getStorageData();
  }, []);

  const removeUserFromAsyncStorage = async () => {
    try {
      await AsyncStorage.multiRemove([
        'cd_user',
        'cd_session',
        'cd_permissions',
        'cd_settings',
      ]);
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };

  const displayAlert = (alertType: string, alertText: string) => {
    dispatch({
      type: ActionTypes.DISPLAY_ALERT,
      payload: {alertType, alertText},
    });
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: ActionTypes.CLEAR_ALERT});
    }, 3000);
  };

  const updateUserBasicInfo = (value: Partial<User>) => {
    dispatch({type: ActionTypes.UPDATE_USER_BASIC_INFO, payload: {value}});
    AsyncStorage.getItem('cd_user').then(currentUserDataString => {
      const currentUserData = currentUserDataString
        ? JSON.parse(currentUserDataString)
        : {};
      const updatedUserData = {
        ...currentUserData,
        ...value,
      };
      AsyncStorage.setItem('cd_user', JSON.stringify(updatedUserData));
    });
  };

  const setLoginUserSuccess = (
    user: User,
    session: Session,
    permissions: Permissions | null,
  ) => {
    dispatch({
      type: ActionTypes.LOGIN_USER_SUCCESS,
      payload: {user, session, permissions},
    });

    AsyncStorage.setItem('cd_user', JSON.stringify(user));
    AsyncStorage.setItem('cd_session', JSON.stringify(session));
    AsyncStorage.setItem('cd_permissions', JSON.stringify(permissions));
  };

  const regenerateTokens = (
    newAccessToken: string,
    newRefreshToken: string,
    expire: string,
    refresh_expire: string,
  ) => {
    const existingSession = state.session;
    if (existingSession) {
      const updatedSession: Session = {
        ...existingSession,
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expire: expire,
        refresh_expire: refresh_expire,
      };
      dispatch({
        type: ActionTypes.REGENERATE_ACCESS_TOKEN,
        payload: updatedSession,
      });
      AsyncStorage.setItem('cd_session', JSON.stringify(updatedSession));
    } else {
      console.error('No existing session data found.');
    }
  };
  const logoutUser = async () => {
    dispatch({type: ActionTypes.LOGOUT_USER});
    await removeUserFromAsyncStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        regenerateTokens,
        logoutUser,
        setLoginUserSuccess,
        displayAlert,
        clearAlert,
        updateUserBasicInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export {AuthProvider, initialState, useAuthContext};
