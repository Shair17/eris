import React, {useState} from 'react';
import {Div, Text, Overlay, Input, Button, Icon} from 'react-native-magnus';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {FabPlus} from '@eris/components/FabPlus';
import {TopTabStackParamsList} from './StoreScreen';
import {TouchableOpacity} from 'react-native';
import {generateRandomColor} from '@eris/utils/colors';
import {FlashList} from '@shopify/flash-list';

const DATA = [...Array(100).keys()];

interface Props
  extends MaterialTopTabScreenProps<TopTabStackParamsList, 'ProductsScreen'> {}

export const ProductsScreen: React.FC<Props> = ({navigation, route}) => {
  const [addProductModal, setAddProductModal] = useState(false);
  const storeId = route.params.storeId;

  return (
    <Div flex={1}>
      <FlashList
        ListHeaderComponent={() => {
          return (
            <Div p="xl">
              <Div>
                <Text fontSize="3xl" fontWeight="600">
                  Tienes 4 productos en{' '}
                  <Text color="#0083fa" fontSize="3xl" fontWeight="bold">
                    Nombre de mi Tienda
                  </Text>
                </Text>
                <Text fontWeight="300" fontSize="sm">
                  Presiona el botón azul para agregar otro producto
                </Text>
              </Div>
            </Div>
          );
        }}
        data={DATA}
        renderItem={({item, index}) => {
          const generatedColor = generateRandomColor();
          const isLastItem = index === DATA.length - 1;

          return (
            <TouchableOpacity activeOpacity={0.8}>
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

      <FabPlus onPress={() => setAddProductModal(true)} />

      {addProductModal ? (
        <Overlay
          visible={addProductModal}
          p="xl"
          rounded="xl"
          bg="white"
          animationType="fade"
          onBackdropPress={() => setAddProductModal(false)}>
          <Input
            rounded="2xl"
            placeholder="Nombre cool de tu tienda 😎⚡"
            maxLength={32}
            borderColor="#0083fa"
            autoFocus
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
    </Div>
  );
};
