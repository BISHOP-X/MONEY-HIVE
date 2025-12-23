import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CreditCard, Smartphone, Globe, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface PaymentEngineProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentEngine({ isOpen, onClose }: PaymentEngineProps) {
  const [activeTab, setActiveTab] = useState<'transfer' | 'bills'>('transfer');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Transfer data
    sendAmount: '',
    sendCurrency: 'GBP',
    receiveCurrency: 'NGN',
    recipient: '',
    // Bill payment data
    billType: '',
    accountNumber: '',
    amount: '',
    provider: ''
  });

  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');

  const handleKYCVerification = () => {
    setVerificationStatus('pending');
    // Simulate KYC process (max 2 minutes)
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  const billProviders = [
    { id: 'nepa', name: 'NEPA (Electricity)', type: 'utility' },
    { id: 'mtn', name: 'MTN Nigeria', type: 'telecom' },
    { id: 'airtel', name: 'Airtel Nigeria', type: 'telecom' },
    { id: 'dstv', name: 'DSTV', type: 'entertainment' },
    { id: 'gotv', name: 'GOTV', type: 'entertainment' }
  ];

  const transferSteps = [
    { id: 1, title: 'Amount & Recipient', icon: Send },
    { id: 2, title: 'Payment Method', icon: CreditCard },
    { id: 3, title: 'Verification', icon: Shield },
    { id: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const billSteps = [
    { id: 1, title: 'Select Bill Type', icon: Smartphone },
    { id: 2, title: 'Enter Details', icon: CreditCard },
    { id: 3, title: 'Payment', icon: Shield },
    { id: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const currentSteps = activeTab === 'transfer' ? transferSteps : billSteps;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta">
                  MoneyHive Payment Engine
                </h2>
                <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">
                  MVP - Core Functionality
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'transfer'
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-secondary/70 dark:text-foundation-light/70 hover:text-primary'
                }`}
                onClick={() => setActiveTab('transfer')}
              >
                <Send className="w-5 h-5 mx-auto mb-2" />
                Money Transfer
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'bills'
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-secondary/70 dark:text-foundation-light/70 hover:text-primary'
                }`}
                onClick={() => setActiveTab('bills')}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-2" />
                Bill Payment
              </button>
            </div>

            {/* Progress Steps */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {currentSteps.map((stepItem, index) => (
                  <div key={stepItem.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepItem.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-500'
                    }`}>
                      <stepItem.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-secondary dark:text-foundation-light">
                        {stepItem.title}
                      </div>
                    </div>
                    {index < currentSteps.length - 1 && (
                      <div className={`w-16 h-1 mx-4 ${
                        step > stepItem.id ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'transfer' && (
                <div className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Send Money - GBP to NGN
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">
                            Send Amount (GBP)
                          </label>
                          <input
                            type="number"
                            placeholder="100"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light font-jakarta"
                            value={formData.sendAmount}
                            onChange={(e) => setFormData({...formData, sendAmount: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">
                            Recipient Gets (NGN)
                          </label>
                          <div className="px-4 py-3 bg-gray-100 dark:bg-gray-600 rounded-lg text-secondary dark:text-foundation-light font-jakarta">
                            ₦{formData.sendAmount ? (parseFloat(formData.sendAmount) * 1850).toLocaleString() : '0'}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">
                          Recipient Details
                        </label>
                        <input
                          type="text"
                          placeholder="Recipient name and account details"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light font-jakarta"
                          value={formData.recipient}
                          onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                        />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-blue-800 dark:text-blue-300 font-medium font-jakarta">
                            Real-time FX Rate: 1 GBP = 1,850 NGN
                          </span>
                        </div>
                        <p className="text-blue-700 dark:text-blue-400 text-sm mt-1 font-jakarta">
                          Transparent fee: £2.99 • Total: £{formData.sendAmount ? (parseFloat(formData.sendAmount) + 2.99).toFixed(2) : '2.99'}
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Choose Payment Method
                      </h3>
                      <div className="grid gap-4">
                        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                          <div className="flex items-center">
                            <CreditCard className="w-6 h-6 text-primary mr-3" />
                            <div>
                              <div className="font-medium text-secondary dark:text-foundation-light font-jakarta">Debit/Credit Card</div>
                              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Instant processing</div>
                            </div>
                          </div>
                        </div>
                        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                          <div className="flex items-center">
                            <Globe className="w-6 h-6 text-primary mr-3" />
                            <div>
                              <div className="font-medium text-secondary dark:text-foundation-light font-jakarta">Bank Transfer</div>
                              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Lower fees</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        KYC Verification
                      </h3>
                      <div className="text-center">
                        {verificationStatus === 'pending' && (
                          <div>
                            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Clock className="w-8 h-8 text-yellow-600" />
                            </div>
                            <p className="text-secondary dark:text-foundation-light font-jakarta mb-4">
                              Single-flow KYC process (max 5 minutes)
                            </p>
                            <Button onClick={handleKYCVerification} className="bg-primary hover:bg-primary/90 text-secondary font-jakarta">
                              Start Verification
                            </Button>
                          </div>
                        )}
                        {verificationStatus === 'verified' && (
                          <div>
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-green-600 font-medium font-jakarta">
                              Verification completed in 2 seconds!
                            </p>
                            <p className="text-secondary/70 dark:text-foundation-light/70 text-sm font-jakarta">
                              UK FCA & CBN compliant
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Transfer Successful!
                      </h3>
                      <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">
                        Your money has been sent and will arrive within 60 seconds.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-secondary dark:text-foundation-light font-jakarta">
                          Transaction ID: MH-{Date.now()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'bills' && (
                <div className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Nigerian Bill Payment
                      </h3>
                      <div className="grid gap-3">
                        {billProviders.map((provider) => (
                          <div
                            key={provider.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.provider === provider.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                            }`}
                            onClick={() => setFormData({...formData, provider: provider.id, billType: provider.type})}
                          >
                            <div className="font-medium text-secondary dark:text-foundation-light font-jakarta">
                              {provider.name}
                            </div>
                            <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta capitalize">
                              {provider.type}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Enter Bill Details
                      </h3>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">
                          Account/Meter Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter account or meter number"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light font-jakarta"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">
                          Amount (NGN)
                        </label>
                        <input
                          type="number"
                          placeholder="5000"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light font-jakarta"
                          value={formData.amount}
                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-blue-800 dark:text-blue-300 font-medium font-jakarta">
                          Real-time confirmation available
                        </p>
                        <p className="text-blue-700 dark:text-blue-400 text-sm font-jakarta">
                          Bill will be paid instantly upon confirmation
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Payment Confirmation
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Provider:</span>
                          <span className="text-secondary dark:text-foundation-light font-jakarta">
                            {billProviders.find(p => p.id === formData.provider)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Account:</span>
                          <span className="text-secondary dark:text-foundation-light font-jakarta">{formData.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Amount:</span>
                          <span className="text-secondary dark:text-foundation-light font-jakarta">₦{formData.amount}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta">
                        Bill Payment Successful!
                      </h3>
                      <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">
                        Your bill has been paid successfully. Confirmation sent to your family.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-secondary dark:text-foundation-light font-jakarta">
                          Reference: BP-{Date.now()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm font-jakarta">Bank-grade security</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm font-jakarta">24/7 support</span>
                </div>
              </div>
              <div className="flex space-x-3">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="font-jakarta"
                  >
                    Back
                  </Button>
                )}
                {step < 4 && (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="bg-primary hover:bg-primary/90 text-secondary font-jakarta"
                    disabled={
                      (step === 1 && (!formData.sendAmount || !formData.recipient)) ||
                      (step === 2 && activeTab === 'bills' && (!formData.provider || !formData.accountNumber || !formData.amount)) ||
                      (step === 3 && verificationStatus !== 'verified')
                    }
                  >
                    {step === 3 ? 'Confirm Payment' : 'Continue'}
                  </Button>
                )}
                {step === 4 && (
                  <Button
                    onClick={onClose}
                    className="bg-primary hover:bg-primary/90 text-secondary font-jakarta"
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}