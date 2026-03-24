import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Code2, Video, Coffee, Rocket, ChevronDown } from 'lucide-react';

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  const stats = [
    { icon: Code2, value: '50+', label: 'Projects Selesai' },
    { icon: Video, value: '100+', label: 'Video Konten' },
    { icon: Coffee, value: '1000+', label: 'Cangkir Kopi' },
    { icon: Rocket, value: '5+', label: 'Tahun Pengalaman' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Tentang Saya</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Mengenal Lebih Dekat
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden glass shadow-card flex items-center justify-center"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-8xl"
                >
                  👨‍💻
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 p-4 glass rounded-xl shadow-card"
            >
              <p className="text-2xl font-bold text-primary">5+ Tahun</p>
              <p className="text-sm text-muted-foreground">Pengalaman</p>
            </motion.div>
          </motion.div>

          {/* TEXT + ACCORDION */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Passionate Developer & Creator
            </h3>

            {/* TEXT AWAL */}
            <p className="text-muted-foreground leading-relaxed">
              I am a beginner web developer who is passionate about learning and creating simple, useful websites.
              I have started my journey by studying HTML, CSS, and JavaScript.
            </p>

            {/* ACCORDION */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-primary font-medium"
            >
              {open ? 'Show Less' : 'Read More'}
              <motion.div animate={{ rotate: open ? 180 : 0 }}>
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden space-y-4"
                >
                  <p className="text-muted-foreground leading-relaxed">
                    I enjoy exploring how websites are built and improving my skills by practicing
                    and building small projects. Through my projects, I aim to develop clean,
                    responsive, and user-friendly web pages.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    I am always eager to learn new technologies and grow as a developer.
                    My goal is to create better digital experiences in the future.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 glass rounded-xl text-center cursor-pointer"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}