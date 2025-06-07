import './App.css'

// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './Components/Airdrop';
import { ShowSolBalance } from './Components/UserBalance';
import { Bar } from './Components/Bar';
import { SignMessage } from './Components/SignMessage';
import { SendTokens } from './Components/SendSol';

function App() {
  return (
    <div style={{width: "100vw"}}>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className='flex justify-center items-center top-4 sticky'>
                <Bar />
                </div>
              <div  className='text-white flex justify-center items-center pt-20 flex-col'>
                <div className='flex gap-4'>
                <WalletMultiButton />
                <WalletDisconnectButton />
                </div>
              <RequestAirdrop />
              <ShowSolBalance />
              <SignMessage />
              <SendTokens />
              </div>
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App