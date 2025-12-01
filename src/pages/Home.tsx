import { motion } from "framer-motion";
import { KineticBallsAnimation } from "@/components/KineticBallsAnimation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import Services from "./Services";
import Contact from "./Contact";
import { UnifiedForm } from "@/components/UnifiedForm";
import { GlassCard } from "@/components/GlassCard";

const Home = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="home">
            <main className="min-h-[60vh] pt-24 pb-0 relative overflow-hidden bg-gradient-to-br from-background via-background to-yibrant-yellow/5">

                {/* Decorative gradient blobs */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-yibrant-pink/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-yibrant-green/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yibrant-yellow/5 rounded-full blur-3xl" />

                {/* Unified Hero Container */}
                <div className="container mx-auto px-6 pt-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-stretch min-h-[40vh]">
                        {/* Left Segment: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-[50%] relative p-8 shrink-0 flex flex-col justify-center text-center md:text-left"
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                                <span className="block">we broke the</span>
                                <span className="block gradient-text pb-2 text-[1.15em]">algorithm</span>
                                <span className="block">so you don't</span>
                                <span className="block">have to</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                                human creativity meets AI precision. we help you grow faster than you ever imagined.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection('contact')}
                                    className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg glow-pink"
                                >
                                    start the reactor
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection('services')}
                                    className="px-8 py-4 glass-card text-foreground rounded-full font-bold text-lg"
                                >
                                    see the magic
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Right Segment: Kinetic Balls - Hidden on Mobile */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="hidden md:flex w-[50%] relative items-center justify-center"
                        >
                            <div className="w-[400px] h-[400px] overflow-hidden">
                                <KineticBallsAnimation />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Smooth transition gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
            </main>

            <section id="services">
                <Services />
            </section>

            <section id="contact">
                <Contact />
            </section>

            <section id="simple-contact" className="py-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <GlassCard className="p-8">
                        <h2 className="text-3xl font-black mb-6 text-center lowercase">
                            get in touch
                        </h2>
                        <UnifiedForm mode="enquiry" hideEnquiryType={true} />
                    </GlassCard>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
