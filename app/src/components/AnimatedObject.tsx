import React, {FC} from 'react';
import {Image} from 'react-native-magnus';
import * as Animatable from 'react-native-animatable';

interface Props {
  duration?: number;
  image: any;
  w?: number;
  h?: number;
  bg?: string;
}

export const AnimatedObject: FC<Props> = ({
  duration = 2000,
  image,
  w = 100,
  h = 100,
  bg = undefined,
}) => {
  return (
    <Animatable.View
      animation={
        {
          from: {
            // translateY: -5,
            rotate: '0deg',
          },
          to: {
            // translateY: 0,
            rotate: '5deg',
          },
        } as any
      }
      duration={duration}
      iterationCount="infinite"
      easing="ease-in-out"
      direction="alternate"
      useNativeDriver>
      <Image source={image} w={w} h={h} resizeMode="contain" bg={bg} />
    </Animatable.View>
  );
};
