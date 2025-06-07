import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }
    return (
        <div className="text-white">
          <br /><br />
          <input
            id="amount"
            type="text"
            placeholder="Amount"
            className="text-white bg-black border border-white px-2 py-1 rounded placeholder-gray-400"
          />
          <button
            onClick={requestAirdrop}
            className="ml-2 px-3 py-1 bg-white text-black rounded hover:bg-gray-300"
          >
            Request Airdrop
          </button>
        </div>
      );
      
}