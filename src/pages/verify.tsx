import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, Camera, Loader2, Check, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuthStore } from '@/store/auth';
import { submitDocuments, submitSelfie, checkVerification } from '@/services/kyc';

type Step = 'intro' | 'document' | 'selfie' | 'processing' | 'success';
type DocType = 'passport' | 'driving_license' | 'national_id';

export default function VerifyPage() {
  const navigate = useNavigate();
  const { user, setKYCStatus } = useAuthStore();
  
  const [step, setStep] = useState<Step>('intro');
  const [docType, setDocType] = useState<DocType>('passport');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const docTypes: { id: DocType; name: string; description: string }[] = [
    { id: 'passport', name: 'Passport', description: 'Photo page of your passport' },
    { id: 'driving_license', name: 'Driving License', description: 'Front and back of your license' },
    { id: 'national_id', name: 'National ID', description: 'Front and back of your ID card' },
  ];

  const handleDocumentUpload = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Mock file upload - in production, this would use actual file inputs
      const mockFile = new File([''], 'document.jpg', { type: 'image/jpeg' });
      
      const result = await submitDocuments(user?.id ?? 'mock-user', {
        type: docType,
        frontImage: mockFile,
      });

      if (result.success) {
        setStep('selfie');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelfieUpload = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const mockFile = new File([''], 'selfie.jpg', { type: 'image/jpeg' });
      
      const result = await submitSelfie(user?.id ?? 'mock-user', mockFile);

      if (result.success) {
        setStep('processing');
        
        // Simulate verification check
        setTimeout(async () => {
          const profile = await checkVerification(user?.id ?? 'mock-user');
          if (profile.status === 'verified') {
            setKYCStatus('verified');
            setStep('success');
          }
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload selfie');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-foundation-light dark:bg-foundation-dark">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Intro Step */}
          {step === 'intro' && (
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-secondary dark:text-white mb-4">
                Verify your identity
              </h1>
              <p className="text-supporting dark:text-gray-400 mb-8 max-w-md mx-auto">
                To comply with financial regulations and protect your account, we need to verify your identity. This usually takes less than 5 minutes.
              </p>

              <div className="bg-white dark:bg-secondary/50 rounded-2xl shadow-card p-6 mb-8 text-left">
                <h2 className="font-semibold text-secondary dark:text-white mb-4">
                  What you'll need:
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-supporting dark:text-gray-300">
                      A valid government-issued ID (passport, driving license, or national ID)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-supporting dark:text-gray-300">
                      A device with a camera for a selfie
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-supporting dark:text-gray-300">
                      Good lighting for clear photos
                    </span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setStep('document')}
                className="bg-primary text-secondary hover:bg-primary/90 px-8 py-3"
              >
                Start Verification
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Document Step */}
          {step === 'document' && (
            <div>
              <button
                onClick={() => setStep('intro')}
                className="flex items-center gap-2 text-supporting hover:text-secondary dark:hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                Select your document type
              </h1>
              <p className="text-supporting dark:text-gray-400 mb-6">
                Choose the type of ID you want to use for verification.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg p-3 mb-4 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-3 mb-8">
                {docTypes.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setDocType(doc.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      docType === doc.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-secondary dark:text-white">
                      {doc.name}
                    </div>
                    <div className="text-sm text-supporting dark:text-gray-400">
                      {doc.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-white dark:bg-secondary/50 rounded-2xl shadow-card p-6 mb-8">
                <div className="flex items-center justify-center gap-4 py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <Upload className="w-8 h-8 text-supporting" />
                  <div className="text-center">
                    <p className="font-medium text-secondary dark:text-white">
                      Upload your {docTypes.find((d) => d.id === docType)?.name}
                    </p>
                    <p className="text-sm text-supporting">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDocumentUpload}
                disabled={isSubmitting}
                className="w-full bg-primary text-secondary hover:bg-primary/90 py-3"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Selfie Step */}
          {step === 'selfie' && (
            <div>
              <button
                onClick={() => setStep('document')}
                className="flex items-center gap-2 text-supporting hover:text-secondary dark:hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                Take a selfie
              </h1>
              <p className="text-supporting dark:text-gray-400 mb-6">
                We'll compare this with your ID photo to verify it's really you.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg p-3 mb-4 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="bg-white dark:bg-secondary/50 rounded-2xl shadow-card p-6 mb-8">
                <div className="aspect-square max-w-sm mx-auto flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-secondary/30">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-supporting mx-auto mb-4" />
                    <p className="font-medium text-secondary dark:text-white">
                      Position your face in the frame
                    </p>
                    <p className="text-sm text-supporting mt-1">
                      Make sure there's good lighting
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSelfieUpload}
                disabled={isSubmitting}
                className="w-full bg-primary text-secondary hover:bg-primary/90 py-3"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Camera className="w-5 h-5 mr-2" />
                    Take Selfie
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                Verifying your identity
              </h1>
              <p className="text-supporting dark:text-gray-400">
                This usually takes just a few seconds...
              </p>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                Verification complete!
              </h1>
              <p className="text-supporting dark:text-gray-400 mb-8">
                Your identity has been verified. You can now send money without limits.
              </p>
              <Button
                onClick={() => navigate('/send-money')}
                className="bg-primary text-secondary hover:bg-primary/90 px-8 py-3"
              >
                Send Money Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
