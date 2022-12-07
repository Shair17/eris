import React, {useState, Fragment} from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text, Icon, Button, Overlay, Input} from 'react-native-magnus';
import {FlashList} from '@shopify/flash-list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from '@eris/components/Header';
import {generateRandomColor} from '@eris/utils/colors';
import {StackParamsList} from '../Root';

const DATA = [...Array(100).keys()];

interface Props
  extends NativeStackScreenProps<StackParamsList, 'StoresScreen'> {}

export const StoresScreen: React.FC<Props> = ({navigation}) => {
  const [addStoreModal, setAddStoreModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState<string>('');

  return (
    <Fragment>
      <Div flex={1}>
        <Header onGoBackPress={() => navigation.goBack()} title="Mis Tiendas" />

        <FlashList
          ListHeaderComponent={() => {
            return (
              <Div p="xl">
                <Text fontSize="3xl" fontWeight="bold">
                  Crea y Administra tus Tiendas
                </Text>
                <Button
                  onPress={() => setAddStoreModal(true)}
                  mt="lg"
                  bg="blue100"
                  color="blue900"
                  borderWidth={2}
                  rounded="2xl"
                  fontWeight="bold"
                  block
                  borderColor="blue500"
                  textTransform="uppercase"
                  prefix={
                    <Icon
                      fontFamily="Feather"
                      name="plus"
                      fontSize="2xl"
                      color="blue900"
                      mr="xs"
                    />
                  }>
                  Agregar una Tienda
                </Button>
              </Div>
            );
          }}
          data={DATA}
          renderItem={({item, index}) => {
            const generatedColor = generateRandomColor();
            const isLastItem = index === DATA.length - 1;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('StoreScreen', {
                    id: 'TODO',
                  })
                }>
                <Div mx="xl" my="lg" mb={isLastItem ? 128 : 'lg'}>
                  <Div
                    rounded="2xl"
                    borderWidth={4}
                    borderColor={generatedColor}
                    row
                    p="xl"
                    alignItems="center"
                    justifyContent="space-between"
                    overflow="hidden">
                    <Div
                      roundedBottom="circle"
                      position="absolute"
                      top={-1}
                      left={-1}
                      w={30}
                      h={30}
                      justifyContent="center"
                      alignItems="center"
                      bg={generatedColor}>
                      <Text fontWeight="bold" fontSize="xs">
                        {index + 1}
                      </Text>
                    </Div>
                    <Div flex={2}>
                      <Text fontWeight="bold" fontSize="2xl" numberOfLines={1}>
                        Nombre de mi tienda
                      </Text>
                    </Div>
                    <Div alignItems="flex-end" justifyContent="center">
                      <Text color="black" fontWeight="600">
                        10 productos
                      </Text>
                      <Text color="black">500 ventas</Text>
                    </Div>
                  </Div>
                </Div>
              </TouchableOpacity>
            );
          }}
          estimatedItemSize={100}
        />
      </Div>

      {addStoreModal ? (
        <Overlay
          visible={addStoreModal}
          p="xl"
          rounded="xl"
          bg="white"
          animationType="fade"
          onBackdropPress={() => setAddStoreModal(false)}>
          <Input
            rounded="2xl"
            placeholder="Nombre cool de tu tienda 😎⚡"
            maxLength={32}
            borderColor="#0083fa"
            autoFocus
            value={newStoreName}
            onChangeText={name => setNewStoreName(name)}
          />
          <Button
            h={50}
            block
            mt="lg"
            rounded="2xl"
            bg="#0083fa"
            fontWeight="bold"
            textTransform="uppercase"
            suffix={
              <Icon
                ml="xs"
                fontFamily="Ionicons"
                name="arrow-forward"
                color="white"
                fontSize="xl"
              />
            }>
            Crear mi Tienda
          </Button>
        </Overlay>
      ) : null}
    </Fragment>
  );
};
