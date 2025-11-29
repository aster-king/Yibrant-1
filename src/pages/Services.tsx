import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Sparkles, Video, Users, Megaphone, TrendingUp, Palette } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "ai influencers",
    subtitle: "virtual brand ambassadors",
    description: "create and manage AI-powered influencers that engage your audience 24/7.",
    color: "yellow",
    size: "large",
  },
  {
    icon: Palette,
    title: "social media mastery",
    subtitle: "ai content creation",
    description: "endless engaging posts, stories, and content generated on-demand.",
    color: "green",
    size: "medium",
  },
  {
    icon: Video,
    title: "video magic",
    subtitle: "ai video editing",
    description: "professional video content created and edited using cutting-edge AI.",
    color: "pink",
    size: "medium",
  },
  {
    icon: Megaphone,
    title: "smart ads",
    subtitle: "ai-powered campaigns",
    description: "data-driven advertisements that adapt and optimize in real-time.",
    color: "yellow",
    size: "medium",
  },
  {
    icon: Sparkles,
    title: "generative visuals",
    subtitle: "ai art & design",
    description: "stunning visuals and graphics generated from your brand vision.",
    color: "pink",
    size: "medium",
  },
  {
    icon: TrendingUp,
    title: "growth intelligence",
    subtitle: "predictive analytics",
    description: "AI-powered insights that predict trends before they go viral.",
    color: "green",
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
            ai-powered <span className="gradient-text">marketing</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            generative AI solutions that transform your brand's growth.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {services.map((service, i) => {
            const Icon = service.icon;
            const gridClass = service.size === "large" 
              ? "lg:col-span-2" 
              : "lg:col-span-1";

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
              ready to accelerate?
            </h3>
            <p className="text-muted-foreground mb-6">
              let's discuss how AI can transform your marketing strategy.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold glow-pink"
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