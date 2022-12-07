import React from 'react';
import {Div, Text} from 'react-native-magnus';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {TopTabStackParamsList} from './StoreScreen';

interface Props
  extends MaterialTopTabScreenProps<TopTabStackParamsList, 'SalesScreen'> {}

export const SalesScreen: React.FC<Props> = ({navigation, route}) => {
  const storeId = route.params.storeId;

  return (
    <Div flex={1}>
      <Div p="xl">
        <Text>Hola</Text>
      </Div>
    </Div>
  );
};
