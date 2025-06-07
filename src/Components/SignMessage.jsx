import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React, { useState } from "react";

export function SignMessage() {
  const [sig, setSig] = useState("");
  const [error, setError] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function dothis() {
    try {
      setError("");
      setSig("");
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage) throw new Error("Wallet cannot sign messages.");

      const messageInput = document.getElementById("message");
      if (!messageInput.value.trim()) throw new Error("Enter a message.");

      const message = messageInput.value.trim();
      const encoded = new TextEncoder().encode(message);
      const signature = await signMessage(encoded);

      if (!ed25519.verify(signature, encoded, publicKey.toBytes()))
        throw new Error("Invalid signature!");

      setSig(bs58.encode(signature));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="mt-4 w-full max-w-md">
      <input
        id="message"
        type="text"
        placeholder="Message to sign"
        className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={dothis}
        className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition block mx-auto"
      >
        Sign Message
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {sig && (
        <p className="mt-2 text-sm text-green-700 break-all">
          Signature: {sig}
        </p>
      )}
    </div>
  );
}
