import React from 'react';
import {Div, Icon, Text} from 'react-native-magnus';
import {TouchableOpacity} from 'react-native';

interface Props {
  onGoBackPress: () => void;
  title: string;
}

export const Header: React.FC<Props> = ({onGoBackPress, title}) => {
  return (
    <Div
      px="xl"
      h={50}
      justifyContent="center"
      bg="white"
      borderBottomWidth={1}
      borderBottomColor="gray100">
      <Div alignItems="center" row>
        <TouchableOpacity activeOpacity={0.8} onPress={onGoBackPress}>
          <Icon
            fontFamily="Ionicons"
            name="arrow-back"
            fontSize="4xl"
            color="black"
          />
        </TouchableOpacity>
        <Text fontWeight="bold" fontSize="3xl" ml="lg" numberOfLines={1}>
          {title}
        </Text>
        <Div />
      </Div>
    </Div>
  );
};
