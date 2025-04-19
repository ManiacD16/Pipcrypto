import React, { useEffect, useState } from "react";
import { Contract, BrowserProvider, ethers } from "ethers";
import {
  Copy,
  ChevronRight,
  Award,
  Users,
  Clock,
  Wallet,
  LogOut,
  ExternalLink,
  BarChart3,
  CoinsIcon,
} from "lucide-react";
import {
  useAppKitAccount,
  useAppKitProvider,
  Provider,
  useAppKit,
} from "@reown/appkit/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contractAbi } from "../contracts/Props/contractAbi";
import { contractAddress } from "../contracts/Props/contractAddress";
import { useNavigate } from "react-router-dom";

const DashboardSection: React.FC = () => {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const [totalClaimed, setTotalClaimed] = useState("0");
  const [totalReferrals, setTotalReferrals] = useState("0");
  const [claimTime, setClaimTime] = useState({ start: 0, end: 0 });
  const [minTokens, setMinTokens] = useState({
    nonReferral: "0",
    perReferral: "0",
  });
  const [isClaimActive, setIsClaimActive] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [lastClaimedTimestamp, setLastClaimedTimestamp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userReferralId, setUserReferralId] = useState("");
  const [claimedUsers, setClaimedUsers] = useState<string[]>([]);
  const [showReferralUsers, setShowReferralUsers] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  // New state variables for the additional boxes
  const [totalContractClaimed, setTotalContractClaimed] = useState("0");
  const [totalContractUsers, setTotalContractUsers] = useState("0");

  // Check if wallet is connected, redirect if not
  useEffect(() => {
    if (!address) {
      navigate("/login"); // Redirect to login page if no wallet is connected
    }
  }, [address, navigate]);

  // Modified formatTime function to use 24-hour format
  const formatTime = (minutes: number) => {
    const date = new Date();
    date.setHours(0, minutes, 0, 0);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  };

  const checkIfClaimActive = (start: number, end: number) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes >= start && currentMinutes < end;
  };

  // Helper function to extract error reason from blockchain error
  const extractErrorReason = (error: any): string => {
    // Try to extract reason from error object
    if (error?.reason) {
      return error.reason;
    }
    // Try to extract from revert data
    if (error?.data) {
      try {
        // Check if it's a typical solidity error string
        if (
          typeof error.data === "string" &&
          error.data.startsWith("0x08c379a0")
        ) {
          const abiCoder = new ethers.AbiCoder();
          const decodedError = abiCoder.decode(
            ["string"],
            "0x" + error.data.slice(10)
          );
          return decodedError[0];
        }
      } catch (_) {
        // Ignore parsing errors
      }
    }
    // Return a generic message if we can't extract a specific reason
    return error?.message?.split("(")[0] || "Transaction failed";
  };

  const handleClaim = async () => {
    if (!walletProvider || !address || !isClaimActive || isClaimLoading) return;
    try {
      setIsClaimLoading(true);
      const claimToastId = toast.info("Preparing claim transaction...", {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const airdrop = new Contract(contractAddress, contractAbi, signer);
      toast.update(claimToastId, {
        render: "Please confirm the transaction in your wallet",
        type: "info",
      });
      const tx = await airdrop.claim();
      toast.update(claimToastId, {
        render: "Transaction submitted! Waiting for confirmation...",
        type: "info",
      });
      await tx.wait();
      toast.update(claimToastId, {
        render: "✅ Tokens claimed successfully!",
        type: "success",
        autoClose: 5000,
      });
      fetchData();
    } catch (err: any) {
      console.error("Claim error:", err);
      // Extract the error reason
      const errorReason = extractErrorReason(err);
      // Dismiss any pending toasts
      toast.dismiss();
      // Show a concise error toast with just the reason
      toast.error(errorReason, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setIsClaimLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await open(); // Open the wallet dialog
      toast.info("Wallet disconnected", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    let textToCopy = text;
    navigator.clipboard.writeText(text);
    if (type === "referral") {
      textToCopy = `https://pipcrypto.vercel.app/?ref=${text}`;
    }
    navigator.clipboard.writeText(textToCopy);
    // Show toast based on what was copied
    if (type === "address") {
      toast.success("Address copied to clipboard", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else if (type === "referral") {
      toast.success("Referral code copied to clipboard", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else if (type.startsWith("user-")) {
      toast.success("User address copied to clipboard", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const fetchData = async () => {
    if (!walletProvider || !address) return;
    const dataToastId = toast.info("Fetching your data...", {
      autoClose: 2000,
      hideProgressBar: true,
      position: "bottom-right",
    });
    try {
      const provider = new BrowserProvider(walletProvider);
      const airdrop = new Contract(contractAddress, contractAbi, provider);
      const claimed = await airdrop.totalClaimToken(address);
      setTotalClaimed(ethers.formatUnits(claimed, 6));

      // Get referral info
      const referralData = await airdrop.getReferralInfo(address);
      setUserReferralId(referralData[0]);
      setClaimedUsers(referralData[2]);
      setTotalReferrals(referralData[1].toString());

      const [startTime, endTime] = await Promise.all([
        airdrop.claimStartTime(),
        airdrop.claimEndTime(),
      ]);
      setClaimTime({ start: Number(startTime), end: Number(endTime) });
      setIsClaimActive(checkIfClaimActive(Number(startTime), Number(endTime)));

      const [nonRef, perRef] = await Promise.all([
        airdrop.minTokensForNonReferral(),
        airdrop.minTokensPerReferral(),
      ]);
      setMinTokens({
        nonReferral: ethers.formatUnits(nonRef, 6),
        perReferral: ethers.formatUnits(perRef, 6),
      });

      const lastClaimed = await airdrop.lastClaimedDate(address);
      const lastClaimedSeconds = Number(lastClaimed) * 86400 - 19800;
      const lastTimestamp = lastClaimedSeconds;
      setLastClaimedTimestamp(lastTimestamp);

      // Fetch additional data for the new boxes
      const [totalAirdropClaim, totalUsers] = await Promise.all([
        airdrop.totalAirdropClaim(),
        airdrop.totalUsers(),
      ]);

      setTotalContractClaimed(ethers.formatUnits(totalAirdropClaim, 6));
      setTotalContractUsers(totalUsers.toString());

      toast.update(dataToastId, {
        render: "Data updated successfully",
        type: "success",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.update(dataToastId, {
        render: "Error loading data. Please try again.",
        type: "error",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (address && walletProvider) {
      fetchData();
      const interval = setInterval(() => {
        setIsClaimActive(checkIfClaimActive(claimTime.start, claimTime.end));
      }, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [address, walletProvider, claimTime.start, claimTime.end]);

  const getMaxDailyClaimable = () => {
    const base = parseFloat(minTokens.nonReferral);
    const perRef = parseFloat(minTokens.perReferral);
    const refs = parseInt(totalReferrals);
    return base + perRef * refs;
  };

  useEffect(() => {
    const maxClaimable = getMaxDailyClaimable();
    const tokensPerSecond = maxClaimable / (24 * 60 * 60);
    const startTime = lastClaimedTimestamp
      ? lastClaimedTimestamp
      : Math.floor(Date.now() / 1000);
    const interval = setInterval(() => {
      const elapsed = Math.floor(Date.now() / 1000) - startTime;
      const claimable = Math.min(tokensPerSecond * elapsed, maxClaimable);
      setClaimableAmount(claimable);
      // Calculate time left, ensuring it's not negative
      const remaining = Math.max(0, 86400 - elapsed);
      setTimeLeft(remaining);
    }, 2000);
    return () => clearInterval(interval);
  }, [lastClaimedTimestamp, minTokens, totalReferrals]);

  const calculateProgress = () => {
    const maxToday = getMaxDailyClaimable();
    if (maxToday === 0) return 0;
    return Math.min((claimableAmount / maxToday) * 100, 100);
  };

  const formatTimeLeft = (seconds: number) => {
    // If seconds is negative or zero, return "0h 0m 0s"
    if (seconds <= 0) {
      return "0h 0m 0s";
    }
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const getExplorerURL = (address: string) => {
    return `https://testnet.bscscan.com/address/${address}`;
  };

  // Function to format large numbers with commas
  const formatWithCommas = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });
  };

  // If no wallet is connected, don't render the dashboard
  if (!address) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen pt-14 px-4 pb-16">
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Airdrop Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Track and manage your token rewards
          </p>
        </div>

        {/* Wallet Card */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-xl mb-8 border border-gray-700 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Wallet className="text-blue-400 mr-3 h-6 w-6" />
              <h3 className="text-xl font-semibold">Connected Wallet</h3>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/60 px-4 py-2 rounded-lg max-w-full">
              <p className="text-md break-all text-green-400 truncate">
                {address}
              </p>
              <button
                onClick={() => copyToClipboard(address || "", "address")}
                className="text-gray-400 hover:text-white transition-colors"
                title="Copy address"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleDisconnect}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
              title="Disconnect Wallet"
            >
              <LogOut className="h-4 w-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>

        {/* New Analytics Section - Added 3 new boxes */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="text-blue-400 mr-2 h-5 w-5" />
            Global Statistics
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Total Tokens Claimed (Contract-wide) */}
            <div className="bg-gray-900/50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
              <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                <Award className="text-purple-400 mr-2 h-4 w-4" />
                Total Tokens Claimed
              </h4>
              <p className="text-2xl font-bold text-purple-400">
                {formatWithCommas(totalContractClaimed)}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                tokens distributed so far
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-gray-900/50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
              <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                <Users className="text-blue-400 mr-2 h-4 w-4" />
                Total Users
              </h4>
              <p className="text-2xl font-bold text-blue-400">
                {formatWithCommas(totalContractUsers)}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                participants in the airdrop
              </p>
            </div>

            {/* Total Supply */}
            <div className="bg-gray-900/50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
              <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                <CoinsIcon className="text-green-400 mr-2 h-4 w-4" />
                Total IINGO Supply
              </h4>
              <p className="text-2xl font-bold text-green-400">21,000,000</p>
              <p className="text-gray-400 text-xs mt-1">maximum token supply</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Referral Code Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <ChevronRight className="text-purple-400 mr-2 h-5 w-5" />
              Your Referral Code
            </h3>
            <div className="mt-2 bg-gray-900/50 p-3 rounded-lg flex justify-between items-center">
              <span className="text-xl text-purple-400 font-mono">
                {userReferralId || "--"}
              </span>
              <button
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-colors"
                onClick={() => copyToClipboard(userReferralId, "referral")}
                title="Copy referral code"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tokens Per Referral Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Award className="text-blue-400 mr-2 h-5 w-5" />
              Tokens Per Referral
            </h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-blue-400">
                {minTokens.perReferral}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                tokens per successful referral
              </p>
            </div>
          </div>

          {/* Tokens Non-Referral Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Award className="text-pink-400 mr-2 h-5 w-5" />
              Per Day Mine Limit
            </h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-pink-400">
                {minTokens.nonReferral}
              </p>
              <p className="text-gray-400 text-sm mt-1">tokens per day</p>
            </div>
          </div>

          {/* Total Claimed Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Award className="text-green-400 mr-2 h-5 w-5" />
              Total Claimed
            </h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-green-400">
                {totalClaimed}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                tokens received so far
              </p>
            </div>
          </div>

          {/* Total Referrals Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Users className="text-yellow-400 mr-2 h-5 w-5" />
              Total Referrals
            </h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-yellow-400">
                {totalReferrals}
              </p>
              <p className="text-gray-400 text-sm mt-1">successful referrals</p>
            </div>
          </div>

          {/* Claim Window Card - UPDATED WITH 24-HOUR FORMAT */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Clock className="text-cyan-400 mr-2 h-5 w-5" />
              Claim Time Frame
            </h3>
            <div className="mt-2">
              <p className="text-xl font-medium text-cyan-400">
                {formatTime(claimTime.start)} - {formatTime(claimTime.end)}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Indian Standard Time (IST)
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold mb-4">Airdrop Accumulation</h3>
          <div className="w-full bg-gray-900 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Available: {claimableAmount.toFixed(6)} Tokens</span>
            <span>Max/24hr: {getMaxDailyClaimable().toFixed(6)} Tokens</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Time left for full claim: {formatTimeLeft(timeLeft)}
          </div>
        </div>

        {/* Claim Button */}
        <div className="text-center">
          <button
            onClick={handleClaim}
            disabled={!isClaimActive || isClaimLoading}
            className={`py-4 px-10 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-xl transform hover:-translate-y-1 ${
              isClaimActive && !isClaimLoading
                ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                : "bg-gradient-to-r from-gray-700 to-gray-600 cursor-not-allowed opacity-70"
            }`}
          >
            {isClaimLoading
              ? "Processing..."
              : isClaimActive
              ? "Claim Airdrop Tokens"
              : "Claim Not Available Now"}
          </button>
          {!isClaimActive && (
            <p className="text-gray-400 mt-3">
              Come back during the daily claim window
            </p>
          )}
        </div>

        {/* Referred Users Section */}
        {claimedUsers.length > 0 && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 mb-8 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Users className="text-blue-400 mr-2 h-5 w-5" />
                Your Referred Users
              </h3>
              <button
                onClick={() => setShowReferralUsers(!showReferralUsers)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {showReferralUsers ? "Hide" : "Show"} ({claimedUsers.length})
              </button>
            </div>
            {showReferralUsers && (
              <div className="mt-2 bg-gray-900/50 p-4 rounded-lg max-h-60 overflow-y-auto">
                {claimedUsers.length > 0 ? (
                  <ul className="space-y-2">
                    {claimedUsers.map((user, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b border-gray-700 pb-2"
                      >
                        <span className="text-gray-300">
                          {truncateAddress(user)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              copyToClipboard(user, `user-${index}`)
                            }
                            className="text-gray-400 hover:text-white p-1"
                            title="Copy address"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <a
                            href={getExplorerURL(user)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 p-1"
                            title="View on explorer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-center">
                    No users have used your referral code yet
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardSection;
