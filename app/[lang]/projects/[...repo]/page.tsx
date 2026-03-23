import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getRepoMarkdown } from '@/lib/github';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import LanguageToggle from '@/components/LanguageToggle';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es', repo: string[] }>;
}) {
  const { lang, repo } = await params;
  const repoFullName = repo.join('/');
  
  const content = await getRepoMarkdown(repoFullName);
  const dict = await getDictionary(lang);

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 pb-24 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-teal-500/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="font-bold tracking-tighter text-lg text-teal-700 dark:text-teal-100 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
            {dict.navigation.back}
          </Link>
          <div className="flex gap-2 sm:gap-4 items-center text-sm font-medium text-slate-600 dark:text-teal-200/60">
            <span className="hidden sm:inline">{repoFullName}</span>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
            <LanguageToggle currentLang={lang} />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
        <FadeIn delay={0.1}>
          <div className="mb-12 border-b border-slate-200 dark:border-teal-900/30 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2 text-slate-900 dark:text-teal-50">{repoFullName}</h1>
              <p className="text-slate-500 dark:text-teal-200/50 font-mono text-sm">github.com/{repoFullName}</p>
            </div>
            <a 
              href={`https://github.com/${repoFullName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-teal-400 transition-colors shadow-sm"
            >
              <GithubIcon />
              View on GitHub
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <article className="prose dark:prose-invert prose-slate max-w-none 
            prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-teal-900/30 prose-h2:pb-2
            prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-500 dark:hover:prose-a:text-teal-300 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-code:text-teal-700 dark:prose-code:text-teal-300 prose-code:bg-slate-100 dark:prose-code:bg-slate-900/80 prose-code:px-1 prose-code:rounded
            prose-pre:bg-slate-50 dark:prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-teal-900/30 backdrop-blur-sm
            prose-img:rounded-xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-teal-900/30"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        </FadeIn>
      </main>
    </div>
  );
}
