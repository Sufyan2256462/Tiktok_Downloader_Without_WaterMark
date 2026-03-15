import { motion } from "framer-motion";

const Loader = () => (
  <div className="py-16 flex flex-col items-center gap-4">
    <motion.div
      className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <p className="text-muted-foreground text-sm animate-pulse">Processing video...</p>
  </div>
);

export default Loader;
