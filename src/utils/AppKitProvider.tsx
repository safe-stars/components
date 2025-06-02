import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { useSafeStarsConfig } from '../widgets/BuyStarsDrawer/SafeStarsContext'

const queryClient = new QueryClient();

const projectId = '32d62ea8fb59d005aed20f460b739974';

const metadata = {
  name: 'Buy Stars',
  description: '',
  url: 'https://safestars.pro',
  icons: ['https://safestars.pro/favicon.ico']
};

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  const { config } = useSafeStarsConfig();
  
  const rpcUrl = config.alchemyApiKey 
    ? `https://arb-mainnet.g.alchemy.com/v2/${config.alchemyApiKey}` 
    : undefined;

  const arbitrumNetwork = rpcUrl ? {
    ...arbitrum,
    rpcUrls: {
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] }
    }
  } : arbitrum;

  const wagmiAdapter = new WagmiAdapter({
    networks: [arbitrumNetwork],
    projectId,
    ssr: true,
  });

  createAppKit({
    adapters: [wagmiAdapter],
    networks: [arbitrumNetwork],
    projectId,
    metadata,
    features: {
      email: false,
      socials: false
    }
  });

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
