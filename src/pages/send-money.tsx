import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  User, 
  Building2, 
  Phone,
  Wallet,
  CreditCard,
  Loader2,
  ChevronDown,
  Search,
  Star,
  Shield,
  Clock,
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

// Mock saved recipients
const savedRecipients = [
  { id: '1', name: 'Mama Adunni', bank: 'First Bank', country: 'NG', isFavorite: true },
  { id: '2', name: 'Brother Kemi', bank: 'GTBank', country: 'NG', isFavorite: true },
  { id: '3', name: 'Uncle Kofi', bank: 'GCB Bank', country: 'GH', isFavorite: false },
];

// Delivery methods
const deliveryMethods = [
  { id: 'bank', name: 'Bank Transfer', icon: Building2, description: 'Direct to bank account', time: '5-30 mins' },
  { id: 'mobile', name: 'Mobile Money', icon: Phone, description: 'M-Pesa, MTN Mobile Money', time: '1-5 mins' },
  { id: 'cash', name: 'Cash Pickup', icon: Wallet, description: 'Collect at agent location', time: '10-60 mins' },
];

type Step = 1 | 2 | 3 | 4 | 5;

interface TransferData {
  sendAmount: string;
  receiveAmount: string;
  country: typeof countries[0] | null;
  recipient: typeof savedRecipients[0] | null;
  newRecipient: { name: string; accountNumber: string; bankName: string; };
  isNewRecipient: boolean;
  deliveryMethod: string;
  paymentMethod: string;
}

