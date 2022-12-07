import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Text, Avatar, Icon, Button} from 'react-native-magnus';
import {StackParamsList} from '../Root';

interface Props
  extends NativeStackScreenProps<StackParamsList, 'EditProfileScreen'> {}

export const EditProfileScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <Div flex={1}>
      <Text>EditProfileScreen</Text>
    </Div>
  );
};
