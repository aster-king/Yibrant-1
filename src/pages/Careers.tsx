import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Clock, Rocket, Users, Code } from "lucide-react";

const perks = [
  { icon: Clock, text: "no timesheets" },
  { icon: Rocket, text: "ship to production on day 1" },
  { icon: Users, text: "discord > slack" },
  { icon: Code, text: "work on cutting-edge ai" },
];

const roles = [
  {
    title: "ai creative engineer",
    description: "build the generative art pipeline",
    type: "full-time",
  },
  {
    title: "chaos coordinator",
    description: "keep the pirates organized (good luck)",
    type: "full-time",
  },
  {
    title: "meme scientist",
    description: "yes, this is a real job",
    type: "contract",
  },
  {
    title: "growth hacker",
    description: "make numbers go up",
    type: "full-time",
  },
];

const Careers = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <div className="tech-label text-yibrant-coral mb-4">
            THE_LAB
          </div>
          <h1 className="text-7xl font-black mb-6 leading-tight">
            quit your boring <span className="gradient-text">job</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            we're looking for pirates, hackers, and artists. corporate refugees welcome.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg glow-coral"
          >
            show us your work
          </motion.button>
        </motion.div>

        {/* Perks Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-black mb-8 text-center">
            the perks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-yibrant-yellow" />
                    <p className="text-lg font-bold lowercase">{perk.text}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-black mb-8 text-center">
            open positions
          </h2>
          
          <div className="space-y-4">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="flex items-center justify-between hover:glow-coral transition-all">
                  <div>
                    <h3 className="text-2xl font-bold lowercase mb-1">
                      {role.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="tech-label text-yibrant-teal">
                      {role.type}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold"
                    >
                      apply
                    </motion.button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="max-w-3xl mx-auto text-center p-12">
            <h3 className="text-4xl font-black mb-4">
              what it's really like
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              we move fast. we break things. we fix them faster. 
              no meetings about meetings. no corporate buzzwords. 
              just shipping cool stuff with cool people.
            </p>
            <div className="tech-label text-yibrant-yellow">
              CULTURE_FIT &gt; RESUME
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
};

export default Careers;