import create from 'zustand';
import {combine} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accessToken, refreshToken} from '../tokens';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export const loadTokensSelector = (t: any) =>
  t.loadTokens as () => Promise<void>;
export const tokensAreReadySelector = (t: any) =>
  t.accessToken !== undefined && t.refreshToken !== undefined;
export const setTokensSelector = (t: any) =>
  t.setTokens as ({accessToken, refreshToken}: ITokens) => Promise<void>;
export const hasTokensSelector = (t: any) =>
  !!t.accessToken && !!t.refreshToken;

export const useTokenStore = create(
  combine(
    {
      accessToken,
      refreshToken,
    },
    set => ({
      setTokens: async ({accessToken, refreshToken}: ITokens) => {
        try {
          await AsyncStorage.setItem('@shopox/accessToken', accessToken);
          await AsyncStorage.setItem('@shopox/refreshToken', refreshToken);
        } catch {}

        set({accessToken, refreshToken});
      },
      loadTokens: async () => {
        try {
          let accessToken = await AsyncStorage.getItem('@shopox/accessToken');
          accessToken = accessToken || '';
          let refreshToken = await AsyncStorage.getItem('@shopox/refreshToken');
          refreshToken = refreshToken || '';
          set({accessToken, refreshToken});
        } catch {}
      },
    }),
  ),
);
