import { motion } from 'framer-motion';
import { Blocks, Gauge, Radio, Sparkles, CreditCard, Cloud } from 'lucide-react';

const expertiseCards = [
  {
    icon: Blocks,
    title: 'System Architecture',
    description: 'Modular, scalable architectures built for long-term maintainability.',
    keywords: ['MVVM', 'Clean Architecture', 'Coordinator', 'Dependency Injection'],
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    description: 'Profiling, memory management, and rendering pipeline tuning.',
    keywords: ['Instruments', 'Memory Graphs', 'Frame Rate', 'Concurrency'],
  },
  {
    icon: Radio,
    title: 'Realtime Systems',
    description: 'Low-latency streaming and live data synchronization.',
    keywords: ['WebSocket', 'HLS', 'AVFoundation', 'Combine'],
  },
  {
    icon: Sparkles,
    title: 'AI & AR',
    description: 'On-device intelligence and spatial computing experiences.',
    keywords: ['Core ML', 'ARKit', 'Vision', 'RealityKit'],
  },
  {
    icon: CreditCard,
    title: 'Payments & Wallet',
    description: 'Secure financial transactions and digital wallet integration.',
    keywords: ['StoreKit', 'PassKit', 'Apple Pay', 'PCI DSS'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Backend',
    description: 'Server-side integration and cloud-native service orchestration.',
    keywords: ['REST', 'GraphQL', 'Firebase', 'CloudKit'],
  },
];

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">Expertise</h2>
          <p className="section-subheading">
            Deep specializations across the Apple ecosystem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-panel p-6 hover:glow-shadow transition-all duration-500"
            >
              <card.icon size={24} className="text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.keywords.map((kw) => (
                  <span key={kw} className="chip text-xs">{kw}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;