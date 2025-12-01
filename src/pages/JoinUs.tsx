import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Clock, Rocket, Users, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { UnifiedForm } from "@/components/UnifiedForm";

const perks = [
    { icon: Clock, text: "no timesheets" },
    { icon: Rocket, text: "ship to production on day 1" },
    { icon: Users, text: "discord > slack" },
    { icon: Code, text: "work on cutting-edge ai" },
];

const roles = [
    {
        title: "video editor",
        description: "craft compelling visual stories",
        type: "full-time & remote",
    },
    {
        title: "ai designer",
        description: "blend creativity with algorithms",
        type: "full-time & remote",
    },
    {
        title: "graphic designer",
        description: "visualize the brand identity",
        type: "full-time & remote",
    },
    {
        title: "social media manager",
        description: "engage and grow our community",
        type: "full-time & remote",
    },
    {
        title: "sales executive",
        description: "drive growth and partnerships",
        type: "full-time & remote",
    },
    {
        title: "meme scientist",
        description: "yes, this is a real job",
        type: "full-time & remote",
    },
    {
        title: "growth hacker",
        description: "make numbers go up",
        type: "full-time & remote",
    },
];

import { ParticlesBackground } from "@/components/ParticlesBackground";

const JoinUs = () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const [generalAppOpen, setGeneralAppOpen] = useState(false);

    return (
        <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            <ParticlesBackground />
            <div className="container mx-auto px-6 relative z-10">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center max-w-3xl mx-auto"
                >
                    <div className="tech-label text-yibrant-pink mb-4">
                        THE_LAB
                    </div>
                    <h1 className="text-7xl font-black mb-6 leading-tight">
                        join the future of <span className="gradient-text">growth</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        work with passionate humans using cutting-edge AI to drive unprecedented results.
                    </p>

                    <Dialog open={generalAppOpen} onOpenChange={setGeneralAppOpen}>
                        <DialogTrigger asChild>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg glow-pink"
                            >
                                show us your work
                            </motion.button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold lowercase">join the team</DialogTitle>
                            </DialogHeader>
                            <UnifiedForm mode="job" onSuccess={() => setGeneralAppOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {/* Perks Grid */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black mb-8 text-center"
                    >
                        the perks
                    </motion.h2>

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
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-4xl font-black mb-8 text-center">
                        open positions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roles.map((role, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="h-full flex flex-col justify-between hover:glow-pink transition-all p-6">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold lowercase mb-2">
                                            {role.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {role.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="tech-label text-yibrant-green text-xs">
                                            {role.type}
                                        </span>

                                        <Dialog open={openDialog === role.title} onOpenChange={(open) => setOpenDialog(open ? role.title : null)}>
                                            <DialogTrigger asChild>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold text-sm"
                                                >
                                                    apply
                                                </motion.button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-bold lowercase">apply for {role.title}</DialogTitle>
                                                </DialogHeader>
                                                <UnifiedForm mode="job" defaultRole={role.title} onSuccess={() => setOpenDialog(null)} />
                                            </DialogContent>
                                        </Dialog>
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
                            we move fast and deliver results.
                            collaborative environment where innovation thrives.
                            join a team passionate about leveraging AI to create exceptional growth.
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

export default JoinUs;
