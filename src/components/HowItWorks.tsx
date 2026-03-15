import { motion } from "framer-motion";
import { Link, Zap, Download } from "lucide-react";

const steps = [
  { icon: Link, title: "Paste Link", desc: "Copy the TikTok video URL and paste it in the input field." },
  { icon: Zap, title: "Process", desc: "We fetch the video without watermark from TikTok's servers." },
  { icon: Download, title: "Download", desc: "Get your HD video instantly — no sign up required." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 px-4">
    <div className="container mx-auto max-w-4xl">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-3xl font-bold text-center mb-12"
      >
        How It <span className="neon-text">Works</span>
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
