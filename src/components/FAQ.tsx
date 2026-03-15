import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "Is this free to use?", a: "Yes, completely free. No sign up or payment required." },
  { q: "Is it safe?", a: "Absolutely. We don't store your data or videos. Everything is processed securely." },
  { q: "What video quality can I get?", a: "We provide HD quality downloads without any watermark." },
  { q: "Does it work with private videos?", a: "No, only publicly available TikTok videos can be downloaded." },
  { q: "Can I use this on mobile?", a: "Yes! The site is fully optimized for mobile devices." },
];

const FAQ = () => (
  <section id="faq" className="py-20 px-4">
    <div className="container mx-auto max-w-2xl">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-3xl font-bold text-center mb-12"
      >
        Frequently Asked <span className="neon-text">Questions</span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-2"
      >
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/30 px-4">
              <AccordionTrigger className="text-foreground text-left font-medium hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
