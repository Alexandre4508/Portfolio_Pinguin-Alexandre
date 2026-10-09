
import { 
  Phone, Mail, MapPin, Linkedin, GraduationCap, Award, Languages, 
  Monitor, Heart, User, Target, Briefcase, Download, Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CV = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{t('cv.title')}</h1>
              <p className="text-xl text-blue-100 mb-4">{t('cv.subtitle')}</p>
              
             <Button
  asChild
  className="mb-6 bg-white/20 border border-white/40 text-white hover:bg-white hover:text-primary"
>
  <a href="/CV_PINGUIN_Alexandre.pdf" download="CV-Alexandre-Pinguin.pdf">
    <Download size={16} />
    {t('cv.download')}
  </a>
</Button>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <Car size={16} className="mr-2" />
                  <span>Permis B - Véhiculé</span>
                </div>
            
              <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>a.pinguin@rt-iut.re.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>Saint-Louis</span>
                </div>
                <div className="flex items-center">
                  <Linkedin size={16} className="mr-2" />
                  <span>alexandre-pinguin</span>
                </div>
              </div>
            </div>
          </div>

                            <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Colonne de gauche */}
              <div className="lg:col-span-1 space-y-6">
                {/* Profil */}
                <div className="bg-tech-blue-light p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <User className="text-primary mr-3" size={24} />
                    <h2 className="text-xl font-bold text-primary">{t('cv.profile.title')}</h2>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t('cv.profile.desc')}</p>
                  <p className="text-gray-700 text-sm mt-3 font-semibold">{t('cv.profile.extra')}</p>
                </div>

                {/* Qualités */}
                <div className="bg-tech-green-light p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Award className="text-secondary mr-3" size={24} />
                    <h2 className="text-xl font-bold text-secondary">{t('cv.qualities.title')}</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[t('cv.quality.1'), t('cv.quality.2'), t('cv.quality.3'), t('cv.quality.4')].map((q, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Langues */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Languages className="text-primary mr-3" size={24} />
                    <h2 className="text-xl font-bold text-primary">{t('cv.languages.title')}</h2>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="flex justify-between">
                        <span>{t('cv.lang.french')}</span>
                        <span className="text-secondary font-semibold">{t('cv.lang.french.badge')}</span>
                      </div>
                      <p className="text-gray-600 text-xs">{t('cv.lang.french.level')}</p>
                    </div>
                    <div>
                      <span>{t('cv.lang.english')}</span>
                      <p className="text-gray-600 text-xs">{t('cv.lang.english.level')}</p>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>{t('cv.lang.spanish')}</span>
                        <span className="text-secondary font-semibold">A2</span>
                      </div>
                      <p className="text-gray-600 text-xs">{t('cv.lang.spanish.level')}</p>
                    </div>
                  </div>
                </div>

                {/* Compétences techniques */}
                <div className="bg-tech-blue-light p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Monitor className="text-primary mr-3" size={24} />
                    <h2 className="text-xl font-bold text-primary">{t('cv.software.title')}</h2>
                  </div>
                  <div className="space-y-3 text-sm">
                    {['network', 'systems', 'admin'].map((k) => (
                      <div key={k}>
                        <span className="font-semibold text-primary">{t(`cv.tech.${k}.title`)}</span>
                        <p className="text-gray-700">{t(`cv.tech.${k}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passions */}
                <div className="bg-tech-green-light p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Heart className="text-secondary mr-3" size={24} />
                    <h2 className="text-xl font-bold text-secondary">{t('cv.passions.title')}</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[1, 2, 3, 4].map((n) => (
                      <li key={n} className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        {t(`cv.passion.${n}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Colonne de droite */}
              <div className="lg:col-span-2 space-y-6">
                {/* Diplômes / Certifications */}
                <div>
                  <div className="flex items-center mb-6">
                    <GraduationCap className="text-primary mr-3" size={28} />
                    <h2 className="text-2xl font-bold text-primary">{t('cv.diplomas.title')}</h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      { n: 1, date: '2026 - 2027' },
                      { n: 2, date: '2023 - 2024' },
                      { n: 3, date: '2023 - 2024' },
                      { n: 4, date: '2024 - 2025' },
                    ].map((d) => (
                      <div
                        key={d.n}
                        className={`border-l-4 pl-6 ${d.n % 2 === 1 ? 'border-primary' : 'border-secondary'}`}
                      >
                        <h3 className="font-bold text-lg">{t(`cv.dipl.${d.n}.title`)}</h3>
                        <p className="text-secondary font-semibold">{d.date}</p>
                        <p className="text-gray-600">{t(`cv.dipl.${d.n}.school`)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage */}
                <div>
                  <div className="flex items-center mb-4">
                    <Briefcase className="text-primary mr-3" size={28} />
                    <h2 className="text-2xl font-bold text-primary">{t('cv.internship.title')}</h2>
                  </div>
                  <p className="text-secondary font-semibold mb-4">{t('cv.internship.company')}</p>

                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-primary mb-1">{t(`cv.internship.${n}.title`)}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{t(`cv.internship.${n}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projets réseaux académiques */}
                <div>
                  <div className="flex items-center mb-6">
                    <Target className="text-secondary mr-3" size={28} />
                    <h2 className="text-2xl font-bold text-secondary">{t('cv.projects.title')}</h2>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-secondary mb-1">{t(`cv.projects.${n}.title`)}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{t(`cv.projects.${n}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projet professionnel */}
                <div>
                  <div className="flex items-center mb-6">
                    <Target className="text-secondary mr-3" size={28} />
                    <h2 className="text-2xl font-bold text-secondary">{t('cv.future.title')}</h2>
                  </div>

                  <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg">
                    <p className="leading-relaxed">{t('cv.future.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;

