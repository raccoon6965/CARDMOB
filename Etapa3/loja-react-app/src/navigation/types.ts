import { NavigatorScreenParams } from '@react-navigation/native';

export type AppTabParamList = {
  Catalog: undefined,
  Cart: undefined,
  Settings: undefined,
};

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList>;
  Details: { itemId: number };
  Checkout: undefined;
}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
}