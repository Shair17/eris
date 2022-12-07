import React from 'react';
import {ScrollView, SafeAreaView, StatusBar, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Div, Image, Text} from 'react-native-magnus';
import {useGreeting} from '@eris/hooks/useGreeting';
import {HomeServiceItem} from '@eris/components/HomeServiceItem';
import {Avatar} from '@eris/components/Avatar';
import {HomeCredits} from '@eris/components/HomeCredits';
import {AnimatedObject} from '@eris/components/AnimatedObject';
import {StackParamsList} from '../Root';

interface Props extends NativeStackScreenProps<StackParamsList, 'HomeScreen'> {}

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const greeting = useGreeting();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Div p="xl">
          <Div row justifyContent="space-between">
            <Div>
              <Text fontSize="5xl" fontWeight="bold">
                {greeting}, Shair
              </Text>
              <Text fontSize="lg" mt="md">
                ¿Qué haremos hoy?
              </Text>
            </Div>
            <Avatar
              onPress={() => navigation.navigate('ProfileScreen')}
              bg="blue200"
              size={50}
              color="blue900"
              source={{
                uri: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1656661806/avatars/g6geb90zfmvdh97vgaqj.jpg',
              }}>
              S
            </Avatar>
          </Div>

          <Div mt="2xl">
            <Text mb="lg" fontSize="3xl" fontWeight="700">
              Principal
            </Text>
            <HomeServiceItem
              title="Ver mis tiendas"
              description="Crea y administra tus tiendas."
              image={require('@eris/assets/images/store.png')}
              bg="indigo100"
              border="indigo200"
              text="indigo900"
              onPress={() => navigation.navigate('StoresScreen')}
            />
            <Div my="md" />
            <HomeServiceItem
              title="Ver mis cocheras"
              description="Crea y administra tus cocheras."
              image={require('@eris/assets/images/garage.png')}
              bg="pink100"
              border="pink200"
              text="pink900"
              onPress={() => navigation.navigate('GaragesScreen')}
            />
          </Div>

          <Div mt="2xl">
            <Text mb="lg" fontSize="3xl" fontWeight="700">
              Atajos rápidos
            </Text>
            <Div>
              <Div row>
                <Div flex={1}>
                  <Div
                    w={150}
                    h={150}
                    bg="orange100"
                    borderColor="orange200"
                    borderWidth={5}
                    rounded="2xl"
                    alignItems="center"
                    justifyContent="center">
                    <AnimatedObject
                      w={100}
                      h={100}
                      image={require('@eris/assets/images/money-bag.png')}
                    />
                    <Text fontWeight="bold" fontSize="3xl" color="orange900">
                      Ganancias
                    </Text>
                  </Div>
                </Div>
                <Div flex={1}>
                  <Div
                    w={150}
                    h={150}
                    bg="green100"
                    borderColor="green200"
                    borderWidth={5}
                    rounded="2xl"
                    alignItems="center"
                    justifyContent="center">
                    <AnimatedObject
                      w={100}
                      h={100}
                      image={require('@eris/assets/images/green-book.png')}
                    />
                    <Text fontWeight="bold" fontSize="3xl" color="green900">
                      Ventas
                    </Text>
                  </Div>
                </Div>
              </Div>
              <Div row mt="xl">
                <Div flex={1}>
                  <Div
                    w={150}
                    h={150}
                    bg="red100"
                    borderColor="red200"
                    borderWidth={5}
                    rounded="2xl"
                    alignItems="center"
                    justifyContent="center">
                    <AnimatedObject
                      w={100}
                      h={100}
                      image={require('@eris/assets/images/fire.png')}
                    />
                    <Text fontWeight="bold" fontSize="3xl" color="red900">
                      Tendencia
                    </Text>
                  </Div>
                </Div>
                <Div flex={1}>
                  <Div
                    w={150}
                    h={150}
                    bg="teal100"
                    borderColor="teal200"
                    borderWidth={5}
                    rounded="2xl"
                    alignItems="center"
                    justifyContent="center">
                    <AnimatedObject
                      w={100}
                      h={100}
                      image={require('@eris/assets/images/box.png')}
                    />
                    <Text fontWeight="bold" fontSize="3xl" color="teal900">
                      Descargas
                    </Text>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>

          <Div mt="2xl">
            <Text mb="lg" fontSize="3xl" fontWeight="700">
              Acerca de Eris
            </Text>
            <Div>
              <Text>
                <Text fontWeight="bold">Eris</Text> es una aplicación que te
                facilita administrar tu tienda(s) y/o cochera(s).
              </Text>
            </Div>
          </Div>

          <HomeCredits />
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
};
