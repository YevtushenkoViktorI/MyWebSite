import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="section-heading text-foreground mb-4">
            Let's build reliable systems.
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Available for iOS/macOS roles in Switzerland.
          </p>
          <p className="text-muted-foreground mb-10">
            Open to contract collaborations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@viktoryevtushenko.dev"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Mail size={16} /> Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;