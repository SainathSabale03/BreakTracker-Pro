import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function BreakTimer({ breakData }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!breakData?.startTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(breakData.startTime);
      setElapsed(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [breakData]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div className="text-6xl font-bold text-blue-600 font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className="text-gray-600 mt-2 capitalize">{breakData?.breakType} Break</p>
    </motion.div>
  );
}

export default BreakTimer;
