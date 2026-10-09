import { ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import projectCybersecurite from '@/assets/project-cybersecurite.png';
import projectMFA from '@/assets/project-MFA.png';
import projectTemperature from '@/assets/project-temperature.png';
import projectReseau from '@/assets/project-reseau.png';
import projectSupervision from '@/assets/project-supervision.png';
import projectSafescreen from '@/assets/project-safescreen.png';
import projectIntegratif from '@/assets/project-integratif.png';
import projectIutfam from '@/assets/project-iutfam.png';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [openLearned, setOpenLearned] = useState<number | null>(null);

  // Pour ajouter "Ce que j'ai appris" à un projet : ajoute learnedKey: 'project.xxx.learned'
  // et crée la clé correspondante en FR et en EN dans LanguageContext.tsx
  const projects = [
    {
      titleKey: 'project.cyber.title',
      descKey: 'project.cyber.desc',
      image: projectCybersecurite,
      color: "bg-red-500",
      detailsKey: 'project.cyber.details',
      learnedKey: 'project.cyber.learned',
      link: "https://www.canva.com/design/DAGQh8EQjn0/ch8vVTu9xtW0kEJTZ6uq5Q/view?utm_content=DAGQh8EQjn0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7e927ec9b2"
    },
    {
      titleKey: 'project.MFA.title',
      descKey: 'project.MFA.desc',
      image: projectMFA,
      color: "bg-blue-500",
      detailsKey: 'project.MFA.details',
      learnedKey: 'project.MFA.learned',
      tagKey: 'projects.internship',
      link: "https://canva.link/b7rzmsr5egtpkwd"
    },
    {
      titleKey: 'project.temp.title',
      descKey: 'project.temp.desc',
      image: projectTemperature,
      color: "bg-orange-500",
      detailsKey: 'project.temp.details',
      learnedKey: 'project.temp.learned',
      link: "https://www.canva.com/design/DAGZn8ZIOGY/qu6FO5sqV_fFafIZaeDIAQ/view?utm_content=DAGZn8ZIOGY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hadb3f10e72"
    },
    {
      titleKey: 'project.crypto.title',
      descKey: 'project.crypto.desc',
      image: null,
      color: "bg-purple-500",
      detailsKey: 'project.crypto.details',
      learnedKey: 'project.crypto.learned',
    },
    {
      titleKey: 'project.network.title',
      descKey: 'project.network.desc',
      image: projectReseau,
      color: "bg-blue-500",
      detailsKey: 'project.network.details',
      learnedKey: 'project.network.learned',
      link: "https://www.canva.com/design/DAGmsNC98MY/wbq2buJu20wdJQ40GmCbeg/view?utm_content=DAGmsNC98MY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h474305b08d"
    },
    {
      titleKey: 'project.telecom.title',
      descKey: 'project.telecom.desc',
      image: null,
      color: "bg-green-500",
      detailsKey: 'project.telecom.details',
      learnedKey: 'project.telecom.learned',
    },
    {
      titleKey: 'project.supervision.title',
      descKey: 'project.supervision.desc',
      image: projectSupervision,
      color: "bg-indigo-500",
      detailsKey: 'project.supervision.details',
      learnedKey: 'project.supervision.learned',
    },
    {
      titleKey: 'project.safescreen.title',
      descKey: 'project.safescreen.desc',
      image: projectSafescreen,
      color: "bg-teal-500",
      detailsKey: 'project.safescreen.details',
      learnedKey: 'project.safescreen.learned',
      link: "https://www.canva.com/design/DAHDDIfdgKo/bmvAC1lapHD7vFoCG7xMpA/view?utm_content=DAHDDIfdgKo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h236819d34c"
    },
    {
      titleKey: 'project.integratif.title',
      descKey: 'project.integratif.desc',
      image: projectIntegratif,
      color: "bg-cyan-500",
      detailsKey: 'project.integratif.details',
      learnedKey: 'project.integratif.learned',
    },
    {
      titleKey: 'project.iutfam.title',
      descKey: 'project.iutfam.desc',
      image: projectIutfam,
      color: "bg-emerald-500",
      detailsKey: 'project.iutfam.details',
      learnedKey: 'project.iutfam.learned',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-in group flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.image ? (
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className={`w-full h-44 ${project.color} flex items-center justify-center`}>
                  <span className="text-white text-5xl font-bold opacity-30">
                    {t(project.titleKey).charAt(0)}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                  {t(project.titleKey)}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {t(project.descKey)}
                </p>

                <div className="border-t pt-4 mt-auto">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t(project.detailsKey)}
                  </p>
                </div>
              </div>

              {/* Ce que j'ai appris (cliquable) */}
              {project.learnedKey && (
                <div className="px-6 pb-4">
                  <button
                    onClick={() => setOpenLearned(openLearned === index ? null : index)}
                    aria-expanded={openLearned === index}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t('projects.learned')}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${openLearned === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openLearned === index && (
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed bg-tech-blue-light p-3 rounded-lg">
                      {t(project.learnedKey)}
                    </p>
                  )}
                </div>
              )}

              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {t(project.tagKey ?? 'projects.academic')}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-colors"
                      >
                        {t('projects.view')} <ExternalLink size={14} />
                      </a>
                    )}
                    {project.image && (
                      <button
                        onClick={() => setSelectedProject(index)}
                        className="flex space-x-1 hover:opacity-70 transition-opacity cursor-pointer"
                        title="Voir en grand"
                      >
                        {[1, 2, 3].map((dot) => (
                          <div key={dot} className="w-2 h-2 bg-primary rounded-full"></div>
                        ))}
                      </button>
                    )}
                    {!project.link && !project.image && (
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((dot) => (
                          <div key={dot} className="w-2 h-2 bg-primary rounded-full"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-xl shadow-lg text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">{t('projects.skills.title')}</h2>
          <p className="text-blue-100 mb-6 max-w-3xl mx-auto">{t('projects.skills.desc')}</p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{t('projects.skills.network')}</h3>
              <p className="text-sm text-blue-100">{t('projects.skills.network.desc')}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{t('projects.skills.security')}</h3>
              <p className="text-sm text-blue-100">{t('projects.skills.security.desc')}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{t('projects.skills.monitoring')}</h3>
              <p className="text-sm text-blue-100">{t('projects.skills.monitoring.desc')}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{t('projects.skills.telecom')}</h3>
              <p className="text-sm text-blue-100">{t('projects.skills.telecom.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for full image view */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject !== null && projects[selectedProject] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{t(projects[selectedProject].titleKey)}</DialogTitle>
                <DialogDescription>{t(projects[selectedProject].descKey)}</DialogDescription>
              </DialogHeader>
              {projects[selectedProject].image && (
                <img
                  src={projects[selectedProject].image!}
                  alt={t(projects[selectedProject].titleKey)}
                  className="w-full rounded-lg"
                />
              )}
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                {t(projects[selectedProject].detailsKey)}
              </p>
              {projects[selectedProject].link && (
                <a
                  href={projects[selectedProject].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary font-medium hover:underline mt-2"
                >
                  {t('projects.view')} <ExternalLink size={14} />
                </a>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
