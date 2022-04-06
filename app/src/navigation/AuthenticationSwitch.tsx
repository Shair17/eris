import React from 'react';
import {useTokenStore, hasTokensSelector} from '../stores/useTokensStore';
import {OnBoardingStack} from './stacks/OnBoardingStack';
import {MainNavigation} from './MainNavigation';

export const AuthenticationSwitch = () => {
  const hasTokens = useTokenStore(hasTokensSelector);

  if (!hasTokens) {
    return <OnBoardingStack />;
  }

  return <MainNavigation />;
};
