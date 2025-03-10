
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { WalletIcon, VaultIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ethers } from 'ethers';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask to use this application",
        variant: "destructive",
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="parallax-wrapper">
      <div className="parallax-content min-h-screen">
        {/* Background Layer */}
        <div 
          className="parallax-bg fixed w-full h-full bg-gradient-to-b from-slate-900 to-slate-800"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />

        {/* Middle Layer - Project Name */}
        <div 
          className="parallax-mid fixed w-full top-1/4 left-0 right-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="flex items-center justify-center space-x-6">
            <VaultIcon className="h-24 w-24 text-blue-400" />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              Saving Vault
            </h1>
          </div>
        </div>

        {/* Front Layer - Content */}
        <div className="parallax-front relative">
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-12 text-center mt-48">
              <p className="text-xl md:text-2xl text-gray-400 mt-32">
                Your secure digital vault for savings on the blockchain
              </p>
              
              <div className="card-glass p-8 rounded-2xl max-w-md mx-auto space-y-6 hover:shadow-xl transition-all duration-300 scale-hover glow">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-blue-400">Get Started</h2>
                  <p className="text-gray-400">
                    Connect your wallet to access your secure savings vault
                  </p>
                </div>
                
                <Button
                  onClick={handleConnect}
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-all hover:scale-105 pulse"
                >
                  <WalletIcon className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="card-glass p-6 rounded-xl space-y-3 hover:shadow-xl transition-all duration-300 scale-hover glow"
                  >
                    <div className="text-blue-400 text-xl font-semibold">
                      {feature.title}
                    </div>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Secure Storage",
    description: "Your funds are secured by blockchain technology",
  },
  {
    title: "Easy Access",
    description: "Deposit and withdraw with just a few clicks",
  },
  {
    title: "Full Control",
    description: "Monitor your balance and transactions in real-time",
  },
];

export default Index;
