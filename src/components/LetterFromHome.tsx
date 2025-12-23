import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Mail, X, Heart } from 'lucide-react';

interface LetterFromHomeProps {
  position?: 'left' | 'right' | 'center';
}

export function LetterFromHome({ position = 'right' }: LetterFromHomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const letters = [
    {
      from: "Mama",
      location: "Lagos, Nigeria",
      content: "My dearest child, I received the money you sent last week. It came right on time - I was able to pay for your brother's school fees and buy medicine for grandma. The way you take care of us from so far away fills my heart with pride. May God continue to bless the work of your hands. We miss you terribly but know you are doing what's best. I made your favorite soup yesterday and wished you were here to enjoy it. Call when you can. Love always, Mama.",
      date: "March 15, 2025"
    },
    {
      from: "Kofi",
      location: "Accra, Ghana",
      content: "Big brother, the money you sent helped us fix the roof before the rainy season! Everyone in the village is talking about how well you're doing abroad. I'm working hard in school like you told me to. My math teacher says I might get a scholarship next year! Can't wait to make you proud too. The family is well. Dad asks about you every day. When will you visit? We're keeping your room just as you left it. Thank you for never forgetting us.",
      date: "February 28, 2025"
    },
    {
      from: "Auntie Ama",
      location: "Kumasi, Ghana",
      content: "My dear one, your support has been a blessing beyond words. The business is growing! I've hired two more women from the community, and we're now selling our textiles to shops in the city. Your investment in us is changing not just my life, but the whole community. The children are healthy and doing well in school. Your cousin Kwame asks about you constantly. We pray for your health and happiness every day. When you come home, we will celebrate properly!",
      date: "March 10, 2025"
    }
  ];

  const randomLetter = letters[Math.floor(Math.random() * letters.length)];

  useEffect(() => {
    if (isOpen && letterRef.current && envelopeRef.current) {
      // Animate the letter coming out of the envelope
      gsap.fromTo(
        letterRef.current,
        { 
          y: 0, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: -20, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const positionClasses = {
    left: "left-10",
    right: "right-10",
    center: "left-1/2 transform -translate-x-1/2"
  };

  return (
    <div className={`fixed bottom-10 ${positionClasses[position]} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={letterRef}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.8 }}
            className="bg-coconut-milk dark:bg-midnight-ash p-6 rounded-lg shadow-xl mb-4 max-w-md"
          >
            <button 
              onClick={handleToggle}
              className="absolute top-3 right-3 text-midnight-ash/60 dark:text-coconut-milk/60 hover:text-hive-gold dark:hover:text-hive-gold"
            >
              <X size={18} />
            </button>
            
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-midnight-ash dark:text-coconut-milk">{randomLetter.from}</h3>
                <p className="text-sm text-midnight-ash/70 dark:text-coconut-milk/70">{randomLetter.location}</p>
              </div>
              <p className="text-xs text-midnight-ash/60 dark:text-coconut-milk/60">{randomLetter.date}</p>
            </div>
            
            <div className="border-l-4 border-hive-gold pl-4 mb-4">
              <p className="text-midnight-ash/80 dark:text-coconut-milk/80 italic">
                {randomLetter.content}
              </p>
            </div>
            
            <div className="flex justify-end">
              <button className="flex items-center text-hive-gold hover:text-diaspora-blue transition-colors">
                <Heart size={16} className="mr-1" />
                <span className="text-sm">Send Love Back</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={envelopeRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-hive-gold hover:bg-hive-gold/90 text-midnight-ash p-3 rounded-full shadow-lg cursor-pointer flex items-center justify-center ${isOpen ? 'animate-pulse' : ''}`}
        onClick={handleToggle}
      >
        <Mail size={24} />
      </motion.div>
    </div>
  );
}