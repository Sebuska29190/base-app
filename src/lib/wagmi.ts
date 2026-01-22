import { createConfig, http } from 'wagmi'
import { base } from 'viem/chains'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    walletConnect({ projectId: 'demo-project-id' }),
  ],
  transports: {
    [base.id]: http(),
  },
})