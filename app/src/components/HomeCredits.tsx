import React from 'react';
import {TouchableOpacity, Linking, ToastAndroid} from 'react-native';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {Div, Text, Icon} from 'react-native-magnus';

export const HomeCredits = () => {
  const [, setClipboard] = useClipboard();

  const handleCopyEmail = () => {
    setClipboard('hello@shair.dev');
    ToastAndroid.show(
      'Correo electrónico de shair copiado al portapapeles',
      1000,
    );
  };

  return (
    <Div mt="2xl">
      <Text mb="lg" fontSize="3xl" fontWeight="700">
        Créditos
      </Text>
      <Div>
        <Div row>
          <Text>Aplicación desarrollada por</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://shair.dev')}>
            <Text color="#0083fa" fontWeight="bold">
              {' '}
              Shair
            </Text>
          </TouchableOpacity>
          <Text>.</Text>
        </Div>

        <Div my="xl" row justifyContent="space-evenly">
          <TouchableOpacity activeOpacity={0.8} onPress={handleCopyEmail}>
            <Icon fontFamily="Ionicons" name="mail" fontSize="6xl" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://shair.dev/linkedin')}>
            <Icon fontFamily="Ionicons" name="logo-linkedin" fontSize="6xl" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://shair.dev/github')}>
            <Icon fontFamily="Ionicons" name="logo-github" fontSize="6xl" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://shair.dev/instagram')}>
            <Icon fontFamily="Ionicons" name="logo-instagram" fontSize="6xl" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://shair.dev/youtube')}>
            <Icon fontFamily="Ionicons" name="logo-youtube" fontSize="6xl" />
          </TouchableOpacity>
        </Div>
      </Div>
    </Div>
  );
};
