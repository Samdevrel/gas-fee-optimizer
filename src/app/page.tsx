'use client';

import { useState, useEffect } from 'react';

interface Chain {
  name: string;
  type: 'L1' | 'L2' | 'L3';
  gasPric
      <header className="border-b-4 border-purple-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">App</h1>
              <p className="text-gray-400 mt-2">Interactive demo</p>
            </div>
            <nav className="flex gap-2">
              <a href="/" className="px-4 py-2 bg-gray-800 border-2 border-gray-600 hover:border-purple-400 rounded font-bold transition-all">
                Home
              </a>
              <a href="/docs" className="px-4 py-2 bg-purple-500 border-2 border-purple-400 rounded font-bold transition-all">
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>

e: number; // in gwei
  avgBlockTime: number; // in seconds
  color: string;
}

interface TransactionType {
  name: string;
  gasUnits: number;
  icon: string;
}

const chains: Chain[] = [
  { name: 'Ethereum', type: 'L1', gasPrice: 25, avgBlockTime: 12, color: '#627EEA' },
  { name: 'Arbitrum', type: 'L2', gasPrice: 0.1, avgBlockTime: 0.25, color: '#28A0F0' },
  { name: 'Base', type: 'L2', gasPrice: 0.08, avgBlockTime: 2, color: '#0052FF' },
  { name: 'Optimism', type: 'L2', gasPrice: 0.09, avgBlockTime: 2, color: '#FF0420' },
  { name: 'Polygon', type: 'L2', gasPrice: 50, avgBlockTime: 2, color: '#8247E5' },
  { name: 'zkSync', type: 'L2', gasPrice: 0.25, avgBlockTime: 1, color: '#8C8DFC' },
  { name: 'Scroll', type: 'L2', gasPrice: 0.15, avgBlockTime: 3, color: '#FFCB80' },
];

const txTypes: TransactionType[] = [
  { name: 'ETH Transfer', gasUnits: 21000, icon: '↗️' },
  { name: 'ERC-20 Transfer', gasUnits: 65000, icon: '🪙' },
  { name: 'ERC-20 Approve', gasUnits: 46000, icon: '✓' },
  { name: 'Uniswap Swap', gasUnits: 150000, icon: '🔄' },
  { name: 'NFT Mint', gasUnits: 120000, icon: '🎨' },
  { name: 'Contract Deploy', gasUnits: 500000, icon: '📄' },
  { name: 'Aave Deposit', gasUnits: 200000, icon: '🏦' },
];

