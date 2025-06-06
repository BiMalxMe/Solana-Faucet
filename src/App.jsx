import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import '@solana/wallet-adapter-react-ui/styles.css';
import "./App.css";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { RequestAirdrop } from "./Components/Airdrop";
import { Bar } from "./Components/Bar";

function App() {
  return (
    // Ensure these providers wrap your entire application where wallet functionality is needed
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/KwSxcRvEz-gO60Q7FPyQwtiyA0OLb6Mi"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <RequestAirdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