export default function SendMoneyPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [data, setData] = useState<TransferData>({
    sendAmount: '',
    receiveAmount: '',
    country: countries[0],
    recipient: null,
    newRecipient: { name: '', accountNumber: '', bankName: '' },
    isNewRecipient: false,
    deliveryMethod: 'bank',
    paymentMethod: 'card',
  });

  const steps = [
    { number: 1, title: 'Amount' },
    { number: 2, title: 'Recipient' },
    { number: 3, title: 'Delivery' },
    { number: 4, title: 'Review' },
    { number: 5, title: 'Complete' },
  ];

  const calculateReceiveAmount = (sendAmount: string) => {
    if (!sendAmount || !data.country) return '';
    const amount = parseFloat(sendAmount);
    if (isNaN(amount)) return '';
    return (amount * data.country.rate).toFixed(2);
  };

  const handleAmountChange = (value: string) => {
    setData({ ...data, sendAmount: value, receiveAmount: calculateReceiveAmount(value) });
  };

  const handleCountryChange = (country: typeof countries[0]) => {
    setData({
      ...data,
      country,
      receiveAmount: data.sendAmount ? (parseFloat(data.sendAmount) * country.rate).toFixed(2) : '',
    });
  };

  const nextStep = () => currentStep < 5 && setCurrentStep((currentStep + 1) as Step);
  const prevStep = () => currentStep > 1 && setCurrentStep((currentStep - 1) as Step);

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCurrentStep(5);
  };

  // Step 1: Amount
  const renderAmountStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary dark:text-white mb-2">How much would you like to send?</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Enter the amount and select destination country</p>
      </div>

      <div className="bg-gray-50 dark:bg-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 block">You send</label>
        <div className="flex items-center gap-2 sm:gap-4">
          <input
            type="number"
            value={data.sendAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="flex-1 text-2xl sm:text-4xl font-bold bg-transparent border-none focus:outline-none text-secondary dark:text-white min-w-0"
          />
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-secondary/50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl flex-shrink-0">
            <span className="text-lg sm:text-2xl">🇬🇧</span>
            <span className="text-sm sm:text-base font-semibold text-secondary dark:text-white">GBP</span>
          </div>
        </div>
      </div>

      {data.country && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>1 GBP = {data.country.rate.toLocaleString()} {data.country.currency}</span>
          <Info className="w-4 h-4" />
        </div>
      )}

      <div className="bg-primary/10 dark:bg-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 block">They receive</label>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex-1 text-2xl sm:text-4xl font-bold text-secondary dark:text-white break-words min-w-0">
            {data.receiveAmount ? parseFloat(data.receiveAmount).toLocaleString() : '0.00'}
          </div>
          <div className="relative flex-shrink-0">
            <select
              value={data.country?.code || 'NG'}
              onChange={(e) => {
                const country = countries.find(c => c.code === e.target.value);
                if (country) handleCountryChange(country);
              }}
              className="appearance-none bg-white dark:bg-secondary/50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl pr-8 sm:pr-10 text-sm sm:text-base font-semibold text-secondary dark:text-white cursor-pointer"
            >
              {countries.map(c => (<option key={c.code} value={c.code}>{c.flag} {c.currency}</option>))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary/20 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-500 dark:text-gray-400">Transfer fee</span>
          <span className="font-semibold text-green-600">£0.00 (Free!)</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-500 dark:text-gray-400">Delivery time</span>
          <span className="font-semibold text-secondary dark:text-white flex items-center gap-1"><Clock className="w-3 h-3 sm:w-4 sm:h-4" /> 5-30 mins</span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base font-medium text-secondary dark:text-white">Total to pay</span>
          <span className="font-bold text-base sm:text-lg text-secondary dark:text-white">£{data.sendAmount || '0.00'}</span>
        </div>
      </div>
    </div>
  );

  // Step 2: Recipient
  const renderRecipientStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary dark:text-white mb-2">Who are you sending to?</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Select a saved recipient or add a new one</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input type="text" placeholder="Search recipients..." className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Saved Recipients</h3>
        {savedRecipients.map(recipient => (
          <button
            key={recipient.id}
            onClick={() => setData({ ...data, recipient, isNewRecipient: false })}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${data.recipient?.id === recipient.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"><User className="w-6 h-6 text-primary" /></div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-secondary dark:text-white">{recipient.name}</span>
                {recipient.isFavorite && <Star className="w-4 h-4 text-primary fill-primary" />}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{recipient.bank}</span>
            </div>
            <span className="text-2xl">{countries.find(c => c.code === recipient.country)?.flag}</span>
            {data.recipient?.id === recipient.id && <Check className="w-5 h-5 text-primary" />}
          </button>
        ))}
      </div>

      <button
        onClick={() => setData({ ...data, isNewRecipient: true, recipient: null })}
        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed transition-all ${data.isNewRecipient ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-600 hover:border-primary'}`}
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><User className="w-6 h-6 text-gray-400" /></div>
        <span className="font-medium text-secondary dark:text-white">Add new recipient</span>
      </button>

      {data.isNewRecipient && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-4">
          <input type="text" placeholder="Full name" value={data.newRecipient.name} onChange={(e) => setData({ ...data, newRecipient: { ...data.newRecipient, name: e.target.value }})} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          <input type="text" placeholder="Bank name" value={data.newRecipient.bankName} onChange={(e) => setData({ ...data, newRecipient: { ...data.newRecipient, bankName: e.target.value }})} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          <input type="text" placeholder="Account number" value={data.newRecipient.accountNumber} onChange={(e) => setData({ ...data, newRecipient: { ...data.newRecipient, accountNumber: e.target.value }})} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-secondary/30 text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        </motion.div>
      )}
    </div>
  );

  // Step 3: Delivery Method
  const renderDeliveryStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary dark:text-white mb-2">How should they receive it?</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Choose the delivery method for your transfer</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {deliveryMethods.map(method => (
          <button
            key={method.id}
            onClick={() => setData({ ...data, deliveryMethod: method.id })}
            className={`w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 transition-all ${data.deliveryMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${data.deliveryMethod === method.id ? 'bg-primary text-secondary' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
              <method.icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-semibold text-sm sm:text-base text-secondary dark:text-white truncate">{method.name}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{method.description}</div>
            </div>
            <div className="text-right flex-shrink-0"><div className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">{method.time}</div></div>
            {data.deliveryMethod === method.id && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />}
          </button>
        ))}
      </div>

      <div className="pt-4 sm:pt-6">
        <h3 className="text-base sm:text-lg font-semibold text-secondary dark:text-white mb-3 sm:mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button onClick={() => setData({ ...data, paymentMethod: 'card' })} className={`p-4 rounded-xl border-2 transition-all ${data.paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
            <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-primary" />
            <div className="font-medium text-sm sm:text-base text-secondary dark:text-white">Card</div>
          </button>
          <button onClick={() => setData({ ...data, paymentMethod: 'bank' })} className={`p-4 rounded-xl border-2 transition-all ${data.paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-primary" />
            <div className="font-medium text-sm sm:text-base text-secondary dark:text-white">Bank Transfer</div>
          </button>
        </div>
      </div>
    </div>
  );

  // Step 4: Review
  const renderReviewStep = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary dark:text-white mb-2">Review your transfer</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Please confirm the details before sending</p>
      </div>

      <div className="bg-gray-50 dark:bg-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">You send</span>
          <span className="text-xl sm:text-2xl font-bold text-secondary dark:text-white">£{data.sendAmount}</span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">They receive</span>
          <span className="text-xl sm:text-2xl font-bold text-primary break-words text-right">{data.country?.currency} {parseFloat(data.receiveAmount).toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-secondary/20 rounded-xl p-3 sm:p-4">
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Recipient</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm sm:text-base text-secondary dark:text-white truncate">{data.recipient?.name || data.newRecipient.name}</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{data.recipient?.bank || data.newRecipient.bankName}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between py-2"><span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Delivery method</span><span className="font-medium text-xs sm:text-sm text-secondary dark:text-white text-right">{deliveryMethods.find(m => m.id === data.deliveryMethod)?.name}</span></div>
        <div className="flex justify-between py-2"><span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Delivery time</span><span className="font-medium text-xs sm:text-sm text-secondary dark:text-white">{deliveryMethods.find(m => m.id === data.deliveryMethod)?.time}</span></div>
        <div className="flex justify-between py-2"><span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Transfer fee</span><span className="font-medium text-xs sm:text-sm text-green-600">Free</span></div>
        <div className="flex justify-between py-2"><span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Exchange rate</span><span className="font-medium text-xs sm:text-sm text-secondary dark:text-white text-right break-words">1 GBP = {data.country?.rate.toLocaleString()} {data.country?.currency}</span></div>
      </div>

      <div className="flex items-start gap-2 sm:gap-3 bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-xl">
        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-green-700 dark:text-green-400">Secured with 256-bit encryption. Your money is protected.</div>
      </div>
    </div>
  );

  // Step 5: Complete
  const renderCompleteStep = () => (
    <div className="text-center py-6 sm:py-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
        <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-white mb-3 sm:mb-4 px-4">Transfer Sent!</h2>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4">Your transfer of £{data.sendAmount} to {data.recipient?.name || data.newRecipient.name} is on its way.</p>
      <div className="bg-gray-50 dark:bg-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-sm mx-auto mb-6 sm:mb-8">
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">Reference Number</div>
        <div className="text-lg sm:text-xl font-mono font-bold text-secondary dark:text-white break-all">MH{Date.now().toString().slice(-8)}</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
        <Link to="/dashboard" className="w-full sm:w-auto"><Button className="bg-primary hover:bg-primary/90 text-secondary px-6 sm:px-8 w-full sm:w-auto">Go to Dashboard</Button></Link>
        <Button variant="outline" onClick={() => { setCurrentStep(1); setData({ ...data, sendAmount: '', receiveAmount: '', recipient: null, isNewRecipient: false }); }} className="w-full sm:w-auto">Send Another</Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderAmountStep();
      case 2: return renderRecipientStep();
      case 3: return renderDeliveryStep();
      case 4: return renderReviewStep();
      case 5: return renderCompleteStep();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.sendAmount && parseFloat(data.sendAmount) > 0;
      case 2: return data.recipient || (data.isNewRecipient && data.newRecipient.name && data.newRecipient.accountNumber);
      case 3: return data.deliveryMethod;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <main className="min-h-screen bg-foundation-light dark:bg-foundation-dark overflow-x-hidden">
      <Header />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <img src="/favicon.svg.svg" alt="MoneyHive" className="h-6 w-auto sm:h-8" />
            <span className="text-lg sm:text-xl font-bold text-secondary dark:text-white font-jakarta">Send Money</span>
          </div>

          {currentStep < 5 && (
            <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex items-center min-w-max px-4">
              {steps.slice(0, 4).map((step, i) => (
                <React.Fragment key={step.number}>
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-base font-semibold transition-all ${currentStep >= step.number ? 'bg-primary text-secondary' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                    {currentStep > step.number ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : step.number}
                  </div>
                  {i < 3 && <div className={`w-8 sm:w-12 h-1 mx-0.5 sm:mx-1 rounded transition-all ${currentStep > step.number ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                </React.Fragment>
              ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-secondary/40 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {currentStep < 5 && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {currentStep > 1 && <Button variant="outline" onClick={prevStep} className="flex-1 py-4 sm:py-6 text-sm sm:text-base"><ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />Back</Button>}
              <Button onClick={currentStep === 4 ? handleSubmit : nextStep} disabled={!canProceed() || isProcessing} className="flex-1 bg-primary hover:bg-primary/90 text-secondary py-4 sm:py-6 text-sm sm:text-base">
                {isProcessing ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : currentStep === 4 ? <><span className="hidden sm:inline">Confirm & Send</span><span className="sm:hidden">Confirm</span><ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" /></> : <>Continue<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" /></>}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
