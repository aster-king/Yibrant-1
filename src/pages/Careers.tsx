import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Clock, Rocket, Users, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm, ValidationError } from "@formspree/react";

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

const JobApplicationForm = ({ defaultRole = "", onSuccess }: { defaultRole?: string, onSuccess: () => void }) => {
  // Use the main Formspree ID
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || "xzzllqzv";
  const [state, handleSubmit] = useForm(formId);

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Application sent successfully!", {
        description: "We'll review your portfolio and get back to you.",
      });
      onSuccess();
    }
    if (state.errors) {
      toast.error("Something went wrong.", {
        description: "Please try again or email us directly.",
      });
    }
  }, [state.succeeded, state.errors, onSuccess]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid gap-2">
        <Label htmlFor="role">Role Interest</Label>
        <Input
          id="role"
          name="role"
          defaultValue={defaultRole}
          placeholder="e.g. Video Editor"
          className="bg-background/50"
          required
        />
        <ValidationError prefix="Role" field="role" errors={state.errors} className="text-red-500 text-sm" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" required placeholder="John Doe" className="bg-background/50" />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-background/50" />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="portfolio">Portfolio URL</Label>
        <Input id="portfolio" name="portfolio" type="url" required placeholder="https://dribbble.com/johndoe" className="bg-background/50" />
        <ValidationError prefix="Portfolio" field="portfolio" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="resume">Resume (PDF)</Label>
        {/* Note: File uploads require a paid Formspree plan or specific configuration. 
            For free tier, this might just send the filename unless configured. */}
        <Input id="resume" name="resume" type="file" accept=".pdf" required className="bg-background/50 cursor-pointer" />
        <ValidationError prefix="Resume" field="resume" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover">Why you?</Label>
        <textarea
          id="cover"
          name="cover"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Tell us something interesting..."
        />
        <ValidationError prefix="Cover Letter" field="cover" errors={state.errors} className="text-red-500 text-sm" />
      </div>
      <Button type="submit" className="w-full font-bold" disabled={state.submitting}>
        {state.submitting ? "Sending..." : "Submit Application"}
      </Button>
      {!formId && (
        <p className="text-xs text-center text-red-400 mt-2">
          * Form ID not configured.
        </p>
      )}
    </form>
  );
};

const Careers = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [generalAppOpen, setGeneralAppOpen] = useState(false);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
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
              <JobApplicationForm onSuccess={() => setGeneralAppOpen(false)} />
            </DialogContent>
          </Dialog>
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
                        <JobApplicationForm defaultRole={role.title} onSuccess={() => setOpenDialog(null)} />
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

export default Careers;