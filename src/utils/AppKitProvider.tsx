import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const queryClient = new QueryClient();

const projectId = '32d62ea8fb59d005aed20f460b739974';

const metadata = {
  name: 'Buy Stars',
  description: '',
  url: 'https://safestars.pro',
  icons: ['https://safestars.pro/favicon.ico']
};

const wagmiAdapter = new WagmiAdapter({
  networks: [arbitrum],
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [arbitrum],
  projectId,
  metadata,
  features: {
    email: false,
    socials: false
  }
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
