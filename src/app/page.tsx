'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect, useSendCalls, useReadContract, useWriteContract } from 'wagmi';
import { encodeFunctionData } from 'viem';
import { Attribution } from 'ox/erc8021';

const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ["bc_2d1r32ln"], // obtained from base.dev > Settings > Builder Codes
});

export default function Page() {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const contractAddress = '0x85349056F46adD805632602b558B4809222A3A1a'; // Placeholder: replace with deployed contract address

  const abi = [
    {
      inputs: [],
      name: 'sayGM',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'getStreak',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'lastGM',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'streaks',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const { writeContract } = useWriteContract();
  const { sendCalls } = useSendCalls();
  const { data: contractStreak, refetch } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getStreak',
    args: address ? [address] : undefined,
  });

  const handleSayGM = async () => {
    try {
      const data = encodeFunctionData({
        abi,
        functionName: 'sayGM',
      });
      await sendCalls({
        calls: [
          {
            to: contractAddress,
            data: data,
          },
        ],
        capabilities: {
          dataSuffix: {
            value: DATA_SUFFIX,
            optional: true,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to GM Onchain!</h1>
      <p className="text-lg mb-8 text-center">Connect your wallet and start your GM streak onchain.</p>
      {isConnected ? (
        <>
          <button
            onClick={handleSayGM}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Say GM Onchain!
          </button>
          <p className="text-xl">Current Streak: {contractStreak ? contractStreak.toString() : '0'}</p>
          <button
            onClick={async () => {
              disconnect();
              window.location.reload(); // Force reload to clear cache
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">Please connect your wallet to continue.</p>
          <button
            onClick={() => {
              const injectedConnector = connectors.find(c => c.id === 'injected');
              const walletConnectConnector = connectors.find(c => c.name === 'WalletConnect');
              if (injectedConnector) {
                connect({ connector: injectedConnector });
              } else if (walletConnectConnector) {
                connect({ connector: walletConnectConnector });
              } else if (connectors.length > 0) {
                connect({ connector: connectors[0] });
              }
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}