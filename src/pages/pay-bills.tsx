import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Zap,
  Wifi,
  GraduationCap,
  Home,
  Phone,
  Tv,
  Droplets,
  Building2,
  CreditCard,
  Loader2,
  ChevronDown,
  Search,
  Star,
  Shield,
  Info
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

// Countries we support
const countries = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', rate: 1850.45 },
  { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭', rate: 15.82 },
  { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪', rate: 195.30 },
];

// Bill categories
const billCategories = [
  { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
  { id: 'internet', name: 'Internet & Cable', icon: Wifi, color: 'bg-blue-500' },
  { id: 'education', name: 'School Fees', icon: GraduationCap, color: 'bg-purple-500' },
  { id: 'rent', name: 'Rent & Housing', icon: Home, color: 'bg-green-500' },
  { id: 'airtime', name: 'Airtime & Data', icon: Phone, color: 'bg-pink-500' },
  { id: 'tv', name: 'TV Subscription', icon: Tv, color: 'bg-red-500' },
  { id: 'water', name: 'Water Bill', icon: Droplets, color: 'bg-cyan-500' },
];

// Mock billers by category
const billersByCategory: Record<string, { id: string; name: string; logo: string }[]> = {
  electricity: [
    { id: 'ekedc', name: 'Eko Electricity', logo: '⚡' },
    { id: 'ikedc', name: 'Ikeja Electric', logo: '💡' },
    { id: 'phedc', name: 'Port Harcourt Electric', logo: '🔌' },
  ],
  internet: [
    { id: 'spectranet', name: 'Spectranet', logo: '📡' },
    { id: 'smile', name: 'Smile Communications', logo: '😊' },
    { id: 'swift', name: 'Swift Networks', logo: '🚀' },
  ],
  education: [
    { id: 'school1', name: 'University of Lagos', logo: '🎓' },
    { id: 'school2', name: 'Covenant University', logo: '📚' },
    { id: 'school3', name: 'LASU', logo: '🏫' },
  ],
  airtime: [
    { id: 'mtn', name: 'MTN Nigeria', logo: '📱' },
    { id: 'airtel', name: 'Airtel Nigeria', logo: '📞' },
    { id: 'glo', name: 'Glo Mobile', logo: '🌐' },
    { id: '9mobile', name: '9mobile', logo: '📲' },
  ],
  tv: [
    { id: 'dstv', name: 'DStv', logo: '📺' },
    { id: 'gotv', name: 'GOtv', logo: '🎬' },
    { id: 'startimes', name: 'StarTimes', logo: '⭐' },
  ],
  water: [
    { id: 'lagos-water', name: 'Lagos Water Corp', logo: '💧' },
  ],
  rent: [
    { id: 'rent-direct', name: 'Direct to Landlord', logo: '🏠' },
  ],
};

// Saved bill payments
const savedBills = [
  { id: '1', name: "Mama's Electricity", category: 'electricity', biller: 'Eko Electricity', accountNumber: '1234567890', isFavorite: true },
  { id: '2', name: 'Home Internet', category: 'internet', biller: 'Spectranet', accountNumber: 'SPEC123456', isFavorite: true },
  { id: '3', name: "Sister's School Fees", category: 'education', biller: 'University of Lagos', accountNumber: 'UNILAG2024001', isFavorite: false },
];

type Step = 1 | 2 | 3 | 4 | 5;

interface BillData {
  country: typeof countries[0] | null;
  category: typeof billCategories[0] | null;
  biller: { id: string; name: string; logo: string } | null;
  accountNumber: string;
  amount: string;
  localAmount: string;
  savedBill: typeof savedBills[0] | null;
  isNewBill: boolean;
  billName: string;
  paymentMethod: string;
}

export default function PayBillsPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [data, setData] = useState<BillData>({
    country: countries[0],
    category: null,
    biller: null,
    accountNumber: '',
    amount: '',
    localAmount: '',
    savedBill: null,
    isNewBill: false,
    billName: '',
    paymentMethod: 'card',
  });

  const steps = [
    { number: 1, title: 'Category' },
    { number: 2, title: 'Biller' },
    { number: 3, title: 'Details' },
    { number: 4, title: 'Review' },
    { number: 5, title: 'Complete' },
  ];

  const calculateLocalAmount = (gbpAmount: string) => {
    if (!gbpAmount || !data.country) return '';
    const amount = parseFloat(gbpAmount);
    if (isNaN(amount)) return '';
    return (amount * data.country.rate).toFixed(2);
  };

  const handleAmountChange = (value: string) => {
    setData({ ...data, amount: value, localAmount: calculateLocalAmount(value) });
  };

  const nextStep = () => currentStep < 5 && setCurrentStep((currentStep + 1) as Step);
  const prevStep = () => currentStep > 1 && setCurrentStep((currentStep - 1) as Step);

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCurrentStep(5);
  };

  // Step 1: Select Category
  const renderCategoryStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">What bill would you like to pay?</h2>
        <p className="text-gray-500 dark:text-gray-400">Select a category or choose from your saved bills</p>
      </div>

      {/* Country Selection */}
      <div className="bg-gray-50 dark:bg-secondary/30 rounded-xl p-4 flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">Paying bill in</span>
        <div className="relative">
          <select
            value={data.country?.code || 'NG'}
            onChange={(e) => {
              const country = countries.find(c => c.code === e.target.value);
              if (country) setData({ ...data, country });
            }}
            className="appearance-none bg-white dark:bg-secondary/50 px-4 py-2 rounded-lg pr-10 font-semibold text-secondary dark:text-white cursor-pointer"
          >
            {countries.map(c => (<option key={c.code} value={c.code}>{c.flag} {c.name}</option>))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Saved Bills */}
      {savedBills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" /> Saved Bills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedBills.slice(0, 4).map(bill => {
              const cat = billCategories.find(c => c.id === bill.category);
              return (
                <button
                  key={bill.id}
                  onClick={() => {
                    setData({
                      ...data,
                      savedBill: bill,
                      category: cat || null,
                      biller: { id: bill.id, name: bill.biller, logo: '' },
                      accountNumber: bill.accountNumber,
                      isNewBill: false,
                    });
                    setCurrentStep(3);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-lg ${cat?.color || 'bg-gray-500'} flex items-center justify-center text-white`}>
                    {cat && <cat.icon className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-secondary dark:text-white truncate">{bill.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{bill.biller}</div>
                  </div>
                  {bill.isFavorite && <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bill Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">All Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {billCategories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setData({ ...data, category, savedBill: null, isNewBill: true });
                nextStep();
              }}
              className={`p-5 rounded-xl border-2 transition-all hover:border-primary ${data.category?.id === category.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-3`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-medium text-secondary dark:text-white text-sm">{category.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Select Biller
  const renderBillerStep = () => {
    const billers = data.category ? billersByCategory[data.category.id] || [] : [];
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">Select your {data.category?.name} provider</h2>
          <p className="text-gray-500 dark:text-gray-400">Choose from available billers in {data.country?.name}</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search providers..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div className="space-y-3">
          {billers.map(biller => (
            <button
              key={biller.id}
              onClick={() => {
                setData({ ...data, biller });
                nextStep();
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${data.biller?.id === biller.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
            >
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
                {biller.logo}
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-secondary dark:text-white">{biller.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{data.category?.name}</div>
              </div>
              {data.biller?.id === biller.id && <Check className="w-5 h-5 text-primary" />}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Enter Details
  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">Enter payment details</h2>
        <p className="text-gray-500 dark:text-gray-400">{data.biller?.name || data.savedBill?.biller}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {data.category?.id === 'airtime' ? 'Phone Number' : data.category?.id === 'education' ? 'Student ID / Matric Number' : 'Account / Meter Number'}
          </label>
          <input
            type="text"
            value={data.accountNumber}
            onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
            placeholder={data.category?.id === 'airtime' ? '08012345678' : 'Enter account number'}
            className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>

        <div className="bg-gray-50 dark:bg-secondary/30 rounded-2xl p-6">
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Amount to pay (GBP)</label>
          <div className="flex items-center gap-4">
            <span className="text-2xl text-gray-400">£</span>
            <input
              type="number"
              value={data.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="flex-1 text-4xl font-bold bg-transparent border-none focus:outline-none text-secondary dark:text-white"
            />
          </div>
        </div>

        {data.amount && data.country && (
          <div className="flex items-center justify-between bg-primary/10 dark:bg-primary/20 rounded-xl p-4">
            <span className="text-gray-600 dark:text-gray-300">Equivalent in {data.country.currency}</span>
            <span className="text-xl font-bold text-primary">{data.country.currency} {parseFloat(data.localAmount).toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Info className="w-4 h-4" />
          <span>Rate: 1 GBP = {data.country?.rate.toLocaleString()} {data.country?.currency}</span>
        </div>
      </div>

      {/* Save this bill */}
      {!data.savedBill && (
        <div className="pt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-secondary dark:text-white">Save this bill for quick access</span>
          </label>
          <input
            type="text"
            value={data.billName}
            onChange={(e) => setData({ ...data, billName: e.target.value })}
            placeholder="Give it a name (e.g., Mama's Electricity)"
            className="w-full mt-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* Payment Method */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-white mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setData({ ...data, paymentMethod: 'card' })} className={`p-4 rounded-xl border-2 transition-all ${data.paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="font-medium text-secondary dark:text-white">Card</div>
          </button>
          <button onClick={() => setData({ ...data, paymentMethod: 'bank' })} className={`p-4 rounded-xl border-2 transition-all ${data.paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
            <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="font-medium text-secondary dark:text-white">Bank Transfer</div>
          </button>
        </div>
      </div>
    </div>
  );

  // Step 4: Review
  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">Review your payment</h2>
        <p className="text-gray-500 dark:text-gray-400">Please confirm the details before paying</p>
      </div>

      <div className="bg-gray-50 dark:bg-secondary/30 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">You pay</span>
          <span className="text-2xl font-bold text-secondary dark:text-white">£{data.amount}</span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">Bill amount</span>
          <span className="text-2xl font-bold text-primary">{data.country?.currency} {parseFloat(data.localAmount).toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary/20 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${data.category?.color} flex items-center justify-center`}>
            {data.category && <data.category.icon className="w-6 h-6 text-white" />}
          </div>
          <div>
            <div className="font-semibold text-secondary dark:text-white">{data.biller?.name || data.savedBill?.biller}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{data.accountNumber}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between py-2"><span className="text-gray-500 dark:text-gray-400">Category</span><span className="font-medium text-secondary dark:text-white">{data.category?.name}</span></div>
        <div className="flex justify-between py-2"><span className="text-gray-500 dark:text-gray-400">Country</span><span className="font-medium text-secondary dark:text-white">{data.country?.flag} {data.country?.name}</span></div>
        <div className="flex justify-between py-2"><span className="text-gray-500 dark:text-gray-400">Processing fee</span><span className="font-medium text-green-600">Free</span></div>
        <div className="flex justify-between py-2"><span className="text-gray-500 dark:text-gray-400">Exchange rate</span><span className="font-medium text-secondary dark:text-white">1 GBP = {data.country?.rate.toLocaleString()} {data.country?.currency}</span></div>
      </div>

      <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
        <Shield className="w-6 h-6 text-green-600" />
        <div className="text-sm text-green-700 dark:text-green-400">Secured payment with 256-bit encryption.</div>
      </div>
    </div>
  );

  // Step 5: Complete
  const renderCompleteStep = () => (
    <div className="text-center py-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
        <Check className="w-12 h-12 text-white" />
      </motion.div>
      <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">Payment Successful!</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Your payment of £{data.amount} to {data.biller?.name || data.savedBill?.biller} has been processed.</p>
      <div className="bg-gray-50 dark:bg-secondary/30 rounded-2xl p-6 max-w-sm mx-auto mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Reference Number</div>
        <div className="text-xl font-mono font-bold text-secondary dark:text-white">MH{Date.now().toString().slice(-8)}</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/dashboard"><Button className="bg-primary hover:bg-primary/90 text-secondary px-8">Go to Dashboard</Button></Link>
        <Button variant="outline" onClick={() => { setCurrentStep(1); setData({ ...data, amount: '', localAmount: '', category: null, biller: null, accountNumber: '' }); }}>Pay Another Bill</Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderCategoryStep();
      case 2: return renderBillerStep();
      case 3: return renderDetailsStep();
      case 4: return renderReviewStep();
      case 5: return renderCompleteStep();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.category;
      case 2: return data.biller;
      case 3: return data.accountNumber && data.amount && parseFloat(data.amount) > 0;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <main className="min-h-screen bg-foundation-light dark:bg-foundation-dark">
      <Header />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <img src="/favicon.svg.svg" alt="MoneyHive" className="h-8 w-auto" />
            <span className="text-xl font-bold text-secondary dark:text-white font-jakarta">Pay Bills</span>
          </div>

          {currentStep < 5 && (
            <div className="flex items-center justify-center mb-8">
              {steps.slice(0, 4).map((step, i) => (
                <React.Fragment key={step.number}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${currentStep >= step.number ? 'bg-primary text-secondary' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                    {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                  </div>
                  {i < 3 && <div className={`w-12 h-1 mx-1 rounded transition-all ${currentStep > step.number ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="bg-white dark:bg-secondary/40 rounded-3xl shadow-xl p-6 sm:p-8 mb-6">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {currentStep < 5 && currentStep !== 1 && (
            <div className="flex gap-4">
              {currentStep > 1 && <Button variant="outline" onClick={prevStep} className="flex-1 py-6"><ArrowLeft className="w-5 h-5 mr-2" />Back</Button>}
              <Button onClick={currentStep === 4 ? handleSubmit : nextStep} disabled={!canProceed() || isProcessing} className="flex-1 bg-primary hover:bg-primary/90 text-secondary py-6">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : currentStep === 4 ? <>Confirm & Pay<ArrowRight className="w-5 h-5 ml-2" /></> : <>Continue<ArrowRight className="w-5 h-5 ml-2" /></>}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
