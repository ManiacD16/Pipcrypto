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
} from "lucide-react";
import {
  useAppKitAccount,
  useAppKitProvider,
  Provider,
  useAppKit,
} from "@reown/appkit/react";
import { contractAbi } from "../contracts/Props/contractAbi";
import { contractAddress } from "../contracts/Props/contractAddress";

const DashboardSection: React.FC = () => {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  const [totalClaimed, setTotalClaimed] = useState("0");
  const [referralCode, setReferralCode] = useState("");
  const [totalReferrals, setTotalReferrals] = useState("0");
  const [claimTime, setClaimTime] = useState({ start: 0, end: 0 });
  const [minTokens, setMinTokens] = useState({
    nonReferral: "0",
    perReferral: "0",
  });
  const [isClaimActive, setIsClaimActive] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const formatTime = (minutes: number) => {
    const date = new Date();
    date.setHours(0, minutes, 0, 0);
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const checkIfClaimActive = (start: number, end: number) => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    const currentMinutes = istNow.getHours() * 60 + istNow.getMinutes();
    return currentMinutes >= start && currentMinutes < end;
  };

  const handleClaim = async () => {
    if (!walletProvider || !address) return;
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const airdrop = new Contract(contractAddress, contractAbi, signer);
      const tx = await airdrop.claim();
      await tx.wait();
      alert("✅ Claimed Successfully!");
      // Refresh data after claiming
      fetchData();
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const fetchData = async () => {
    if (!walletProvider || !address) return;
    try {
      const provider = new BrowserProvider(walletProvider);
      const airdrop = new Contract(contractAddress, contractAbi, provider);

      const claimed = await airdrop.totalClaimToken(address);
      setTotalClaimed(ethers.formatUnits(claimed, 6));

      const refId = await airdrop.referralIds(address);
      setReferralCode(refId);

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

      try {
        const codeToClaimers = await airdrop["referralCodeToClaimers"](refId);
        setTotalReferrals(codeToClaimers.length.toString());
      } catch (e) {
        console.warn("referralCodeToClaimers failed", e);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setIsClaimActive(checkIfClaimActive(claimTime.start, claimTime.end));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [address, walletProvider, claimTime.start, claimTime.end]);

  // Calculate progress percentage for the progress bar
  const calculateProgress = () => {
    const nonRefTokens = parseFloat(minTokens.nonReferral);
    const perRefTokens = parseFloat(minTokens.perReferral);
    const totalReferred = parseInt(totalReferrals);
    const claimed = parseFloat(totalClaimed);

    const maxTokens = nonRefTokens + perRefTokens * totalReferred;
    if (maxTokens === 0) return 0;

    return Math.min((claimed / maxTokens) * 100, 100);
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen pt-14 px-4 pb-16">
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
              onClick={() => open()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
              title="Disconnect Wallet"
            >
              <LogOut className="h-4 w-4" />
              <span>Disconnect</span>
            </button>

            {copySuccess === "address" && (
              <span className="text-green-400 text-sm absolute mt-16">
                Address copied!
              </span>
            )}
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
                {referralCode || "--"}
              </span>
              <button
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-colors"
                onClick={() => copyToClipboard(referralCode, "referral")}
                title="Copy referral code"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copySuccess === "referral" && (
              <span className="text-green-400 text-sm mt-2 block">
                Code copied!
              </span>
            )}
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
              Base Tokens
            </h3>
            <div className="mt-2">
              <p className="text-3xl font-bold text-pink-400">
                {minTokens.nonReferral}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                tokens without referrals
              </p>
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

          {/* Claim Window Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Clock className="text-cyan-400 mr-2 h-5 w-5" />
              Daily Claim Window
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
          <h3 className="text-xl font-semibold mb-4">Airdrop Progress</h3>
          <div className="w-full bg-gray-900 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>0 Tokens</span>
            <span>
              {(
                parseFloat(minTokens.nonReferral) +
                parseFloat(minTokens.perReferral) * parseInt(totalReferrals)
              ).toFixed(2)}{" "}
              Tokens
            </span>
          </div>
        </div>

        {/* Claim Button */}
        <div className="text-center">
          <button
            onClick={handleClaim}
            disabled={!isClaimActive}
            className={`py-4 px-10 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-xl transform hover:-translate-y-1 ${
              isClaimActive
                ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                : "bg-gradient-to-r from-gray-700 to-gray-600 cursor-not-allowed opacity-70"
            }`}
          >
            {isClaimActive ? "Claim Airdrop Tokens" : "Claim Not Available Now"}
          </button>

          {!isClaimActive && (
            <p className="text-gray-400 mt-3">
              Come back during the daily claim window
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
