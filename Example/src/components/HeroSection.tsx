import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import heroDark from '@/assets/hero-dark.jpg';
import heroLight from '@/assets/hero-light.jpg';

const chips = ['Swift', 'SwiftUI', 'UIKit', 'Architecture', 'Performance', 'AI/AR', 'Deep Links', 'Streaming'];

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            className="flex-1 lg:max-w-[60%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
              Engineering precision.{' '}
              <span className="text-gradient">
                From semiconductor labs to scalable iOS systems.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              I build reliable Apple-platform software with telecom-grade discipline
              and nanoelectronics-level precision.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {chips.map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
              >
                <Download size={16} /> Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail size={14} /> Contact
              </a>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[2rem] glow-shadow opacity-60 blur-2xl scale-105" />
              {/* Dark photo */}
              <img
                src={heroDark}
                alt="Viktor Yevtushenko"
                className="relative w-64 sm:w-72 lg:w-80 rounded-[2rem] shadow-2xl block [.light_&]:hidden"
              />
              {/* Light photo */}
              <img
                src={heroLight}
                alt="Viktor Yevtushenko"
                className="relative w-64 sm:w-72 lg:w-80 rounded-[2rem] shadow-2xl hidden [.light_&]:block"
              />
              {/* Status badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 text-xs font-medium text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Open to opportunities
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;