import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../Root';

interface Props
  extends NativeStackScreenProps<StackParamsList, 'GaragesScreen'> {}

export const GaragesScreen: React.FC<Props> = ({navigation, route}) => {
  return null;
};
