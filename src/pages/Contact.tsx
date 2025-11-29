import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { DollarSign, Lightbulb, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState<"money" | "idea" | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="tech-label text-yibrant-pink mb-4">
            INITIALIZE_CONTACT
          </div>
          <h1 className="text-7xl font-black mb-4">
            start the <span className="gradient-text">reactor</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            pick your path. both lead to greatness.
          </p>
        </motion.div>

        {/* Option Selection */}
        {!selectedOption && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedOption("money")}
              className="cursor-pointer"
            >
              <GlassCard className="h-full flex flex-col items-center justify-center p-12 hover:glow-pink transition-all">
                <DollarSign className="w-20 h-20 text-yibrant-pink mb-6" />
                <h3 className="text-3xl font-black mb-4 lowercase">
                  i have money
                </h3>
                <p className="text-muted-foreground text-center">
                  ready to launch? let's talk project details and timelines.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setSelectedOption("idea")}
              className="cursor-pointer"
            >
              <GlassCard className="h-full flex flex-col items-center justify-center p-12 hover:glow-yellow transition-all">
                <Lightbulb className="w-20 h-20 text-yibrant-yellow mb-6" />
                <h3 className="text-3xl font-black mb-4 lowercase">
                  i have a wild idea
                </h3>
                <p className="text-muted-foreground text-center">
                  not sure if it's possible? let's brainstorm together.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        )}

        {/* Contact Form */}
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard className="p-8">
              <button
                onClick={() => setSelectedOption(null)}
                className="tech-label text-muted-foreground hover:text-foreground mb-6"
              >
                ← back
              </button>

              <h2 className="text-3xl font-black mb-6 lowercase">
                {selectedOption === "money" ? "project inquiry" : "brainstorm session"}
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="tech-label block mb-2">
                    your_name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john doe"
                  />
                </div>

                <div>
                  <label className="tech-label block mb-2">
                    email_address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="tech-label block mb-2">
                    {selectedOption === "money" ? "project_brief" : "your_idea"}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder={selectedOption === "money" 
                      ? "tell us what you're building..."
                      : "describe your wild idea..."}
                  />
                </div>

                {selectedOption === "money" && (
                  <div>
                    <label className="tech-label block mb-2">
                      budget_range
                    </label>
                    <select className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>$5k - $10k</option>
                      <option>$10k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k+</option>
                    </select>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg glow-pink flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  send it
                </motion.button>
              </form>
            </GlassCard>

            {/* Alternative Contact Methods */}
            <div className="mt-8 text-center">
              <p className="tech-label text-muted-foreground mb-4">
                OR_SLIDE_INTO_OUR_DMS
              </p>
              <div className="flex justify-center gap-6">
                <a href="#" className="text-primary hover:underline">
                  twitter
                </a>
                <a href="#" className="text-primary hover:underline">
                  discord
                </a>
                <a href="#" className="text-primary hover:underline">
                  email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Contact;