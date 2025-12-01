import { motion } from "framer-motion";
import { KineticBallsAnimation } from "@/components/KineticBallsAnimation";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import Services from "./Services";
import Careers from "./Careers";
import Contact from "./Contact";

const Home = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="home">
            <main className="min-h-[75vh] pt-16 pb-0 relative overflow-hidden bg-gradient-to-br from-background via-background to-yibrant-yellow/5">
                <ParticlesBackground />
                {/* Decorative gradient blobs */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-yibrant-pink/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-yibrant-green/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yibrant-yellow/5 rounded-full blur-3xl" />

                {/* Unified Hero Container */}
                <div className="container mx-auto px-6 pt-4 relative">
                    <div className="flex flex-col md:flex-row items-stretch min-h-[60vh]">
                        {/* Left Segment: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-[50%] relative p-8 shrink-0 flex flex-col justify-center text-center md:text-left"
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none">
                                we broke the
                                <span className="block gradient-text">algorithm</span>
                                so you don't have to.
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
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
            </main>

            <section id="services">
                <Services />
            </section>

            <section id="careers">
                <Careers />
            </section>

            <section id="contact">
                <Contact />
            </section>
        </div>
    );
};

export default Home;
