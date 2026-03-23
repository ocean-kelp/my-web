import Link from 'next/link';
import Image from 'next/image';
import { getPortfolioRepos } from '@/lib/github';
import { getDictionary } from '@/lib/dictionaries';
import FadeIn from '@/components/FadeIn';
import LanguageToggle from '@/components/LanguageToggle';

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'es' }> }) {
  const { lang } = await params;
  const repos = await getPortfolioRepos();
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30">
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-teal-500/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-tighter text-lg text-teal-600 dark:text-teal-100">RD.</span>
          <div className="flex gap-2 sm:gap-6 items-center text-sm font-medium text-slate-600 dark:text-teal-200/60">
            <a href="#about" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors hidden sm:block">{dict.navigation.about}</a>
            <a href="#projects" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors hidden sm:block">{dict.navigation.projects}</a>
            <a href={dict.hero.cvLink} target="_blank" className="hover:text-teal-600 dark:hover:text-teal-200 transition-colors hidden sm:block">{dict.navigation.resume}</a>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
            <LanguageToggle currentLang={lang} />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10 text-slate-900 dark:text-white transition-colors duration-500">
        <FadeIn delay={0.2}>
          <section id="hero" className="py-20 flex flex-col justify-center items-start min-h-[60vh]">
            <div className="inline-block px-3 py-1 mb-6 rounded-full border border-teal-500/30 dark:border-teal-500/20 bg-teal-50 dark:bg-teal-900/30 text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-200 transition-colors">
              {dict.hero.available}
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-linear-to-r from-teal-500 via-cyan-600 to-blue-600 dark:from-teal-200 dark:via-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Ronald Díaz
            </h1>
            <h2 className="text-2xl sm:text-3xl text-slate-700 dark:text-teal-100/90 mb-8 font-medium">
              {dict.hero.role}
            </h2>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
              {dict.hero.description}
            </p>
            <div className="flex gap-4">
              <a href="#projects" className="px-6 py-3 rounded-lg bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 font-medium hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors shadow-sm">
                {dict.hero.viewProjects}
              </a>
              <a href={dict.hero.cvLink} target="_blank" download className="px-6 py-3 rounded-lg border border-slate-300 dark:border-teal-500/30 hover:border-teal-600/50 dark:hover:border-teal-400/50 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md text-slate-800 dark:text-teal-50">
                {dict.hero.downloadCv}
              </a>
            </div>
          </section>
        </FadeIn>

        <section id="about" className="py-24 border-t border-slate-200 dark:border-teal-900/30">
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              {/* Photo Area */}
              <div className="relative group rounded-3xl overflow-hidden aspect-square border border-slate-200 dark:border-teal-800/50 bg-slate-100 dark:bg-slate-800/20 shadow-xl transition-all hover:shadow-teal-500/20">
                <div className="absolute inset-0 bg-linear-to-tr from-teal-500/20 to-blue-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                {/* Fallback pattern / The user's image */}
                <Image 
                  src="/me.jpeg" 
                  alt="Ronald Díaz" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-xs bg-slate-900/80 text-white px-3 py-1 rounded-full backdrop-blur-md">Add public/me.jpg</span>
                </div>
              </div>

              {/* Text Layout */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-teal-800 dark:text-teal-100">{dict.about_details.title}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {dict.about_details.bio}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4 text-slate-800 dark:text-teal-200">{dict.about_details.achievements_title}</h4>
                  <ul className="space-y-3">
                    {dict.about_details.achievements.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="text-teal-500 mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <a href={`mailto:${dict.about_details.email}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600/10 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 hover:bg-teal-600/20 dark:hover:bg-teal-500/20 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    {dict.about_details.contact}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="projects" className="py-20">
          <FadeIn delay={0.4}>
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-teal-800 dark:text-teal-100">{dict.projects.title}</h3>
              <p className="text-slate-500 dark:text-slate-400">{dict.projects.subtitle}</p>
            </div>
          </FadeIn>

          {repos.length === 0 ? (
            <FadeIn delay={0.5}>
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-teal-900/50 bg-white/50 dark:bg-slate-900/40 text-center backdrop-blur-sm transition-colors">
                <p className="text-slate-600 dark:text-slate-300">{dict.projects.noProjects}</p>
                <p className="text-sm text-slate-500 mt-2">{dict.projects.example}</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo, idx) => (
                <FadeIn key={repo.full_name} delay={0.5 + (idx * 0.1)}>
                  <Link href={`/${lang}/projects/${repo.full_name}`} className="group relative flex flex-col justify-between p-6 h-64 rounded-2xl border border-slate-200 dark:border-teal-900/30 bg-white/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-linear-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">{repo.name}</h4>
                        {repo.stargazers_count > 0 && <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-500/90 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-200 dark:border-yellow-500/20">★ {repo.stargazers_count}</span>}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{repo.description || dict.projects.noDescription}</p>
                    </div>
                    <div className="relative z-10 flex gap-2 flex-wrap mt-auto pt-4">
                      {repo.topics.filter(t => t !== 'portfolio').slice(0, 3).map(topic => (
                        <span key={topic} className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-teal-700 dark:text-teal-200/80">{topic}</span>
                      ))}
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
