import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [to, setTo] = useState("");

    async function sendTokens() {
        try {
            if (!wallet.publicKey) {
                alert("Please connect your wallet first");
                return;
            }
            
            let finalto = to;
            console.log(`to is ${finalto} and amount is ${amount}`); // Debug line
            
            
            if (!finalto.trim() || !amount.trim()) {
                alert("Please fill in both fields");
                return;
            }

            // Validate the "to" address
            try {
                new PublicKey(finalto);
            } catch (error) {
                alert("Invalid recipient address");
                return;
            }

            let finalparsedval = parseFloat(amount);
            
            if (isNaN(finalparsedval) || finalparsedval <= 0) {
                alert("Please enter a valid amount");
                return;
            }

            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(finalto),
                lamports: Math.floor(finalparsedval * LAMPORTS_PER_SOL),
            }));

            await wallet.sendTransaction(transaction, connection);
            alert("Sent " + amount + " SOL to " + finalto);
        } catch (error) {
            alert("Transaction failed: " + error.message);
        }
    }

    return <div className="mt-3">
        <div className="mb-4">
            <input 
                type="text" 
                placeholder="To" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div>
            <input 
                type="text" 
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div>
            <button
                className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition block mx-auto"
                onClick={sendTokens}
            >
                Send
            </button>
        </div>
    </div>
}