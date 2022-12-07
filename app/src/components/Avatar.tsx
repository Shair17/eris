import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Avatar as MagnusAvatar, AvatarProps} from 'react-native-magnus';

interface Props extends AvatarProps {
  onPress: () => void;
}

export const Avatar: React.FC<Props> = ({onPress, ...restOfProps}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <MagnusAvatar {...restOfProps} />
    </TouchableOpacity>
  );
};
