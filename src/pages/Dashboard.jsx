// src/pages/Dashboard.jsx

import { motion } from 'framer-motion';

function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-blue-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          به داشبورد کلینیک میلاد خوش آمدید
        </motion.h1>

        <motion.img
          src="/logo.png"
          alt="Clinic Logo"
          className="w-40 h-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
