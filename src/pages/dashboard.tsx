import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CreditCard, 
  TrendingUp, 
  Globe, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Bell,
  Settings,
  LogOut,
  User,
  Shield,
  Smartphone,
  DollarSign,
  PoundSterling,
  Euro
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'bill';
  amount: number;
  currency: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change: number;
  icon: React.ComponentType<any>;
}

export default function DashboardPage() {
  const [user] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    isVerified: true,
    balance: 2450.75,
    currency: 'GBP'
  });

  const [showBalance, setShowBalance] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'send',
      amount: 250,
      currency: 'GBP',
      recipient: 'Mama Adunni',
      status: 'completed',
      date: '2025-01-15T10:30:00Z',
      reference: 'MH2025011501'
    },
    {
      id: '2',
      type: 'bill',
      amount: 45000,
      currency: 'NGN',
      recipient: 'NEPA Electricity',
      status: 'completed',
      date: '2025-01-14T15:45:00Z',
      reference: 'MH2025011402'
    },
    {
      id: '3',
      type: 'send',
      amount: 180,
      currency: 'GBP',
      recipient: 'Brother Kemi',
      status: 'pending',
      date: '2025-01-13T09:15:00Z',
      reference: 'MH2025011303'
    }
  ]);

  const [exchangeRates] = useState<ExchangeRate[]>([
    { from: 'GBP', to: 'NGN', rate: 1850.45, change: 2.3, icon: PoundSterling },
    { from: 'EUR', to: 'NGN', rate: 1620.30, change: -1.2, icon: Euro },
    { from: 'USD', to: 'NGN', rate: 1580.75, change: 0.8, icon: DollarSign }
  ]);

  const summaryCards = [
    {
      title: 'Total Sent This Month',
      value: '£1,245.50',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Send,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Bills Paid',
      value: '8',
      change: '+3 from last month',
      changeType: 'positive' as const,
      icon: CreditCard,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Money Saved',
      value: '£89.20',
      change: 'vs traditional banks',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'from-primary to-yellow-500'
    },
    {
      title: 'Active Recipients',
      value: '5',
      change: 'Family & Friends',
      changeType: 'neutral' as const,
      icon: Globe,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Send Money',
      description: 'Transfer to family & friends',
      icon: Send,
      color: 'bg-primary hover:bg-primary/90',
      href: '/send-money'
    },
    {
      title: 'Pay Bills',
      description: 'Utilities, education & more',
      icon: CreditCard,
      color: 'bg-supporting hover:bg-supporting/90',
      href: '/pay-bills'
    },
    {
      title: 'Add Recipient',
      description: 'New family member or friend',
      icon: Plus,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/recipients/add'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
      case 'receive':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'bill':
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-foundation-light dark:bg-foundation-dark mode-transition">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary dark:text-foundation-light font-jakarta">
                  Welcome back, {user.name.split(' ')[0]} 👋
                </h1>
                <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta mt-1">
                  Here's what's happening with your money today
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-secondary font-jakarta"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Account Balance Card */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-supporting/10 dark:from-primary/5 dark:to-supporting/5 border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta mb-2">
                      Available Balance
                    </p>
                    <div className="flex items-center space-x-3">
                      {showBalance ? (
                        <h2 className="text-3xl font-bold text-secondary dark:text-foundation-light font-jakarta">
                          £{user.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </h2>
                      ) : (
                        <h2 className="text-3xl font-bold text-secondary dark:text-foundation-light font-jakarta">
                          ••••••
                        </h2>
                      )}
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
                        aria-label={showBalance ? "Hide balance" : "Show balance"}
                      >
                        {showBalance ? (
                          <EyeOff className="w-5 h-5 text-secondary/70 dark:text-foundation-light/70" />
                        ) : (
                          <Eye className="w-5 h-5 text-secondary/70 dark:text-foundation-light/70" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {user.isVerified && (
                      <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300 font-jakarta">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
          >
            {summaryCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: "easeInOut" }}
                whileHover={{ y: -4, boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="bg-white dark:bg-slate-700/50 border-none shadow-lg consistent-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-1">
                      {card.value}
                    </h3>
                    <p className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta mb-2">
                      {card.title}
                    </p>
                    <div className={`text-sm font-medium font-jakarta ${
                      card.changeType === 'positive' 
                        ? 'text-green-600 dark:text-green-400' 
                        : card.changeType === 'negative'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-secondary/60 dark:text-foundation-light/60'
                    }`}>
                      {card.change}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions & Recent Transactions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                <Card className="bg-white dark:bg-slate-700/50 border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.title}
                          className={`${action.color} text-white p-6 rounded-xl text-left transition-all duration-300 ease-in-out consistent-hover`}
                          whileHover={{ y: -2, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)" }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: "easeInOut" }}
                        >
                          <action.icon className="w-8 h-8 mb-3" />
                          <h3 className="font-semibold font-jakarta mb-1">{action.title}</h3>
                          <p className="text-sm opacity-90 font-jakarta">{action.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Transactions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              >
                <Card className="bg-white dark:bg-slate-700/50 border-none shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Recent Transactions
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {transactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-600/30 rounded-xl consistent-hover"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 + (index * 0.1), ease: "easeInOut" }}
                            whileHover={{ x: 4 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <div>
                                <h4 className="font-medium text-secondary dark:text-foundation-light font-jakarta">
                                  {transaction.recipient}
                                </h4>
                                <p className="text-sm text-secondary/60 dark:text-foundation-light/60 font-jakarta">
                                  {formatDate(transaction.date)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-secondary dark:text-foundation-light font-jakarta">
                                  {transaction.currency === 'GBP' ? '£' : '₦'}{transaction.amount.toLocaleString()}
                                </span>
                                {getStatusIcon(transaction.status)}
                              </div>
                              <p className="text-xs text-secondary/50 dark:text-foundation-light/50 font-jakarta">
                                {transaction.reference}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Exchange Rates & Account Info */}
            <div className="space-y-8">
              {/* Exchange Rates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
              >
                <Card className="bg-white dark:bg-slate-700/50 border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                      Live Exchange Rates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {exchangeRates.map((rate, index) => (
                        <motion.div
                          key={`${rate.from}-${rate.to}`}
                          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-600/30 rounded-xl"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 + (index * 0.1), ease: "easeInOut" }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center">
                              <rate.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary dark:text-foundation-light font-jakarta">
                                {rate.from}/NGN
                              </p>
                              <p className="text-sm text-secondary/60 dark:text-foundation-light/60 font-jakarta">
                                1 {rate.from} = ₦{rate.rate.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className={`text-sm font-medium font-jakarta ${
                            rate.change > 0 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {rate.change > 0 ? '+' : ''}{rate.change}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
              >
                <Card className="bg-white dark:bg-slate-700/50 border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                      Account Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary dark:text-foundation-light font-jakarta">
                            {user.name}
                          </p>
                          <p className="text-sm text-secondary/60 dark:text-foundation-light/60 font-jakarta">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary dark:text-foundation-light font-jakarta">
                            Verification Status
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 font-jakarta">
                            Fully Verified
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary dark:text-foundation-light font-jakarta">
                            Mobile App
                          </p>
                          <p className="text-sm text-secondary/60 dark:text-foundation-light/60 font-jakarta">
                            Download for faster transfers
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta mt-4"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}