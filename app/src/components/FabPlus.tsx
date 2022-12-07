import React from 'react';
import {Button, Div, Icon} from 'react-native-magnus';

interface Props {
  onPress: () => void;
}

export const FabPlus: React.FC<Props> = ({onPress}) => {
  return (
    <Div position="absolute" bottom={24} right={24}>
      <Button
        p={0}
        onPress={onPress}
        rounded="circle"
        bg="#0083fa"
        shadow="md"
        w={50}
        h={50}
        justifyContent="center"
        alignItems="center"
        alignSelf="center">
        <Icon
          fontFamily="Ionicons"
          name="add"
          fontSize="6xl"
          color="white"
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        />
      </Button>
    </Div>
  );
};
