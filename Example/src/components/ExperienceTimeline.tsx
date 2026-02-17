import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'iOS Developer',
    domain: 'Software Engineering',
    period: '2021 — Present',
    outcomes: [
      'Architected and shipped multiple production iOS apps',
      'Led migration from UIKit to SwiftUI for flagship product',
      'Reduced crash rate by 95% through systematic debugging',
    ],
  },
  {
    title: 'Telecom Engineer',
    domain: 'Telecommunications Infrastructure',
    period: '2019 — 2021',
    outcomes: [
      'Deployed fiber optic networks across multiple regions',
      'Maintained 99.9% uptime for critical communication nodes',
      'Managed infrastructure projects end-to-end',
    ],
  },
  {
    title: 'Electrical Engineer',
    domain: 'Industrial Electrical Systems',
    period: '2018 — 2019',
    outcomes: [
      'Designed and installed systems up to 1000V',
      'Conducted safety compliance audits',
      'Optimized power distribution for efficiency',
    ],
  },
  {
    title: 'Research Assistant',
    domain: 'Nanoelectronics & Semiconductor Physics',
    period: '2016 — 2018',
    outcomes: [
      'Fabricated and characterized thin-film semiconductors',
      'Published research on vacuum-deposited nanostructures',
      'Operated SEM, AFM, and spectroscopy equipment',
    ],
  },
];

const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">Experience</h2>
          <p className="section-subheading">
            A journey from physical engineering to digital systems.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Marker */}
                <div className="absolute left-2.5 md:left-4.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                <div className="glass-panel p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                  </div>
                  <p className="text-sm text-primary mb-4">{exp.domain}</p>
                  <ul className="space-y-2">
                    {exp.outcomes.map((o, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;