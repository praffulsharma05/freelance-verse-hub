
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Wallet as WalletType, Transaction } from '@/types/supabase';
import Navbar from '@/components/Navbar';
import AIChatBot from '@/components/AIChatBot';
import FloatingMessage from '@/components/FloatingMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

const Wallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchWalletData() {
      if (!user) return;
      
      try {
        // Fetch wallet
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (walletError) throw walletError;
        setWallet(walletData);
        
        // Fetch transactions
        if (walletData) {
          const { data: transactionData, error: transactionError } = await supabase
            .from('transactions')
            .select('*')
            .eq('wallet_id', walletData.id)
            .order('created_at', { ascending: false });
            
          if (transactionError) throw transactionError;
          setTransactions(transactionData || []);
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchWalletData();
  }, [user]);
  
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
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <p>Loading wallet data...</p>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="text-gray-600 mb-2">ECA Coins Balance</h3>
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="text-orange-400" size={36} />
                  <span className="text-5xl font-bold text-green-600">{wallet?.balance || 0}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Account Actions */}
            <div className="flex justify-center mb-8">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                Get More ECAcoins
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
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.created_at ? format(new Date(transaction.created_at), 'MMM dd, yyyy') : ''}
                          </p>
                        </div>
                        <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <p className="mb-2">No transactions yet</p>
                    <p className="text-sm">Complete tasks and projects to earn coins</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <FloatingMessage />
      <AIChatBot />
    </div>
  );
};

export default Wallet;
