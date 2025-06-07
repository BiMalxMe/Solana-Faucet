import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();

    async function getBalance() { 
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = "Balance is "+balance / LAMPORTS_PER_SOL + " SOL";
        }
    }
    
    getBalance();
    return (
        <div id="balance"   className="flex items-center justify-center p-2 bg-gradient-to-r via-black from-gray-900 to-slate-800 rounded-xl shadow-md font-semibold text-blue-300 w-fit mx-auto mt-4"
>

        </div>
      );
      
      
}