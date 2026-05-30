import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageProgress = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(0);

    // Simulate progress: jump to 80% fast, then wait, then complete
    const t1 = setTimeout(() => setProgress(30), 50);
    const t2 = setTimeout(() => setProgress(60), 150);
    const t3 = setTimeout(() => setProgress(80), 300);
    const t4 = setTimeout(() => setProgress(100), 600);
    const t5 = setTimeout(() => setVisible(false), 900);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] h-[2px] pointer-events-none"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #64ffda, #00bcd4)',
            boxShadow: '0 0 8px rgba(100,255,218,0.8)',
            transition: 'width 0.2s ease',
          }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        />
      )}
    </AnimatePresence>
  );
};

export default PageProgress;
