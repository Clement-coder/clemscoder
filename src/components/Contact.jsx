import React, { useEffect, useRef, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { MessageCircle, Loader, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '2347071663687';

// Custom glassmorphic toast
const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <span className="w-2 h-2 rounded-full bg-green flex-shrink-0" />,
    error:   <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />,
    loading: <Loader size={14} className="text-green flex-shrink-0 animate-spin" />,
  };
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      drag="y"
      dragConstraints={{ top: -100, bottom: 10 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      onDragEnd={(_, info) => { if (info.offset.y < -30) onClose(); }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-grab active:cursor-grabbing select-none w-full"
      style={{
        background: 'rgba(17,34,64,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(100,255,218,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(100,255,218,0.08)',
        fontFamily: 'Geist Mono, monospace',
        fontSize: '13px',
        color: '#ccd6f6',
      }}
    >
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-slate/40 hover:text-green transition-colors ml-2 flex-shrink-0">
        <X size={13} />
      </button>
    </motion.div>
  );
};

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  const show = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    if (type !== 'loading') setTimeout(() => remove(id), duration);
    return id;
  }, [remove]);
  const update = useCallback((id, message, type) => {
    setToasts(t => t.map(x => x.id === id ? { ...x, message, type } : x));
    setTimeout(() => remove(id), 3500);
  }, [remove]);
  return { toasts, show, update, remove };
};

const Contact = () => {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const { toasts, show, update, remove } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      show('Please fill in all fields.', 'error');
      return;
    }
    setSending(true);
    const id = show('Sending...', 'loading');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      update(id, 'Message sent!', 'success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      update(id, 'Failed to send. Try emailing directly.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-xl mx-auto text-center">
      {/* Toast portal */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-md flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => <Toast key={t.id} {...t} onClose={() => remove(t.id)} />)}
        </AnimatePresence>
      </div>
      <h2 className="numbered-heading">Get In Touch</h2>
      <p className="text-slate text-lg mb-8">
        I'm currently open to new opportunities. Whether you have a question, a project idea, or
        just want to say hi — my inbox is always open!
      </p>

      {/* Contact chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <a
          href="mailto:chinexzy37@gmail.com"
          className="font-mono text-sm text-slate hover:text-green border border-lightest-navy hover:border-green rounded-full px-4 py-2 transition-colors"
        >
          chinexzy37@gmail.com
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-sm text-slate hover:text-green border border-lightest-navy hover:border-green rounded-full px-4 py-2 transition-colors group"
        >
          <MessageCircle size={14} className="text-[#25D366] group-hover:scale-110 transition-transform" />
          +234 707 166 3687
        </a>
      </div>

      <form ref={ref} onSubmit={handleSubmit} className="fade-up text-left space-y-5">
        {[
          { label: 'Name', key: 'name', type: 'text', placeholder: 'Your Name' },
          { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="block font-mono text-sm text-slate mb-2">{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              className="w-full bg-light-navy border border-lightest-navy rounded px-4 py-3 text-lightest-slate placeholder-slate/50 focus:outline-none focus:border-green transition-colors"
            />
          </div>
        ))}
        <div>
          <label className="block font-mono text-sm text-slate mb-2">Message</label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your project..."
            className="w-full bg-light-navy border border-lightest-navy rounded px-4 py-3 text-lightest-slate placeholder-slate/50 focus:outline-none focus:border-green transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full font-mono text-sm text-green border border-green rounded px-7 py-4 hover:bg-green/10 transition-colors disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
};

export default Contact;
