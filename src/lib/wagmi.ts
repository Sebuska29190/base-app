import { createConfig, http } from 'wagmi'
import { base } from 'viem/chains'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    walletConnect({ projectId: 'ee357177a8f40eb47b61ea2eccc5ba46' }),
  ],
  transports: {
    [base.id]: http(),
  },
})