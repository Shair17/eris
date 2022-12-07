import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Avatar, Icon, Button} from 'react-native-magnus';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../Root';

interface Props
  extends NativeStackScreenProps<StackParamsList, 'ProfileScreen'> {}

export const ProfileScreen: React.FC<Props> = () => {
  return (
    <Div flex={1} p="xl">
      <TouchableOpacity style={{position: 'absolute', right: 24, top: 24}}>
        <Icon fontFamily="Ionicons" name="ios-build-outline" fontSize="5xl" />
      </TouchableOpacity>

      <Div flex={2}>
        <Div
          flex={1}
          bgImg={require('@eris/assets/images/ssspiral.png')}
          bgMode="contain"
          justifyContent="center"
          alignItems="center">
          <Avatar
            rounded="2xl"
            size={150}
            source={{
              uri: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1656661806/avatars/g6geb90zfmvdh97vgaqj.jpg',
            }}
          />
        </Div>
      </Div>
      <Div flex={3}>
        <Div alignItems="center" mt="xl">
          <Text fontWeight="bold" fontSize="6xl">
            Jimmy Morales
          </Text>
          <Text mt="md" fontSize="xl" color="#0083fa">
            hello@shair.dev
          </Text>
        </Div>

        <Div mt="xl">
          <Div
            row
            bg="gray100"
            rounded="2xl"
            p="xl"
            justifyContent="space-between">
            <Text fontSize="lg" color="#0083fa">
              Mis Tiendas
            </Text>
            <Text fontSize="2xl" color="#0083fa" fontWeight="bold">
              2
            </Text>
          </Div>
          <Div
            mt="lg"
            row
            bg="gray100"
            rounded="2xl"
            p="xl"
            justifyContent="space-between">
            <Text fontSize="lg" color="#0083fa">
              Mis Cocheras
            </Text>
            <Text fontSize="2xl" color="#0083fa" fontWeight="bold">
              2
            </Text>
          </Div>
        </Div>
      </Div>
      <Div flex={1} justifyContent="flex-end">
        <Button
          block
          bg="red100"
          borderWidth={5}
          underlayColor="red200"
          borderColor="red200"
          color="red500"
          fontWeight="bold"
          fontSize="2xl"
          rounded="2xl">
          Cerrar sesión
        </Button>
      </Div>
    </Div>
  );
};
