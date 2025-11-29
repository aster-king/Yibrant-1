import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Logo3D } from "@/components/Logo3D";
import { Suspense } from "react";
import bgElement from "@/assets/bg-element.svg";

const Home = () => {
  return (
    <main className="min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src={bgElement} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 min-h-[calc(100vh-10rem)] flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="tech-label text-yibrant-yellow mb-4"
          >
            GEN_TIME: 0.4s
          </motion.div>

          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
            we broke the
            <span className="block gradient-text">algorithm</span>
            so you don't have to.
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            human creativity meets AI precision. we help you grow faster than you ever imagined.
          </p>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg glow-coral"
            >
              start the reactor
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-card text-foreground rounded-full font-bold text-lg"
            >
              see the magic
            </motion.button>
          </div>
        </motion.div>

        {/* 3D Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="hidden lg:block w-[500px] h-[500px]"
        >
          <Canvas>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#F87171" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#34D399" />
              <Logo3D />
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Suspense>
          </Canvas>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "0.4s", label: "avg generation time", color: "yellow" },
            { value: "847%", label: "roi for clients", color: "teal" },
            { value: "∞", label: "creative possibilities", color: "coral" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 text-center"
            >
              <div className={`text-6xl font-black mb-2 text-yibrant-${stat.color}`}>
                {stat.value}
              </div>
              <div className="tech-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;