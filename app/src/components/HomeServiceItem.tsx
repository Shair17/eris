import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {AnimatedObject} from './AnimatedObject';

interface Props {
  title: string;
  description: string;
  image: any;
  bg: string;
  border: string;
  text: string;
  onPress: () => void;
}

export const HomeServiceItem: React.FC<Props> = ({
  title,
  description,
  image,
  bg,
  border,
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Div
        bg={bg}
        rounded="2xl"
        borderWidth={5}
        borderColor={border}
        row
        px="lg"
        py="xs"
        alignItems="center"
        justifyContent="space-between">
        <Div flex={1}>
          <Text fontSize="2xl" fontWeight="bold" color={text}>
            {title}
          </Text>
          <Text maxW="90%" color={text}>
            {description}
          </Text>
        </Div>
        <Div>
          <AnimatedObject w={120} h={120} image={image} />
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
