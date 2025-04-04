
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';

const Wallet = () => {
  const [balance] = useState(0);
  const [transactions] = useState<any[]>([]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft size={16} /> Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">My Wallet</h1>
          </div>
        </div>
        
        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-8 text-center">
            <h3 className="text-gray-600 mb-2">ECA Coins Balance</h3>
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="text-orange-400" size={36} />
              <span className="text-5xl font-bold text-green-600">{balance}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Actions */}
        <div className="flex justify-center mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8">
            ECAcoins
          </Button>
        </div>
        
        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {/* Transaction items would be mapped here */}
                <p>Transactions will appear here.</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p className="mb-2">No transactions yet</p>
                <p className="text-sm">Complete tasks and projects to earn coins</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Wallet;
