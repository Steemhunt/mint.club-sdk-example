import { useWeb3React } from "@web3-react/core";
import { ADDRESSES, allowance, approve, buyWithMint } from "mint.club-sdk";
import React, { useEffect, useMemo, useState } from "react";
import { Injected } from "./web3React";
import { debounce } from "lodash";

const BuyExample = () => {
  const [amount, setAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [referrer, setReferrer] = useState("");
  const [slippage, setSlippage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(null);
  const [out, setOut] = useState(null);
  const [inputType, setInputType] = useState("USD");
  const { activate, deactivate, account, library, chainId } = useWeb3React();

  async function calc(
    amount,
    tokenAddress,
    slippage,
    referrer,
    inputType,
    forcedMintPrice,
    chainId
  ) {
    const result = await buyWithMint(
      amount,
      tokenAddress,
      slippage,
      referrer,
      inputType === "USD",
      forcedMintPrice,
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
      debouncedCalculation(
        amount,
        tokenAddress,
        slippage,
        referrer,
        inputType,
        null,
        chainId
      );
    }
  }, [amount, tokenAddress, referrer, slippage, inputType, chainId]);

  useEffect(() => {
    if (account && chainId) {
      (async () => {
        const _allowance = await allowance(
          ADDRESSES.mint[chainId],
          account,
          ADDRESSES.mintClubBond[chainId],
          chainId
        );

        setAllowed(_allowance?.toString());
      })();
    }
  }, [account, chainId]);

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
            MINT Allowance: {allowed}
            {tokenAddress && allowed === "0" && (
              <button
                onClick={() => {
                  approve(
                    ADDRESSES.mint[chainId],
                    ADDRESSES.mintClubBond[chainId],
                    library.getSigner(account),
                    null,
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
                amountOut: {out?.value.toString()}
                {out?.buy && (
                  <button
                    onClick={() => {
                      out?.buy(library.getSigner(account));
                    }}
                  >
                    Buy
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
export default BuyExample;
