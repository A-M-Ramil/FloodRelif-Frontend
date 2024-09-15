"use client";
import React, {useState, useEffect} from 'react';
import Web3Modal from "web3modal";

import { FundingABI,FundingAddress } from './context';


const Netrunner = (signer) => {
    const ethers= require('ethers');
    return new ethers.Contract(FundingAddress, FundingABI, signer);
}

export const NetrunnerContext = React.createContext();

export const NetrunnerProvider = ({children}) => {
    const ethers= require('ethers');
    const [currentAccount, setCurrentAccount] = useState("");
    const registerDonor = async (details) =>{
        const {name, mobileNum} = details;
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        try {
            const transaction = await contract.registerDonor(name, mobileNum);
            await transaction.wait();
        } catch (error) {
            console.log(error);
        }}

    const donate = async(mobile,fundZone,amount) => {
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        const donationData =await contract.donate(mobile,fundZone,{value:ethers.utils.parseEther(amount)});

       
            
        await donationData.wait();
        location.reload();
        
        return donationData;
        }

           
    const getDonor = async (address) => {
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        try {
            const donorData = await contract.getDonor(address);
            return donorData; // Returns name and mobileNum
        } catch (error) {
            console.log(error);
        }
    };

   
    const getDonationAmountSylhet = async () => {
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        try {
            const donationSylhet = await contract.getDonationAmountSylhet();
            return ethers.utils.formatEther(donationSylhet); // Converts to Ether
        } catch (error) {
            console.log(error);
        }
    };

  
    const getDonationAmountChittagongSouth = async () => {
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        try {
            const donationChittagongSouth = await contract.getDonationAmountChittagongSouth();
            return ethers.utils.formatEther(donationChittagongSouth); // Converts to Ether
        } catch (error) {
            console.log(error);
        }
    };

   
    const getDonationAmountChittagongNorth = async () => {
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        try {
            const donationChittagongNorth = await contract.getDonationAmountChittagongNorth();
            return ethers.utils.formatEther(donationChittagongNorth); // Converts to Ether
        } catch (error) {
            console.log(error);
        }
    };

 
    const getTotalDonation = async () => {
        const web3ModalNew = new Web3Modal();
        const connection = await web3ModalNew.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = Netrunner(signer);

        try {
            const totalDonation = await contract.getTotalDonation();
            return ethers.utils.formatEther(totalDonation); // Converts to Ether
        } catch (error) {
            console.log(error);
        }
    };


        const checkWalletConnection = async () => {
            try{
                if (!window.ethereum) 
                    return setOpenError(true), setError("No wallet detected");
                const accounts = await window.ethereum.request({
                    method:"eth_accounts",
                });
                if (accounts.length){
                    setCurrentAccount(accounts[0]);
                    
                }
                else{
                    console.log("No account detected");
                }
                
            }
            catch(error){
                console.log("Error connecting to wallet");
            }
        
        
        };
        useEffect(() => {
            checkWalletConnection();
        }, []);
    
        const connectWallet = async () => {
            try{
            if (!window.ethereum) 
                return console.log("No wallet detected");
            const accounts = await window.ethereum.request({    
                method: 'eth_requestAccounts' });
    
            setCurrentAccount(accounts[0]);
    
        
        }catch(error){
            console.log("Error connecting to wallet");
        }
    
        
        
        }




        return(
            <NetrunnerContext.Provider 
            value={{
                registerDonor, 
                donate, 
                connectWallet, 
                currentAccount,
                getDonor,
                getDonationAmountSylhet,
                getDonationAmountChittagongSouth,
                getDonationAmountChittagongNorth,
                getTotalDonation
                
                
                
                }}>
                {children}
            </NetrunnerContext.Provider>
        )
    }