import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Sparkles, Zap, TrendingUp, Rocket } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "eye candy",
    subtitle: "generative visuals",
    description: "scroll-stopping visuals generated in milliseconds.",
    color: "yellow",
    size: "large",
  },
  {
    icon: Zap,
    title: "words that sell",
    subtitle: "llm copywriting",
    description: "copy that converts better than dave (sorry, dave).",
    color: "coral",
    size: "medium",
  },
  {
    icon: TrendingUp,
    title: "the viral button",
    subtitle: "growth hacking",
    description: "math, not magic. we predict trends before they happen.",
    color: "teal",
    size: "medium",
  },
  {
    icon: Rocket,
    title: "full stack chaos",
    subtitle: "end-to-end campaigns",
    description: "from concept to conversion in record time.",
    color: "coral",
    size: "large",
  },
];

const Services = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="tech-label text-yibrant-yellow mb-4">
            SELECT_YOUR_WEAPON
          </div>
          <h1 className="text-7xl font-black mb-4">
            what we <span className="gradient-text">ship</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            video game inventory style. pick your power-up.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {services.map((service, i) => {
            const Icon = service.icon;
            const gridClass = service.size === "large" 
              ? "md:col-span-2" 
              : "md:col-span-1";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={gridClass}
              >
                <GlassCard className="h-full flex flex-col justify-between relative overflow-hidden group">
                  <div>
                    <div className={`inline-flex p-3 rounded-xl bg-yibrant-${service.color}/10 mb-4`}>
                      <Icon className={`w-8 h-8 text-yibrant-${service.color}`} />
                    </div>
                    
                    <h3 className="text-3xl font-black mb-2 lowercase">
                      {service.title}
                    </h3>
                    
                    <div className="tech-label text-yibrant-yellow mb-4">
                      {service.subtitle}
                    </div>
                    
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-yibrant-${service.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <GlassCard className="max-w-2xl mx-auto">
            <h3 className="text-4xl font-black mb-4">
              not sure what you need?
            </h3>
            <p className="text-muted-foreground mb-6">
              book a call. we'll figure it out together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold glow-coral"
            >
              let's talk
            </motion.button>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default Services;