export default function Home() {
  const [selectedTx, setSelectedTx] = useState<TransactionType>(txTypes[3]); // Uniswap swap
  const [ethPrice, setEthPrice] = useState(2450);
  const [liveMode, setLiveMode] = useState(true);
  const [chainsData, setChainsData] = useState(chains);

  // Simulate live gas price updates
  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      setChainsData(prev => prev.map(chain => ({
        ...chain,
        gasPrice: chain.gasPrice * (0.9 + Math.random() * 0.2), // ±10% variation
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [liveMode]);

  const calculateCost = (chain: Chain, tx: TransactionType): number => {
    // Cost in ETH = gasUnits * gasPrice (gwei) / 1e9
    const costInEth = (tx.gasUnits * chain.gasPrice) / 1e9;
    return costInEth * ethPrice;
  };

  const sortedChains = [...chainsData].sort((a, b) => 
    calculateCost(a, selectedTx) - calculateCost(b, selectedTx)
  );

  const cheapest = sortedChains[0];
  const mostExpensive = sortedChains[sortedChains.length - 1];
  const savingsPercent = ((1 - calculateCost(cheapest, selectedTx) / calculateCost(mostExpensive, selectedTx)) * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-green-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Gas Fee Optimizer</h1>
          <p className="text-gray-400 mt-2">Compare transaction costs across L1 and L2s in real-time</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Controls */}
        <section className="bg-gray-900 border-4 border-gray-700 p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-2">TRANSACTION TYPE</h2>
              <div className="flex flex-wrap gap-2">
                {txTypes.map((tx) => (
                  <button
                    key={tx.name}
                    onClick={() => setSelectedTx(tx)}
                    className={`px-3 py-2 font-bold border-4 transition-all text-sm ${
                      selectedTx.name === tx.name
                        ? 'bg-green-400 text-black border-green-400'
                        : 'bg-gray-800 text-white border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {tx.icon} {tx.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">ETH Price</label>
                <input
                  type="number"
                  value={ethPrice}
                  onChange={(e) => setEthPrice(Number(e.target.value))}
                  className="w-24 p-2 bg-gray-800 border-2 border-gray-600 text-white"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={liveMode}
                  onChange={(e) => setLiveMode(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-bold text-sm">Live Updates</span>
              </label>
            </div>
          </div>
        </section>

        {/* Summary Card */}
        <section className="bg-gray-900 border-4 border-green-400 p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-2">CHEAPEST OPTION</h2>
              <div className="text-3xl font-black" style={{ color: cheapest.color }}>
                {cheapest.name}
              </div>
              <div className="text-xl text-green-400 font-bold">
                ${calculateCost(cheapest, selectedTx).toFixed(4)}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-2">SAVINGS VS ETHEREUM</h2>
              <div className="text-3xl font-black text-green-400">
                {savingsPercent}%
              </div>
              <div className="text-sm text-gray-400">
                Save ${(calculateCost(mostExpensive, selectedTx) - calculateCost(cheapest, selectedTx)).toFixed(2)}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-2">TRANSACTION DETAILS</h2>
              <div className="text-lg font-bold">{selectedTx.icon} {selectedTx.name}</div>
              <div className="text-sm text-gray-400">
                {selectedTx.gasUnits.toLocaleString()} gas units
              </div>
            </div>
          </div>
        </section>

        {/* Chain Comparison */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">COST BY CHAIN (SORTED BY PRICE)</h2>
          <div className="space-y-3">
            {sortedChains.map((chain, i) => {
              const cost = calculateCost(chain, selectedTx);
              const maxCost = calculateCost(mostExpensive, selectedTx);
              const percentage = (cost / maxCost) * 100;
              
              return (
                <div key={chain.name} className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs font-bold ${
                      chain.type === 'L1' ? 'bg-blue-900 text-blue-300' : 
                      chain.type === 'L2' ? 'bg-purple-900 text-purple-300' : 
                      'bg-orange-900 text-orange-300'
                    }`}>
                      {chain.type}
                    </span>
                    <span className="font-bold" style={{ color: chain.color }}>{chain.name}</span>
                  </div>
                  <div className="flex-1 bg-gray-800 h-8 relative">
                    <div 
                      className="h-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: chain.color,
                        opacity: 0.7,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center px-2">
                      <span className="text-sm font-bold text-white drop-shadow-lg">
                        ${cost.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-400">
                    {chain.gasPrice.toFixed(2)} gwei
                  </div>
                  {i === 0 && (
                    <span className="px-2 py-1 bg-green-900 text-green-400 text-xs font-bold">
                      BEST
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Facts */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <h3 className="font-bold text-blue-400 mb-2">L1 vs L2</h3>
            <p className="text-sm text-gray-400">
              L2s batch transactions and post proofs to Ethereum, reducing per-tx costs by 90%+. 
              Post-EIP-4844 blob space made L2s even cheaper.
            </p>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <h3 className="font-bold text-purple-400 mb-2">Why Prices Vary</h3>
            <p className="text-sm text-gray-400">
              Gas prices depend on network congestion, block space demand, and L1 data posting costs. 
              Arbitrum and Base are often cheapest due to efficient compression.
            </p>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4">
            <h3 className="font-bold text-green-400 mb-2">Best Time to Transact</h3>
            <p className="text-sm text-gray-400">
              Weekends and early UTC mornings typically have lower fees. 
              For large swaps, check multiple L2s — price impact can vary.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section className="bg-gray-900 border-4 border-green-400 p-6">
          <h2 className="text-xl font-black text-green-400 mb-4">How to Save on Gas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-white mb-2">1. Choose the Right L2</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• <span className="text-blue-400">Arbitrum</span> — Best for DeFi, most liquidity</li>
                <li>• <span className="text-blue-400">Base</span> — Cheapest, growing ecosystem</li>
                <li>• <span className="text-red-400">Optimism</span> — Good for NFTs, OP grants</li>
                <li>• <span className="text-purple-400">zkSync</span> — Native AA, zkEVM</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">2. Optimize Transactions</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Batch multiple actions when possible</li>
                <li>• Use Permit2 to skip approval txs</li>
                <li>• Check gas trackers before large swaps</li>
                <li>• Consider gas refund tokens (if available)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Agent Integration */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">FOR AI AGENTS</h2>
          <p className="text-gray-300 mb-4">
            AI agents executing on-chain need to optimize gas costs automatically. 
            This tool demonstrates the logic that should be baked into agentic wallets:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-800 border-2 border-gray-600">
              <code className="text-cyan-400">checkGasPrices(chains)</code>
              <div className="text-gray-400 text-xs mt-1">Query current gas prices across networks</div>
            </div>
            <div className="p-3 bg-gray-800 border-2 border-gray-600">
              <code className="text-cyan-400">selectOptimalChain(txType, budget)</code>
              <div className="text-gray-400 text-xs mt-1">Choose cheapest chain for transaction</div>
            </div>
            <div className="p-3 bg-gray-800 border-2 border-gray-600">
              <code className="text-cyan-400">bridgeIfNeeded(fromChain, toChain)</code>
              <div className="text-gray-400 text-xs mt-1">Auto-bridge when destination chain is cheaper</div>
            </div>
            <div className="p-3 bg-gray-800 border-2 border-gray-600">
              <code className="text-cyan-400">waitForLowGas(threshold)</code>
              <div className="text-gray-400 text-xs mt-1">Delay non-urgent txs until gas drops</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-green-400 hover:underline">@samdevrel</a>
            {' • '}
            <a href="https://github.com/Samdevrel/gas-fee-optimizer" className="text-gray-400 hover:underline">Source Code</a>
            {' • '}
            Gas prices are simulated for demo purposes
          </p>
        </footer>
      </div>
    </main>
  );
}
