import React, {Fragment} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text} from 'react-native-magnus';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '@eris/components/Header';
import {ProductsScreen} from './ProductsScreen';
import {SalesScreen} from './SalesScreen';
import {StackParamsList} from '../Root';

interface Props
  extends NativeStackScreenProps<StackParamsList, 'StoreScreen'> {}

export type TopTabStackParamsList = {
  ProductsScreen: {
    storeId: string;
  };
  SalesScreen: {
    storeId: string;
  };
};

const Tab = createMaterialTopTabNavigator<TopTabStackParamsList>();

export const StoreScreen: React.FC<Props> = ({navigation, route}) => {
  const storeId = route.params.id;

  return (
    <Fragment>
      <Div flex={1}>
        <Header
          onGoBackPress={() => navigation.goBack()}
          title="Nombre de mi Tienda"
        />

        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: 'white'}}
          screenOptions={{tabBarPressColor: 'transparent'}}>
          <Tab.Screen
            name="ProductsScreen"
            component={ProductsScreen}
            initialParams={{
              storeId,
            }}
            options={{
              title: 'Productos',
              tabBarLabelStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Tab.Screen
            name="SalesScreen"
            component={SalesScreen}
            initialParams={{
              storeId,
            }}
            options={{
              title: 'Ventas',
              tabBarLabelStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Tab.Navigator>
      </Div>
    </Fragment>
  );
};
