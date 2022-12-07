import React, {useState} from 'react';
import {ThemeProvider} from 'react-native-magnus';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import {trpc} from '@eris/modules/trpc/client';
import {Root} from './navigation/Root';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://192.168.1.46:3000/api',
          // optional
          headers() {
            return {
              authorization: '',
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Root />
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
