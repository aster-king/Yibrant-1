import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { DollarSign, Lightbulb, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState<"money" | "idea" | null>(null);

  // Use environment variable for Form ID, fallback to hardcoded ID if env not loaded yet
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || "xzzllqzv";
  const [state, handleSubmit] = useForm(formId);

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      // Optional: Reset selection or form state if needed
      // setSelectedOption(null); 
    }
    if (state.errors) {
      toast.error("Something went wrong.", {
        description: "Please try again or email us directly.",
      });
    }
  }, [state.succeeded, state.errors]);

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

              {/* Hidden input to categorize submission */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="inquiry_type" value={selectedOption || ''} />

                <div>
                  <label className="tech-label block mb-2" htmlFor="name">
                    your_name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john doe"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="tech-label block mb-2" htmlFor="email">
                    email_address
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="tech-label block mb-2" htmlFor="message">
                    {selectedOption === "money" ? "project_brief" : "your_idea"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder={selectedOption === "money"
                      ? "tell us what you're building..."
                      : "describe your wild idea..."}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={state.submitting}
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg glow-pink flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? (
                    "sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      send it
                    </>
                  )}
                </motion.button>
                {!formId && (
                  <p className="text-xs text-center text-red-400 mt-4">
                    * Form ID not configured. Please set VITE_FORMSPREE_FORM_ID.
                  </p>
                )}
              </form>
            </GlassCard>

            {/* Alternative Contact Methods */}
            <div className="mt-8 text-center">
              <p className="tech-label text-muted-foreground mb-4">
                OR_SLIDE_INTO_OUR_DMS
              </p>
              <div className="flex justify-center gap-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  twitter
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  discord
                </a>
                <a href="mailto:hello@yibrant.com" className="text-primary hover:underline">
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