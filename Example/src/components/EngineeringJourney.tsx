import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Microscope, Radio, Zap, Wrench, Smartphone } from 'lucide-react';

const journeyItems = [
  {
    id: 'nano',
    icon: Microscope,
    title: 'Nanoelectronics Research',
    description: 'Studied nano-scale semiconductor structures and quantum effects in thin-film devices at the university research lab.',
    achievements: [
      'Conducted research on ZnO and TiO₂ nanostructured thin films',
      'Published scientific paper on vacuum-deposited semiconductor properties',
      'Mastered electron microscopy and spectroscopy techniques',
    ],
  },
  {
    id: 'vacuum',
    icon: Layers,
    title: 'Vacuum Deposition Systems',
    description: 'Operated and maintained industrial vacuum deposition equipment for thin-film semiconductor fabrication.',
    achievements: [
      'Controlled multi-stage deposition processes with nm-level precision',
      'Optimized chamber pressure and substrate temperature parameters',
      'Ensured film uniformity across large-area substrates',
    ],
  },
  {
    id: 'semi',
    icon: Cpu,
    title: 'Semiconductor Thin Films',
    description: 'Developed and characterized semiconductor thin films for optoelectronic applications.',
    achievements: [
      'Fabricated transparent conductive oxide films',
      'Achieved target resistivity and transmittance specifications',
      'Correlated deposition parameters with film properties',
    ],
  },
  {
    id: 'telecom',
    icon: Radio,
    title: 'Telecom Infrastructure',
    description: 'Designed and deployed telecommunications infrastructure including fiber optic and copper networks.',
    achievements: [
      'Installed and configured telecom equipment across multiple sites',
      'Ensured 99.9% uptime for critical communication systems',
      'Managed cross-functional teams for infrastructure rollouts',
    ],
  },
  {
    id: 'electrical',
    icon: Zap,
    title: 'Electrical Installations (1000V)',
    description: 'Performed high-voltage electrical installations and maintenance for industrial and commercial facilities.',
    achievements: [
      'Certified for electrical installations up to 1000V',
      'Conducted safety audits and compliance inspections',
      'Designed electrical distribution systems',
    ],
  },
  {
    id: 'equipment',
    icon: Wrench,
    title: 'Scientific Equipment',
    description: 'Maintained and operated precision scientific instruments for research and industrial applications.',
    achievements: [
      'Calibrated and maintained analytical instruments',
      'Developed standard operating procedures',
      'Trained junior technicians on equipment operation',
    ],
  },
  {
    id: 'ios',
    icon: Smartphone,
    title: 'iOS Architecture',
    description: 'Architecting scalable, maintainable iOS applications with modern Swift patterns and Apple platform best practices.',
    achievements: [
      'Designed modular architecture for apps with 500K+ users',
      'Implemented clean MVVM/Coordinator patterns',
      'Optimized app performance and memory management',
      'Integrated CI/CD pipelines for automated testing and deployment',
    ],
  },
];

const EngineeringJourney = () => {
  const [activeId, setActiveId] = useState('ios');
  const active = journeyItems.find((i) => i.id === activeId)!;

  return (
    <section id="engineering" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">Engineering Journey</h2>
          <p className="section-subheading">
            From semiconductor clean rooms to App Store — a path shaped by precision engineering.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left menu */}
          <div className="lg:w-72 flex-shrink-0 space-y-2">
            {journeyItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                  activeId === item.id
                    ? 'glass-panel text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon size={18} className={activeId === item.id ? 'text-primary' : ''} />
                <span className="hidden sm:inline">{item.title}</span>
                <span className="sm:hidden">{item.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Right content */}
          <div className="flex-1 glass-panel p-6 lg:p-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <active.icon size={24} className="text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">{active.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{active.description}</p>
                <ul className="space-y-3">
                  {active.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-secondary-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringJourney;