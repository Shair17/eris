import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../Root';

interface Props
  extends NativeStackScreenProps<StackParamsList, 'LoginScreen'> {}

export const LoginScreen: React.FC<Props> = () => {
  return null;
};
