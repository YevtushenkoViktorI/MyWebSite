import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Streaming Platform App',
    description: 'Real-time video streaming with adaptive bitrate and offline mode',
    tech: ['Swift', 'AVFoundation', 'HLS', 'Core Data'],
    impact: ['50K+ daily active users', 'Sub-second stream start time'],
  },
  {
    title: 'Fintech Wallet',
    description: 'Secure payment and wallet management with biometric auth',
    tech: ['SwiftUI', 'Combine', 'PassKit', 'StoreKit'],
    impact: ['PCI DSS compliant architecture', '4.8★ App Store rating'],
  },
  {
    title: 'AR Navigation System',
    description: 'Indoor navigation with augmented reality wayfinding',
    tech: ['ARKit', 'RealityKit', 'Core Location', 'Metal'],
    impact: ['Real-time 3D spatial mapping', 'Sub-meter positioning accuracy'],
  },
  {
    title: 'IoT Control Dashboard',
    description: 'Remote monitoring and control for industrial IoT devices',
    tech: ['UIKit', 'MQTT', 'Charts', 'WebSocket'],
    impact: ['500+ connected devices managed', '99.9% uptime monitoring'],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">Selected Work</h2>
          <p className="section-subheading">
            Products built with system-level thinking and attention to detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 lg:p-8 group hover:glow-shadow transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              </div>

              <p className="text-muted-foreground text-sm mb-5">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span key={t} className="chip text-xs">{t}</span>
                ))}
              </div>

              <ul className="space-y-2">
                {project.impact.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;