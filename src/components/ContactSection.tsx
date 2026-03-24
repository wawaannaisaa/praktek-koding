import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nama harus diisi'),
  email: z.string().trim().email('Email tidak valid'),
  subject: z.string().trim().min(1, 'Subjek harus diisi'),
  message: z.string().trim().min(1, 'Pesan harus diisi'),
});

// ✅ TYPE FORM
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ✅ TYPE ERROR
type FormErrors = Partial<Record<keyof FormData, string>>;

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'wawaannaisaa@gmail.com',
    href: 'mailto:wawaannaisaa@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '+62 81262486149',
    href: 'tel:+6281262486149',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Aceh, Indonesia',
    href: '#',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ FIX TYPE EVENT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        if (field) {
          fieldErrors[field] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // ✅ MAILTO FIX
    const mailtoLink = `mailto:wawaannaisaa@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Kontak</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Hubungi Saya
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Mari Berkolaborasi!
              </h3>
              <p className="text-muted-foreground">
                Punya project menarik? Yuk ngobrol!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 p-6 glass rounded-2xl">

              {(['name', 'email', 'subject'] as (keyof FormData)[]).map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2"
                >
                  <label className="text-sm capitalize">{field}</label>
                  <Input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`transition-all ${
                      errors[field] ? 'border-red-500' : ''
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-xs text-red-500">{errors[field]}</p>
                  )}
                </motion.div>
              ))}

              <div className="space-y-2">
                <label className="text-sm">Pesan</label>
                <Textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`transition-all ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Membuka Email...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Email
                  </>
                )}
              </Button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}