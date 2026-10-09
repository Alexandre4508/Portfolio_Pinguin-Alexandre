
import { ArrowRight, Network, Shield, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpeg';
import NetworkDiagram from '@/components/NetworkDiagram';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-tech-blue-dark/70 to-secondary/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte (à gauche sur grand écran) */}
            <div className="animate-fade-in text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-bold mb-6">
                {t('home.hero.title')}
              </h1>
              <h2 className="text-2xl md:text-3xl mb-8 text-blue-100">
                {t('home.hero.name')}
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-blue-200 max-w-3xl mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/about" 
                  className="bg-secondary hover:bg-secondary-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {t('home.hero.cta1')}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link 
                  to="/projects" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  {t('home.hero.cta2')}
                </Link>
              </div>
            </div>

            {/* Schéma réseau animé (à droite sur grand écran) */}
            <div className="animate-fade-in">
              <NetworkDiagram variant="side" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t('home.features.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in">
              <div className="bg-primary text-white p-4 rounded-lg w-fit mb-6">
                <Network size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-800">{t('home.features.network.title')}</h4>
              <p className="text-gray-600">{t('home.features.network.desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in" style={{animationDelay: '0.2s'}}>
              <div className="bg-secondary text-white p-4 rounded-lg w-fit mb-6">
                <Shield size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-800">{t('home.features.security.title')}</h4>
              <p className="text-gray-600">{t('home.features.security.desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in" style={{animationDelay: '0.4s'}}>
              <div className="bg-primary text-white p-4 rounded-lg w-fit mb-6">
                <Code size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-800">{t('home.features.dev.title')}</h4>
              <p className="text-gray-600">{t('home.features.dev.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            {t('home.cta.title')}
          </h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {t('home.cta.desc')}
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            {t('home.cta.button')}
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
