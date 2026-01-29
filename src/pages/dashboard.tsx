import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useStakeholderAuth } from '@/hooks/useStakeholderAuth';

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
  const { mockUser } = useStakeholderAuth();
  
  const user = {
    name: mockUser ? `${mockUser.firstName} ${mockUser.lastName}` : 'User',
    email: mockUser?.email || 'user@example.com',
    isVerified: true,
    balance: 2450.75,
    currency: 'GBP'
  };

  const [showBalance, setShowBalance] = useState(true);

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
      color: 'from-primary to-orange-600'
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
        return <Clock className="w-4 h-4 text-orange-600" />;
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

  const IconComponent = (props: { card: typeof summaryCards[0] }) => {
    const Icon = props.card.icon;
    return <Icon className="w-7 h-7 text-white" />;
  };

  const ActionIcon = (props: { action: typeof quickActions[0] }) => {
    const Icon = props.action.icon;
    return <Icon className="w-6 h-6 text-white" />;
  };

  const RateIcon = (props: { rate: typeof exchangeRates[0] }) => {
    const Icon = props.rate.icon;
    return <Icon className="w-5 h-5 text-primary dark:text-primary" />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-foundation-light to-supporting/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 mode-transition">
      <Header />
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-supporting/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact User Greeting - Like Reference Design */}
          <motion.div
            className="mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-supporting rounded-full shadow-lg flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <span className="text-lg font-bold text-white font-jakarta">
                    {user.name.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <p className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta">Welcome</p>
                  <h2 className="text-base sm:text-lg font-bold text-secondary dark:text-foundation-light font-jakarta">
                    {user.name}
                  </h2>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full hover:bg-primary/10"
              >
                <Bell className="w-5 h-5 text-secondary/60 dark:text-foundation-light/60" />
              </Button>
            </div>
          </motion.div>

          {/* Hero Balance Card - Dominant Element */}
          <motion.div
            className="mb-5 sm:mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-supporting border-none shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
              <CardContent className="relative p-6 sm:p-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <PoundSterling className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white/90 font-jakarta text-sm font-medium">
                        Total Balance
                      </p>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="ml-auto p-2 hover:bg-white/20 rounded-lg transition-all"
                        aria-label={showBalance ? "Hide balance" : "Show balance"}
                      >
                        {showBalance ? (
                          <EyeOff className="w-5 h-5 text-white/80" />
                        ) : (
                          <Eye className="w-5 h-5 text-white/80" />
                        )}
                      </button>
                    </div>
                    {showBalance ? (
                      <h1 className="text-5xl sm:text-6xl font-bold text-white font-jakarta mb-2">
                        £{user.balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </h1>
                    ) : (
                      <h1 className="text-5xl sm:text-6xl font-bold text-white font-jakarta mb-2">
                        ••••••
                      </h1>
                    )}
                  </div>
                  
                  {/* Top Up Button - Like Reference Design */}
                  <Button
                    className="w-full bg-white hover:bg-white/90 text-primary font-jakarta shadow-lg transition-all py-6 text-base font-semibold"
                  >
                    <PoundSterling className="w-5 h-5 mr-2" />
                    Top Up
                  </Button>
                  
                  <div className="flex gap-2">
                    {user.isVerified && (
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 flex-1 sm:flex-none">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-white font-jakarta whitespace-nowrap">
                          Verified
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-white/20 flex-1 sm:flex-none">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-white/90 font-jakarta whitespace-nowrap">
                        GBP Account
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity - Small Cards Section */}
          <motion.div
            className="mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-sm font-semibold text-secondary/70 dark:text-foundation-light/70 font-jakarta mb-3">
              Recent Activity
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {summaryCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + (index * 0.05), ease: "easeOut" }}
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-primary/10 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <IconComponent card={card} className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-1">
                      {card.value}
                    </h3>
                    <p className="text-xs text-secondary/70 dark:text-foundation-light/70 font-jakarta mb-2">
                      {card.title}
                    </p>
                    <div className={`text-xs font-medium font-jakarta ${
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
            </div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Quick Actions & Recent Transactions */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-primary/10 dark:border-slate-700 shadow-xl">
                  <CardHeader className="border-b border-primary/10 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-supporting rounded-lg flex items-center justify-center">
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Quick Actions
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {quickActions.map((action, index) => (
                        <Link to={action.href} key={action.title}>
                          <motion.div
                            className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 border border-primary/20 dark:border-slate-600 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-left transition-all duration-300 h-full group hover:border-primary/40 dark:hover:border-primary/40 shadow-md hover:shadow-xl"
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.1), ease: "easeInOut" }}
                          >
                            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-8 translate-x-8 sm:-translate-y-10 sm:translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className={`relative w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <ActionIcon action={action} />
                            </div>
                            <h3 className="relative font-semibold font-jakarta mb-1 text-sm sm:text-base text-secondary dark:text-foundation-light">{action.title}</h3>
                            <p className="relative text-xs sm:text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">{action.description}</p>
                          </motion.div>
                        </Link>
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
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-primary/10 dark:border-slate-700 shadow-xl">
                  <CardHeader className="border-b border-primary/10 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <CardTitle className="text-base sm:text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                          Recent Transactions
                        </CardTitle>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta shadow-sm text-xs sm:text-sm px-2 sm:px-3"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                    <div className="space-y-2 sm:space-y-3">
                      <AnimatePresence>
                        {transactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            className="relative overflow-hidden flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-700/30 dark:to-transparent border border-primary/10 dark:border-slate-600 rounded-lg sm:rounded-xl transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 + (index * 0.1), ease: "easeInOut" }}
                            whileHover={{ x: 4, scale: 1.01 }}
                          >
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white to-slate-100 dark:from-slate-600 dark:to-slate-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                {getTransactionIcon(transaction.type)}
                                <div className="absolute -top-1 -right-1">
                                  {getStatusIcon(transaction.status)}
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-sm sm:text-base text-secondary dark:text-foundation-light font-jakarta truncate">
                                  {transaction.recipient}
                                </h4>
                                <p className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta truncate">
                                  {formatDate(transaction.date)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-2">
                              <div className="flex items-center justify-end space-x-1 sm:space-x-2 mb-1">
                                <span className="font-bold text-sm sm:text-base text-secondary dark:text-foundation-light font-jakarta whitespace-nowrap">
                                  {transaction.currency === 'GBP' ? '£' : '₦'}{transaction.amount.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-secondary/50 dark:text-foundation-light/50 font-jakarta truncate max-w-[100px] sm:max-w-none">
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
            <div className="space-y-6 md:space-y-8">
              {/* Exchange Rates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-primary/10 dark:border-slate-700 shadow-xl">
                  <CardHeader className="border-b border-primary/10 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Live Exchange Rates
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                    <div className="space-y-2 sm:space-y-3">
                      {exchangeRates.map((rate, index) => (
                        <motion.div
                          key={`${rate.from}-${rate.to}`}
                          className="relative overflow-hidden flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-700/30 dark:to-transparent border border-primary/10 dark:border-slate-600 rounded-lg sm:rounded-xl transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 + (index * 0.1), ease: "easeInOut" }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-supporting/20 dark:from-primary/10 dark:to-supporting/10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                              <RateIcon rate={rate} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-sm sm:text-base text-secondary dark:text-foundation-light font-jakarta truncate">
                                {rate.from}/NGN
                              </p>
                              <p className="text-xs sm:text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta truncate">
                                1 {rate.from} = ₦{rate.rate.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold font-jakarta flex-shrink-0 ${
                            rate.change > 0 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                            {rate.change > 0 ? '↑' : '↓'} {Math.abs(rate.change)}%
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
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-primary/10 dark:border-slate-700 shadow-xl">
                  <CardHeader className="border-b border-primary/10 dark:border-slate-700 p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Account Overview
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-700/30 dark:to-transparent border border-primary/10 dark:border-slate-600 rounded-lg sm:rounded-xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-supporting/20 dark:from-primary/10 dark:to-supporting/10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm sm:text-base text-secondary dark:text-foundation-light font-jakarta truncate">
                            {user.name}
                          </p>
                          <p className="text-xs sm:text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-900/10 dark:to-transparent border border-green-200/30 dark:border-green-700/30 rounded-lg sm:rounded-xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm sm:text-base text-secondary dark:text-foundation-light font-jakarta truncate">
                            Verification Status
                          </p>
                          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-jakarta font-medium truncate">
                            ✓ Fully Verified
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent border border-blue-200/30 dark:border-blue-700/30 rounded-lg sm:rounded-xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                          <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm sm:text-base text-secondary dark:text-foundation-light font-jakarta truncate">
                            Mobile App
                          </p>
                          <p className="text-xs text-secondary/70 dark:text-foundation-light/70 font-jakarta truncate">
                            Download for faster transfers
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-primary/30 hover:border-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-supporting/10 text-secondary dark:text-foundation-light font-jakarta mt-3 sm:mt-4 shadow-sm transition-all duration-300 text-sm"
                      >
                        <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
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
