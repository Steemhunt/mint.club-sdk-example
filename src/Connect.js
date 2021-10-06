import React from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3Provider } from "mint.club-sdk";

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
});

export default function Connect() {
  const { activate, account, library } = useWeb3React();
  const provider = useWeb3Provider();
  console.log(provider);
  return (
    <div>
      <div>{account}</div>
      <button onClick={() => activate(Injected)}>Connect</button>
    </div>
  );
}
