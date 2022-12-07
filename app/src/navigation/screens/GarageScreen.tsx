import React, {Fragment} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text} from 'react-native-magnus';
import {Header} from '@eris/components/Header';
import {StackParamsList} from '../Root';

interface Props
  extends NativeStackScreenProps<StackParamsList, 'GarageScreen'> {}

export const GarageScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <Fragment>
      <Header onGoBackPress={() => navigation.goBack()} title="Mi cochera" />
    </Fragment>
  );
};
