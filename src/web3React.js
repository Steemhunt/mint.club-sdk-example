import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

const POLLING_INTERVAL = 12000;

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
});

export function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}
