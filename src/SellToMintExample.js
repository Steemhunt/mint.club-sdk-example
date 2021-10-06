import { useWeb3React } from "@web3-react/core";
import {
  ADDRESSES,
  useAllowance,
  useSellToMint,
  useWeb3Provider,
} from "mint.club-sdk";
import React, { useState } from "react";
import { Injected } from "./web3React";

const SellToMintExample = () => {
  const [amount, setAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [referrer, setReferrer] = useState("");
  const [slippage, setSlippage] = useState(2);
  const provider = useWeb3Provider();
  const { activate, deactivate, account, chainId } = useWeb3React();

  const { amountOut, loading, error } = useSellToMint({
    amountIn: amount,
    tokenAddress,
    slippage,
    referrer,
    chainId,
  });

  const allowance = useAllowance(
    tokenAddress,
    account,
    ADDRESSES.mintClubBond[chainId],
    chainId
  );

  return (
    <div style={{ marginTop: 20 }}>
      {account ? (
        <div>
          Account: {account} <button onClick={deactivate}>Deactivate</button>
          <div style={{ marginTop: 20 }}>
            Token to sell:&nbsp;
            <input
              placeholder="Token address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          Sell amount&nbsp;
          <input
            type="number"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div>
            Slippage:&nbsp;
            <input
              type="number"
              placeholder="amount"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
            />
            %
          </div>
          <div>
            Referrer wallet:&nbsp;
            <input
              placeholder="Referrer wallet"
              value={referrer}
              onChange={(e) => setReferrer(e.target.value)}
            />
          </div>
          <div>Token Allowance: {allowance}</div>
          <div>
            {loading ? (
              "loading..."
            ) : (
              <div>
                amountOut: {JSON.stringify(amountOut)}
                {amountOut.approve && (
                  <button
                    onClick={() => {
                      amountOut.approve(provider.getSigner(account));
                    }}
                  >
                    Approve
                  </button>
                )}
                {amountOut.sell && (
                  <button
                    onClick={() => {
                      amountOut.sell(provider.getSigner(account));
                    }}
                  >
                    Sell
                  </button>
                )}
              </div>
            )}
          </div>
          <div>Error: {error}</div>
        </div>
      ) : (
        <button onClick={() => activate(Injected)}>Connect to Metamask</button>
      )}
    </div>
  );
};
export default SellToMintExample;
