import React, { useState } from "react";
import { useCreate, useWeb3Provider } from "mint.club-sdk";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "./web3React";

export default function CreateExample() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [amount, setAmount] = useState(0);
  const [referrer, setReferrer] = useState("");
  const provider = useWeb3Provider();
  const { activate, deactivate, account, chainId, library } = useWeb3React();
  const { createToken, createTokenAndBuy } = useCreate(
    provider?.getSigner(account),
    chainId
  );

  return (
    <div style={{ marginTop: 20 }}>
      {account ? (
        <div>
          Account: {account} <button onClick={deactivate}>Deactivate</button>
          <br />
          Chain ID: {chainId}
          <div style={{ marginTop: 20 }}>
            Name:&nbsp;
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div>
            Symbol:&nbsp;
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Symbol"
            />
          </div>
          <div>
            Supply:&nbsp;
            <input
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              placeholder="Supply"
            />
          </div>
          <button
            style={{ marginTop: 20 }}
            onClick={() => {
              createToken(name, symbol, supply, (tx) => console.log(tx));
            }}
          >
            Create w/o Instant purchase
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 40,
            }}
          >
            <div>
              Instant Purchase Amount (MINT):&nbsp;
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              Referrer:&nbsp;
              <input
                value={referrer}
                onChange={(e) => setReferrer(e.target.value)}
              />
            </div>
            <button
              style={{ marginTop: 20 }}
              onClick={() => {
                createTokenAndBuy(name, symbol, supply, amount, referrer);
              }}
            >
              Create w/ Instant purchase
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => activate(Injected)}>Connect to Metamask</button>
      )}
    </div>
  );
}
