import { useWeb3React } from "@web3-react/core";
import {
  ADDRESSES,
  useAllowance,
  useApprove,
  useBuyWithMint,
  useWeb3Provider,
} from "mint.club-sdk";
import React, { useState } from "react";
import { Injected } from "./web3React";

const BuyExample = () => {
  const [amount, setAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [referrer, setReferrer] = useState("");
  const [slippage, setSlippage] = useState(2);
  const [inputType, setInputType] = useState("USD");
  const provider = useWeb3Provider();
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const { approve } = useApprove();

  const { amountOut, loading, error } = useBuyWithMint({
    amountIn: amount,
    inputType,
    slippage,
    tokenAddress,
    referrer,
    chainId,
  });

  const allowance = useAllowance(
    ADDRESSES.mint[chainId],
    account,
    ADDRESSES.mintClubBond[chainId],
    chainId
  );

  return (
    <div style={{ marginTop: 20 }}>
      {account ? (
        <div>
          Account: {account} <button onClick={deactivate}>Deactivate</button>
          <br />
          chainId: {chainId}
          <div style={{ marginTop: 20 }}>
            Token to buy:&nbsp;
            <input
              placeholder="Token address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          Buy with&nbsp;
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="MINT">MINT</option>
          </select>
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
          <div>
            MINT Allowance: {allowance}
            {tokenAddress && allowance === "0" && (
              <button
                onClick={() => {
                  approve(
                    ADDRESSES.mint[chainId],
                    ADDRESSES.mintClubBond[chainId],
                    null,
                    provider.getSigner(account),
                    chainId
                  );
                }}
              >
                Approve
              </button>
            )}
          </div>
          <div>
            {loading ? (
              "loading..."
            ) : (
              <div>
                amountOut: {JSON.stringify(amountOut)}
                {amountOut.buy && (
                  <button
                    onClick={() => {
                      amountOut.buy(provider.getSigner(account));
                    }}
                  >
                    Buy
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
export default BuyExample;
