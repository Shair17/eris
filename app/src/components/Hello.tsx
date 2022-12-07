import React from 'react';
import {Text, View} from 'react-native';
import {trpc} from '../modules/trpc/client';

export const Hello = () => {
  const hello = trpc.getVehicles.useQuery();

  return (
    <View>
      <Text>{JSON.stringify(hello.data)}</Text>
    </View>
  );
};
