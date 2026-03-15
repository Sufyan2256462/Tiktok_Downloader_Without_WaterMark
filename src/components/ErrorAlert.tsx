import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ErrorAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 pb-8"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 backdrop-blur-sm p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorAlert;
