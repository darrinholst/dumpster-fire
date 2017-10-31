import {AuthActions} from './auth.actions';

const userReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.AUTHENTICATED:
      return Object.assign({}, action.payload);

    case AuthActions.LOGIN_FAILURE:
    case AuthActions.NOT_AUTHENTICATED:
      return null;
  }

  return state;
};

const loginReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {};

    case AuthActions.LOGIN_FAILURE:
      return {failure: action.payload};
  }

  return state;
};

export const authReducers = {
  user: userReducer,
  login: loginReducer
};
