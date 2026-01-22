'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi';
import { createPublicClient, http } from 'viem';

export default function Page() {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const contractAddress = '0x0000000000000000000000000000000000000000'; // Placeholder: replace with deployed contract address

  const abi = [
    {
      name: 'sayGM',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [],
      outputs: [],
    },
    {
      name: 'getStreak',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'address', name: 'user' }],
      outputs: [{ type: 'uint256' }],
    },
  ];

  const { writeContract } = useWriteContract();
  const { data: contractStreak, refetch } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getStreak',
    args: address ? [address] : undefined,
  });

  const handleSayGM = () => {
    writeContract({
      address: contractAddress,
      abi,
      functionName: 'sayGM',
    }, {
      onSuccess: () => refetch(),
    });
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
              const connector = connectors.find(c => c.name === 'WalletConnect') || connectors[0];
              if (connector) {
                connect({ connector });
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