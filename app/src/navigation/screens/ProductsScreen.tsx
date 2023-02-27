import React, {useState} from 'react';
import {
  Div,
  Text,
  Overlay,
  Input,
  Button,
  Icon,
  Toggle,
  Radio,
} from 'react-native-magnus';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {FabPlus} from '@eris/components/FabPlus';
import {TopTabStackParamsList} from './StoreScreen';
import {TouchableOpacity} from 'react-native';
import {generateRandomColor} from '@eris/utils/colors';
import {FlashList} from '@shopify/flash-list';

// name        String
// price       Float     @default(0)
// blurHash    String
// description String?
// note        String?
// image       String
// available   Boolean   @default(true)
// stock       Float     @default(0)
// stockType   UNIDAD | KILOGRAMOS

const DATA = [...Array(10).keys()];

interface Props
  extends MaterialTopTabScreenProps<TopTabStackParamsList, 'ProductsScreen'> {}

export const ProductsScreen: React.FC<Props> = ({navigation, route}) => {
  const [addProductModal, setAddProductModal] = useState<boolean>(false);
  const [productAvailable, setProductAvailable] = useState<boolean>(false);
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
          <Div row justifyContent="space-between" alignItems="center">
            <Div
              bgImg={{
                uri: 'https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1631005766/defaults/avatars/fastly_mwizrt.jpg',
              }}
              w={50}
              h={50}
              rounded="2xl"
            />

            <Div mx="xs" />

            <Input
              flex={1}
              rounded="2xl"
              placeholder="Nombre del producto"
              maxLength={32}
              borderColor="#0083fa"
              autoFocus
            />
          </Div>

          <Input
            mt="lg"
            rounded="2xl"
            placeholder="Precio del producto"
            maxLength={32}
            borderColor="#0083fa"
          />

          <Div row mt="lg" justifyContent="space-between">
            <Input
              flex={1}
              rounded="2xl"
              placeholder="Descripción"
              maxLength={32}
              borderColor="#0083fa"
            />

            <Div mx="xs" />

            <Input
              flex={1}
              rounded="2xl"
              placeholder="Nota"
              maxLength={32}
              borderColor="#0083fa"
            />
          </Div>

          <Div mt="lg" row justifyContent="space-between">
            <Input
              flex={1}
              rounded="2xl"
              placeholder="Stock"
              maxLength={32}
              borderColor="#0083fa"
            />

            <Div mx="xs" />

            <Div alignItems="center" justifyContent="center">
              <Radio.Group row>
                {['UNIDAD', 'KG'].map(item => (
                  <Radio value={item}>
                    {({checked}) => (
                      <Div
                        alignItems="center"
                        justifyContent="center"
                        bg={checked ? 'blue600' : 'blue100'}
                        p="md"
                        rounded="2xl">
                        <Text color={checked ? 'white' : 'gray800'}>
                          {item}
                        </Text>
                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>
          </Div>

          <Div mt="lg" row justifyContent="space-between">
            <Text fontSize="lg">¿El producto está disponible?</Text>
            <Toggle
              on={productAvailable}
              onPress={() => setProductAvailable(!productAvailable)}
              bg="gray200"
              circleBg="blue500"
              activeBg="blue700"
              h={25}
              w={50}
            />
          </Div>

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
            Agregar producto
          </Button>
        </Overlay>
      ) : null}
    </Div>
  );
};
