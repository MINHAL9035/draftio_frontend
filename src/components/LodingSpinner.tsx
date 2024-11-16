import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Main spinner container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer rotating circle */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border-4 border-blue-200"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          {/* Middle pulsing circle */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border-4 border-blue-300"
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner spinning circle */}
          <motion.div
            className="absolute w-16 h-16 rounded-full border-4 border-blue-400"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Centered book icon with 3D rotation */}
          <motion.div
            className="relative z-10 bg-white rounded-full p-2"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="w-12 h-12 text-blue-500" />
          </motion.div>
        </div>

        {/* Loading text with fade effect */}
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-xl font-semibold text-gray-700"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ...
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              animate={{
                x: [-192, 192],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
