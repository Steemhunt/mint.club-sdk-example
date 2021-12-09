import { useWeb3React } from "@web3-react/core";
import { ADDRESSES, approve, allowance, buyWithCrypto } from "mint.club-sdk";
import React, { useEffect, useState, useMemo } from "react";
import { Injected } from "./web3React";
import { debounce } from "lodash";

const BuyWithCryptoExample = () => {
  const [amount, setAmount] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [tokenAddress, setTokenAddress] = useState("");
  const [referrer, setReferrer] = useState("");
  const [tokenIn, setTokenIn] = useState("BNB");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState(null);
  const [allowed, setAllowed] = useState(null);
  const [slippage, setSlippage] = useState(2);
  const { activate, deactivate, account, chainId, library } = useWeb3React();

  async function calc(
    amount,
    tokenIn,
    tokenAddress,
    slippage,
    referrer,
    chainId
  ) {
    const result = await buyWithCrypto(
      amount,
      tokenIn,
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
      debouncedCalculation(
        amount,
        { address: tokenIn, decimals },
        tokenAddress,
        slippage,
        referrer,
        chainId
      );
    }
  }, [amount, tokenAddress, tokenIn, decimals, referrer, slippage, chainId]);

  useEffect(() => {
    if (account && chainId && tokenIn) {
      (async () => {
        const _allowance = await allowance(
          tokenIn === "BNB" ? ADDRESSES.wbnb[chainId] : tokenIn,
          account,
          ADDRESSES.mintClubZap[chainId],
          chainId
        );
        console.log("allowance", _allowance.toString());

        setAllowed(_allowance?.toString());
      })();
    }
  }, [account, chainId, tokenIn]);

  return (
    <div style={{ marginTop: 20 }}>
      {account ? (
        <div>
          Account: {account} <button onClick={deactivate}>Deactivate</button>
          <div style={{ marginTop: 20 }}>
            Token to buy:&nbsp;
            <input
              placeholder="Token address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          Buy with&nbsp;
          <select value={tokenIn} onChange={(e) => setTokenIn(e.target.value)}>
            <option value="BNB">BNB</option>
            <option value="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c">
              WBNB
            </option>
            <option value="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56">
              BUSD
            </option>
            <option value="0x55d398326f99059fF775485246999027B3197955">
              USDT
            </option>
            <option value="0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d">
              USDC
            </option>
            <option value="0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82">
              CAKE
            </option>
            <option value="0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c">
              BTCB
            </option>
            <option value="0x2170Ed0880ac9A755fd29B2688956BD959F933F8">
              ETH
            </option>
            <option value="0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402">
              DOT
            </option>
            <option value="0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B">
              TRX
            </option>
            <option value="0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F">
              ALPACA
            </option>
            <option value="0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377">
              MBOX
            </option>
            <option value="0x8595F9dA7b868b1822194fAEd312235E43007b49">
              BTT
            </option>
            <option value="0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47">
              ADA
            </option>
            <option value="0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51">
              BUNNY
            </option>
            <option value="0x9f589e3eabe42ebC94A44727b3f3531C0c877809">
              TKO
            </option>
            <option value="0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD">
              LINK
            </option>
            <option value="0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13">
              HERO
            </option>
            <option value="0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE">
              XRP
            </option>
            <option value="0xBf5140A22578168FD562DCcF235E5D43A02ce9B1">
              UNI
            </option>
            <option value="0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63">
              XVS
            </option>
            <option value="0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab">
              SKILL
            </option>
          </select>
          <input
            type="number"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div>
            Decimals:&nbsp;
            <input
              type="number"
              placeholder="amount"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
            />
          </div>
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
          {tokenIn !== "BNB" && (
            <div>
              Token Allowance: {allowed}
              {tokenAddress && allowed === "0" && (
                <button
                  onClick={() => {
                    approve(
                      tokenIn === "BNB" ? ADDRESSES.wbnb[chainId] : tokenIn,
                      ADDRESSES.mintClubZap[chainId],
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
          )}
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
export default BuyWithCryptoExample;
