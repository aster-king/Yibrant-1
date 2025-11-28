import { motion } from "framer-motion";

const tickerItems = [
  "NO BS",
  "JUST SHIPPING",
  "AI NATIVE",
  "GENERATIVE ART",
  "ZERO TIMESHEETS",
  "SHIP DAY 1",
  "DISCORD > SLACK",
];

export const Ticker = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border overflow-hidden z-50">
      <motion.div
        className="flex gap-8 py-3 whitespace-nowrap"
        animate={{
          x: [0, -50 + "%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="tech-label text-muted-foreground text-sm inline-block"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};