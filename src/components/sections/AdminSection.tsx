import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Provider,
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { LogOut } from "lucide-react";
import { BrowserProvider, Contract } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Shield, Settings, Check, X, ArrowLeft } from "lucide-react";
import { contractAbi } from "../contracts/Props/contractAbi";
import { contractAddress } from "../contracts/Props/contractAddress";

const AdminPage: React.FC = () => {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const navigate = useNavigate();

  const [isOwner, setIsOwner] = useState(false);
  const [isCheckingOwner, setIsCheckingOwner] = useState(true);
  const [isDeductUSDT, setIsDeductUSDT] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const [totalClaimed, setTotalClaimed] = useState("0");
  //   const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const checkIfOwner = async () => {
      if (!walletProvider || !address) {
        setIsCheckingOwner(false);
        return;
      }

      try {
        setIsCheckingOwner(true);
        const provider = new BrowserProvider(walletProvider);
        const airdrop = new Contract(contractAddress, contractAbi, provider);

        // Check if the connected address is the contract owner
        const ownerAddress = await airdrop.owner();
        setIsOwner(ownerAddress.toLowerCase() === address.toLowerCase());

        // Get current deduct USDT status
        const deductStatus = await airdrop.deductUSDTOnClaim();
        setIsDeductUSDT(deductStatus);

        // fetchStats(provider, airdrop);

        setIsCheckingOwner(false);
      } catch (error) {
        console.error("Error checking owner status:", error);
        setIsCheckingOwner(false);
        toast.error("Error connecting to the contract. Please try again.");
      }
    };

    checkIfOwner();
  }, [address, walletProvider]);

  //   const fetchStats = async (provider: any, _airdrop: ethers.Contract) => {
  //     try {
  //       // These are example stats - modify based on your contract's actual functions
  //       // You might need to iterate through events or use your contract's specific methods

  //       // Example: Get total claimed tokens across all users
  //       // This is a placeholder - adjust based on your contract's capabilities
  //       const balance = await provider.getBalance(contractAddress);
  //       setTotalClaimed(ethers.formatEther(balance));

  //       // Example: Set a placeholder for total users
  //       // In a real scenario, you would need to track this in your contract
  //       setTotalUsers(0); // Placeholder
  //     } catch (error) {
  //       console.error("Error fetching stats:", error);
  //     }
  //   };

  const toggleDeductUSDT = async () => {
    if (!walletProvider || !address || !isOwner) return;

    try {
      setIsLoading(true);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const airdrop = new Contract(contractAddress, contractAbi, signer);

      const toastId = toast.info(
        `Setting USDT deduction to: ${!isDeductUSDT}`,
        {
          autoClose: false,
        }
      );

      // Call the offerToUser function with the opposite of current status
      const tx = await airdrop.offerToUser(!isDeductUSDT);

      toast.update(toastId, {
        render: "Transaction submitted! Waiting for confirmation...",
        type: "info",
      });

      await tx.wait();

      // Update the local state
      setIsDeductUSDT(!isDeductUSDT);

      toast.update(toastId, {
        render: `Successfully ${
          !isDeductUSDT ? "enabled" : "disabled"
        } USDT deduction`,
        type: "success",
        autoClose: 5000,
      });
    } catch (error: any) {
      console.error("Error toggling USDT deduction:", error);
      toast.error(`Error: ${error?.message || "Something went wrong"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to login if wallet not connected
  useEffect(() => {
    if (!address && !isCheckingOwner) {
      navigate("/login");
    }
  }, [address, isCheckingOwner, navigate]);

  const handleDisconnect = async () => {
    await open(); // Open the wallet dialog
    navigate("/login"); // Redirect to login page
  };

  // Loading state
  if (isCheckingOwner) {
    return (
      <div className="min-h-screen bg-[#0c0435] flex items-center justify-center px-4">
        <div className="bg-[#1b0f3a] text-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <p className="text-gray-400 mb-6">Verifying owner status...</p>
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Not owner, show unauthorized message
  if (!isOwner && address) {
    return (
      <div className="min-h-screen bg-[#0c0435] flex items-center justify-center px-4">
        <div className="bg-[#1b0f3a] text-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <div className="text-red-500 mb-4">
            <Shield className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">
            Only the contract owner can access this page.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Connected address: {address}
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0435] text-white">
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

      {/* Admin Panel */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="mr-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Admin Connected</span>
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

        {/* Stats Row */}
        <div className="grid grid-cols-1 mb-8">
          {/* <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-lg text-gray-300 mb-2">Contract Balance</h3>
            <p className="text-2xl font-bold">{totalClaimed} ETH</p>
          </div> */}

          {/* <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-lg text-gray-300 mb-2">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div> */}

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-lg text-gray-300 mb-2">USDT Deduction</h3>
            <p className="text-2xl font-bold flex items-center">
              {isDeductUSDT ? (
                <>
                  <Check className="text-green-500 mr-2 h-6 w-6" /> Enabled
                </>
              ) : (
                <>
                  <X className="text-red-500 mr-2 h-6 w-6" /> Disabled
                </>
              )}
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-[#1b0f3a] p-6 rounded-2xl shadow-lg border border-gray-700 mb-8">
          <div className="flex items-center mb-4">
            <Settings className="text-blue-400 mr-2 h-5 w-5" />
            <h2 className="text-xl font-bold">Contract Controls</h2>
          </div>

          <div className="divide-y divide-gray-700">
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">USDT Deduction</h3>
                  <p className="text-gray-400 text-sm">
                    When enabled, USDT will be deducted from users during claims
                  </p>
                </div>
                <button
                  onClick={toggleDeductUSDT}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    isDeductUSDT
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isLoading
                    ? "Processing..."
                    : isDeductUSDT
                    ? "Disable"
                    : "Enable"}
                </button>
              </div>
            </div>

            {/* Add more controls here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
