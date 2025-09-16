import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
    Catalog: undefined,
    Settings: undefined,
    Register: undefined,
};

export type RootStackParamList = {
    Tabs: undefined;
    Details: undefined;
    Login: undefined;
}

export type AuthTabParamList = {
    Home: undefined;
    Settings: undefined;
}

export type AuthStackParamList = {
    Tabs: NavigatorScreenParams<AuthTabParamList>;
    Details: { itemId: number };
}