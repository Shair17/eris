import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {Box, Text, Input, Icon, Button, Image} from 'react-native-magnus';
import api from '../../api';
import {useTokenStore, setTokensSelector} from '../../stores/useTokensStore';

export const OnBoardingStack = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setTokens = useTokenStore(setTokensSelector);

  const disabled = email === '' || password === '' || isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const {data, status} = await api.post('/auth/login', {
        email,
        password,
      });

      if (status === 200) {
        const {accessToken, refreshToken} = data;

        setTokens({
          accessToken,
          refreshToken,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error al ingresar', 'Por favor verifica tus datos.');
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Box flex={1} bg="white">
          <Box>
            <Box alignSelf="center" justifyContent="center" py={20} pb={40}>
              <Image
                source={require('../../assets/images/logo.png')}
                resizeMode="center"
                alignSelf="center"
                w={80}
                h={80}
              />
              <Text fontWeight="bold" fontSize="6xl" fontStyle="italic">
                Shopox
              </Text>
            </Box>
            <Box px={20}>
              <Text mb={5}>Correo electrónico</Text>
              <Input
                autoCapitalize="none"
                rounded="lg"
                keyboardType="email-address"
                value={email}
                onChangeText={e => setEmail(e)}
              />
            </Box>
            <Box m={15} />
            <Box px={20}>
              <Text mb={5}>Contraseña</Text>
              <Input
                secureTextEntry
                rounded="lg"
                value={password}
                onChangeText={p => setPassword(p)}
              />
            </Box>
            <Box m={15} />
            <Box px={20} alignItems="flex-end" mb={5}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text color="#9ca3af">¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </Box>
            <Box px={20}>
              <Button
                loading={isLoading}
                h={48}
                disabled={disabled}
                bg="#3b82f6"
                block
                rounded="lg"
                fontWeight="bold"
                onPress={handleSubmit}>
                Iniciar sesión
              </Button>
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
