import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '2347071663687';

const Contact = () => {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

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
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    const id = toast.loading('Sending...');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent!', { id });
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send. Try emailing directly.', { id });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-xl mx-auto text-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            width: '100%',
            maxWidth: '480px',
            background: 'rgba(17, 34, 64, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: '8px',
            color: '#ccd6f6',
            fontFamily: 'Geist Mono, monospace',
            fontSize: '13px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(100,255,218,0.1)',
            padding: '14px 18px',
          },
          success: {
            iconTheme: { primary: '#64ffda', secondary: '#0a192f' },
          },
          error: {
            iconTheme: { primary: '#ff6b6b', secondary: '#0a192f' },
          },
          loading: {
            iconTheme: { primary: '#64ffda', secondary: '#0a192f' },
          },
        }}
      />
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
