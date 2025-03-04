import { motion } from "framer-motion";
import { ImageGenerator } from "@/components/image-generator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background p-4 md:p-8 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse delay-1000" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--border)_1px,_transparent_1px),_linear-gradient(to_bottom,_var(--border)_1px,_transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,_transparent_20%,_black_80%)] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-8 relative"
      >
        <header className="text-center space-y-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AI Image Generator
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Turn your ideas into reality
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-8 shadow-2xl relative z-10"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <ImageGenerator />
        </motion.div>
      </motion.div>
    </div>
  );
}