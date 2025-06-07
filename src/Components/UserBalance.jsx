import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function getBalance() {
      if (publicKey) {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } else {
        setBalance(null);
      }
    }

    getBalance();

    // Optional: set up a polling interval to update balance every 15 seconds
    const interval = setInterval(getBalance, 15000);

    return () => clearInterval(interval); // cleanup interval on unmount
  }, [connection, publicKey]);

  return (
    <div
      id="balance"
      className="flex items-center justify-center p-2 bg-gradient-to-r via-black from-gray-900 to-slate-800 rounded-xl shadow-md font-semibold text-blue-300 w-fit mx-auto mt-4"
    >
      {publicKey
        ? `Balance is ${balance !== null ? balance.toFixed(4) : "loading..."} SOL`
        : "Not connected"}
    </div>
  );
}
