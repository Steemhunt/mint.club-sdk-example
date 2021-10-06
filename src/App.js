import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import BuyWithMintExample from "./BuyWithMintExample";
import { getLibrary } from "./web3React";
import { useState } from "react";
import BuyWithCryptoExample from "./BuyWithCryptoExample";
import SellToMintExample from "./SellToMintExample";
import CreateExample from "./CreateExample";
import SellToCryptoExample from "./SellToCryptoExample";

const TAB_BUY_WITH_MINT_EXAMPLE = 0;
const TAB_BUY_WITH_CRYPTO_EXAMPLE = 1;
const TAB_SELL_TO_MINT_EXAMPLE = 2;
const TAB_SELL_TO_CRYPTO_EXAMPLE = 3;
const TAB_CREATE_EXAMPLE = 4;

function App() {
  const [tabIndex, setTabIndex] = useState(TAB_CREATE_EXAMPLE);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <button onClick={() => setTabIndex(TAB_CREATE_EXAMPLE)}>
          Create Example
        </button>
        <button onClick={() => setTabIndex(TAB_BUY_WITH_MINT_EXAMPLE)}>
          Buy w/ MINT Example
        </button>
        <button onClick={() => setTabIndex(TAB_BUY_WITH_CRYPTO_EXAMPLE)}>
          Buy w/ Crypto Example
        </button>
        <button onClick={() => setTabIndex(TAB_SELL_TO_MINT_EXAMPLE)}>
          Sell to MINT Example
        </button>
        <button onClick={() => setTabIndex(TAB_SELL_TO_CRYPTO_EXAMPLE)}>
          Sell to Crypto Example
        </button>
        {tabIndex === TAB_CREATE_EXAMPLE && <CreateExample />}
        {tabIndex === TAB_BUY_WITH_MINT_EXAMPLE && <BuyWithMintExample />}
        {tabIndex === TAB_BUY_WITH_CRYPTO_EXAMPLE && <BuyWithCryptoExample />}
        {tabIndex === TAB_SELL_TO_MINT_EXAMPLE && <SellToMintExample />}
        {tabIndex === TAB_SELL_TO_CRYPTO_EXAMPLE && <SellToCryptoExample />}
      </div>
    </Web3ReactProvider>
  );
}

export default App;
