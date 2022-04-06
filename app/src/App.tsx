import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-magnus';
import {NavigationContainer} from '@react-navigation/native';
import {
  useTokenStore,
  loadTokensSelector,
  tokensAreReadySelector,
} from './stores/useTokensStore';
import {AuthenticationSwitch} from './navigation/AuthenticationSwitch';

function App() {
  const loadTokens = useTokenStore(loadTokensSelector);
  const tokensAreReady = useTokenStore(tokensAreReadySelector);

  if (!tokensAreReady) {
    loadTokens();
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AuthenticationSwitch />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
