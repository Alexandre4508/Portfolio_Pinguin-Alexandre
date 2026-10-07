import React, { useState } from 'react';
import { Phone, Mail, MapPin, Linkedin, Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// ⚠️ Remplace xxxxxxxx par l'identifiant de ton formulaire Formspree
// (visible sur formspree.io, de la forme https://formspree.io/f/abcdwxyz)
const FORMSPREE_URL = 'https://formspree.io/f/xoejjlpl';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.desc'),
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Message depuis le portfolio',
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Envoi impossible');

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.desc'),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.send'),
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "a.pinguin@rt-iut.re.com", href: "mailto:a.pinguin@rt-iut.re.com", color: "bg-green-500" },
    { icon: MapPin, label: t('contact.location'), value: "Saint-Louis, La Réunion", href: "#", color: "bg-purple-500" },
    { icon: Linkedin, label: "LinkedIn", value: "alexandre-pinguin", href: "https://www.linkedin.com/in/alexandre-pinguin-071b4531a", color: "bg-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t('contact.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-slide-in">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="mr-3 text-primary" size={28} />
                {t('contact.info.title')}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a key={index} href={info.href} target={info.href.startsWith('http') ? '_blank' : '_self'} rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
                      <div className={`${info.color} text-white p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{info.label}</h3>
                        <p className="text-gray-600">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">{t('contact.available.title')}</h3>
              <p className="text-blue-100 mb-4">{t('contact.available.desc')}</p>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>{t('contact.available.best')}</strong><br />
                  {t('contact.available.hours')}<br />
                  {t('contact.available.response')}
                </p>
              </div>
            </div>
          </div>

          <div className="animate-slide-in" style={{animationDelay: '0.2s'}}>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="mr-3 text-secondary" size={28} />
                {t('contact.form.title')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.name')} *</label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('contact.form.name.placeholder')} className="w-full" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.email')} *</label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('contact.form.email.placeholder')} className="w-full" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.subject')}</label>
                  <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder={t('contact.form.subject.placeholder')} className="w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.message')} *</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t('contact.form.message.placeholder')} rows={6} className="w-full" required />
                </div>
                <Button type="submit" disabled={isSending} className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-60">
                  <Send className="mr-2" size={20} />
                  {isSending ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center">{t('contact.form.required')}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('contact.connect')}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{t('contact.connect.desc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-tech-blue-light text-primary px-4 py-2 rounded-full text-sm font-medium">{t('contact.tag.student')}</span>
              <span className="bg-tech-green-light text-secondary px-4 py-2 rounded-full text-sm font-medium">{t('contact.tag.tech')}</span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">{t('contact.tag.open')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
