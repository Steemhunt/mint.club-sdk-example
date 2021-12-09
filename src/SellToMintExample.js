import { useWeb3React } from "@web3-react/core";
import { ADDRESSES, approve, allowance, sellToMint } from "mint.club-sdk";
import React, { useState, useMemo, useEffect } from "react";
import { Injected } from "./web3React";
import { debounce } from "lodash";

const SellToMintExample = () => {
  const [amount, setAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [referrer, setReferrer] = useState("");
  const [slippage, setSlippage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState(null);
  const { activate, deactivate, account, chainId, library } = useWeb3React();

  async function calc(amount, tokenAddress, slippage, referrer, chainId) {
    const result = await sellToMint(
      amount,
      tokenAddress,
      slippage,
      referrer,
      chainId
    );

    setLoading(false);
    setOut(result);
  }

  const debouncedCalculation = useMemo(() => debounce(calc, 1000), []);

  useEffect(() => {
    if (amount && tokenAddress) {
      setLoading(true);
      setOut(null);
      debouncedCalculation(amount, tokenAddress, slippage, referrer, chainId);
    }
  }, [amount, tokenAddress, referrer, slippage, chainId]);

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
          <div>
            {loading ? (
              "loading..."
            ) : (
              <div>
                amountOut: {JSON.stringify(out?.value?.toString())}
                {out?.approve && (
                  <button
                    onClick={() => {
                      out?.approve(library.getSigner(account));
                    }}
                  >
                    Approve
                  </button>
                )}
                {out?.sell && (
                  <button
                    onClick={() => {
                      out?.sell(library.getSigner(account));
                    }}
                  >
                    Sell
                  </button>
                )}
              </div>
            )}
          </div>
          {/* <div>Error: {error}</div> */}
        </div>
      ) : (
        <button onClick={() => activate(Injected)}>Connect to Metamask</button>
      )}
    </div>
  );
};
export default SellToMintExample;
