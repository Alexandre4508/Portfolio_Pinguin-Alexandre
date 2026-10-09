
import { Link, useLocation } from 'react-router-dom';
import { User, Home, FileText, Mail, FolderOpen, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/about', label: t('nav.about'), icon: User },
    { path: '/cv', label: t('nav.cv'), icon: FileText },
    { path: '/projects', label: t('nav.projects'), icon: FolderOpen },
    { path: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-tech-blue-light sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
            Pinguin Alexandre
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:text-primary hover:bg-accent'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-accent transition-all duration-300 border border-gray-200"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center space-x-1 px-2 py-1 rounded text-gray-600 border border-gray-200"
            >
              <Globe size={16} />
              <span className="text-xs font-medium">{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-600 p-1">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm px-3 py-2 rounded ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-accent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
