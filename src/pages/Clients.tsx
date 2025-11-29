import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";

const projects = [
  {
    prompt: "create a viral video for a fintech app targeting gen z",
    result: "15M views, 847% ROI in 3 weeks",
    time: "12 minutes",
    category: "video",
  },
  {
    prompt: "rebrand a boring SaaS company as the cool kid",
    result: "3x conversion rate, featured on Product Hunt #1",
    time: "2 days",
    category: "brand",
  },
  {
    prompt: "launch campaign for AI startup competing with giants",
    result: "10k signups in 48 hours, zero ad spend",
    time: "1 week",
    category: "growth",
  },
  {
    prompt: "make a meme that sells enterprise software",
    result: "viral on LinkedIn (yes, really). $2M in pipeline",
    time: "4 hours",
    category: "content",
  },
];

const clients = [
  "TechCorp", "GrowthLabs", "AI Ventures", "StartupX", "NeoBank", "CloudScale"
];

const Clients = () => {
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="tech-label text-yibrant-green mb-4">
            THE_RECEIPTS
          </div>
          <h1 className="text-7xl font-black mb-4">
            proof over <span className="gradient-text">promises</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            the prompt vs. the result
          </p>
        </motion.div>

        {/* Interactive Slider Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <GlassCard className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="tech-label text-yibrant-yellow mb-3">
                  THE PROMPT
                </div>
                <p className="text-lg mb-4">
                  "{projects[selectedProject].prompt}"
                </p>
                <div className="tech-label text-muted-foreground">
                  time taken: {projects[selectedProject].time}
                </div>
              </div>

              <div>
                <div className="tech-label text-yibrant-pink mb-3">
                  THE RESULT
                </div>
                <p className="text-lg font-bold">
                  {projects[selectedProject].result}
                </p>
              </div>
            </div>

            {/* Project Selector */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {projects.map((project, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedProject(i)}
                  className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    selectedProject === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {project.category}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Masonry Grid of Case Studies */}
        <div className="mb-16">
          <h2 className="text-4xl font-black mb-8 text-center">
            case studies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ 
                  gridRow: `span ${i % 3 === 0 ? 2 : 1}` 
                }}
              >
                <GlassCard className={`h-full ${i % 3 === 0 ? 'min-h-[400px]' : 'min-h-[200px]'}`}>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="tech-label text-yibrant-yellow mb-2">
                        CASE_{String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        project codename
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        revolutionary campaign that broke the internet
                      </p>
                    </div>
                    
                    <div className="tech-label text-yibrant-green mt-4">
                      +{Math.floor(Math.random() * 900 + 100)}% ROI
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="tech-label text-center mb-8">
            FRIENDS_OF_YIBRANT
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {clients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{ opacity: 1, scale: 1.1 }}
                className="text-2xl font-black uppercase"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Clients;