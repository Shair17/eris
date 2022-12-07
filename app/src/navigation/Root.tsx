import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {LoginScreen} from './screens/LoginScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {ProfileScreen} from './screens/ProfileScreen';
import {EditProfileScreen} from './screens/EditProfileScreen';
import {StoresScreen} from './screens/StoresScreen';
import {StoreScreen} from './screens/StoreScreen';
import {GaragesScreen} from './screens/GaragesScreen';
import {GarageScreen} from './screens/GarageScreen';

export type StackParamsList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  GaragesScreen: undefined;
  GarageScreen: {
    id: string;
  };
  StoresScreen: undefined;
  StoreScreen: {
    id: string;
  };

  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamsList>();

export const Root = () => {
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Group
            screenOptions={{
              animation: 'slide_from_right',
              contentStyle: {backgroundColor: '#fff'},
              headerShadowVisible: false,
            }}>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false, animation: 'fade'}}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerShown: false,
                animation: 'fade_from_bottom',
              }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{
                headerShown: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="StoresScreen"
              component={StoresScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="StoreScreen"
              component={StoreScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="GaragesScreen"
              component={GaragesScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="GarageScreen"
              component={GarageScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              animation: 'slide_from_right',
              contentStyle: {backgroundColor: '#fff'},
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
