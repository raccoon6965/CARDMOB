import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RootStackParamList, TabParamList } from './types';
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import CatalogScreen from "../screens/catalog/CatalogScreen";

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, focused, size }) => {
                let iconName: string | undefined;

                if (route.name === "Catalog") {
                  iconName = "tags";
                } else if (route.name === "Settings") {
                  iconName = "cog";
                } else if (route.name === "Register") {
                  iconName = "user-plus";
                }

                return iconName ? (
                    <FontAwesome name={iconName as keyof typeof FontAwesome.glyphMap} size={size} color={color} />
                  ) : null;
              },
              tabBarActiveTintColor: "red",
              tabBarInactiveTintColor: "grey",
              headerShown: false,
            })}
          >
            <Tab.Screen 
              name="Catalog"
              component={CatalogScreen}
              options={{ title: 'Menu' }}
            />
            <Tab.Screen name="Settings" component={HomeScreen} />
            <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
    );
}

function StackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <AppStack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <StackNavigator />
  );
};