"use client";
import { useContext, useState } from "react";
import { NetrunnerContext } from "../context/netrunner"; // Update the path to NetrunnerContext accordingly

const TestPage = () => {
  const {
    registerDonor,
    donate,
    connectWallet,
    currentAccount,
    getDonor,
    getDonationAmountSylhet,
    getDonationAmountChittagongSouth,
    getDonationAmountChittagongNorth,
    getTotalDonation,
  } = useContext(NetrunnerContext);

  const [donorDetails, setDonorDetails] = useState({
    name: "",
    mobileNum: "",
  });
  const [donationDetails, setDonationDetails] = useState({
    mobile: "",
    fundZone: "",
    amount: "",
  });
  const [donorAddress, setDonorAddress] = useState("");
  const [donationData, setDonationData] = useState({
    sylhet: "",
    chittagongSouth: "",
    chittagongNorth: "",
    total: "",
  });

  const handleRegisterDonor = async () => {
    await registerDonor(donorDetails);
  };

  const handleDonate = async () => {
    await donate(donationDetails.mobile, donationDetails.fundZone, donationDetails.amount);
  };

  const handleGetDonor = async () => {
    const donor = await getDonor(donorAddress);
    alert(`Donor Name: ${donor[0]}, Mobile Number: ${donor[1]}`);
  };

  const handleGetDonationSylhet = async () => {
    const sylhet = await getDonationAmountSylhet();
    setDonationData({ ...donationData, sylhet });
  };

  const handleGetDonationChittagongSouth = async () => {
    const chittagongSouth = await getDonationAmountChittagongSouth();
    setDonationData({ ...donationData, chittagongSouth });
  };

  const handleGetDonationChittagongNorth = async () => {
    const chittagongNorth = await getDonationAmountChittagongNorth();
    setDonationData({ ...donationData, chittagongNorth });
  };

  const handleGetTotalDonations = async () => {
    const total = await getTotalDonation();
    setDonationData({ ...donationData, total });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold mb-6 animate-bounce">
      Flood Relief Fund Management System
      </h1>

      
      <div className="mb-6">
        <h2 className="text-xl mb-2">Connect Wallet</h2>
        <button
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 transition ease-in-out"
          onClick={connectWallet}
        >
          {currentAccount ? `Connected: ${currentAccount}` : "Connect Wallet"}
        </button>
      </div>

    
      <div className="mb-6">
        <h2 className="text-xl mb-2">Register Donor</h2>
        <input
          className="block p-2 mb-2 w-full bg-gray-800 rounded"
          type="text"
          placeholder="Name"
          value={donorDetails.name}
          onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
        />
        <input
          className="block p-2 mb-2 w-full bg-gray-800 rounded"
          type="text"
          placeholder="Mobile Number"
          value={donorDetails.mobileNum}
          onChange={(e) => setDonorDetails({ ...donorDetails, mobileNum: e.target.value })}
        />
        <button
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 focus:ring-2 focus:ring-green-400 transition ease-in-out"
          onClick={handleRegisterDonor}
        >
          Register
        </button>
      </div>

     
      <div className="mb-6">
        <h2 className="text-xl mb-2">Donate</h2>
        <input
          className="block p-2 mb-2 w-full bg-gray-800 rounded"
          type="text"
          placeholder="Mobile Number"
          value={donationDetails.mobile}
          onChange={(e) => setDonationDetails({ ...donationDetails, mobile: e.target.value })}
        />
        <input
          className="block p-2 mb-2 w-full bg-gray-800 rounded"
          type="text"
          placeholder="Fund Zone (Sylhet, Chittagong South, Chittagong North)"
          value={donationDetails.fundZone}
          onChange={(e) => setDonationDetails({ ...donationDetails, fundZone: e.target.value })}
        />
        <input
          className="block p-2 mb-2 w-full bg-gray-800 rounded"
          type="text"
          placeholder="Amount in ETH"
          value={donationDetails.amount}
          onChange={(e) => setDonationDetails({ ...donationDetails, amount: e.target.value })}
        />
        <button
          className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 transition ease-in-out"
          onClick={handleDonate}
        >
          Donate
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Get Donor Information</h2>
        <input
          className="block p-2 mb-2 w-full bg-gray-800 rounded"
          type="text"
          placeholder="Donor Address"
          value={donorAddress}
          onChange={(e) => setDonorAddress(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 transition ease-in-out"
          onClick={handleGetDonor}
        >
          Get Donor
        </button>
      </div>

      
      <div className="mb-6">
        <h2 className="text-xl mb-2">Get Donation Amounts</h2>

        {/* Individual Buttons for Each Donation Amount */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-500 focus:ring-2 focus:ring-pink-400 transition ease-in-out"
            onClick={handleGetDonationSylhet}
          >
            Get Sylhet Donations
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 transition ease-in-out"
            onClick={handleGetDonationChittagongSouth}
          >
            Get Chittagong South Donations
          </button>
          <button
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 focus:ring-2 focus:ring-red-400 transition ease-in-out"
            onClick={handleGetDonationChittagongNorth}
          >
            Get Chittagong North Donations
          </button>
          <button
            className="px-4 py-2 bg-teal-600 rounded hover:bg-teal-500 focus:ring-2 focus:ring-teal-400 transition ease-in-out"
            onClick={handleGetTotalDonations}
          >
            Get Total Donations
          </button>
        </div>

      
        <div className="mt-4 space-y-2">
          <p>Sylhet Donations: {donationData.sylhet} ETH</p>
          <p>Chittagong South Donations: {donationData.chittagongSouth} ETH</p>
          <p>Chittagong North Donations: {donationData.chittagongNorth} ETH</p>
          <p>Total Donations: {donationData.total} ETH</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
