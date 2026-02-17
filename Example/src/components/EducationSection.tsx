import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const EducationSection = () => {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-heading text-foreground mb-4">Education & Certificates</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={22} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Education</h3>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Bachelor of Science</h4>
              <p className="text-sm text-primary mb-1">Micro & Nanoelectronics</p>
              <p className="text-xs text-muted-foreground">
                Specialized in semiconductor physics, thin-film technology, and electronic device fabrication.
              </p>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award size={22} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
            </div>
            <ul className="space-y-4">
              {[
                { name: 'Electrical Safety Certificate', detail: 'Up to 1000V installations' },
                { name: 'Telecom Infrastructure', detail: 'Network deployment & maintenance' },
                { name: 'Installation Permits', detail: 'Industrial electrical systems' },
              ].map((cert) => (
                <li key={cert.name}>
                  <p className="font-medium text-foreground text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.detail}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;