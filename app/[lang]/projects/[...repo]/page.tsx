import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getRepoMarkdown } from '@/lib/github';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';
import FadeIn from '@/components/FadeIn';

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
    <div className="min-h-screen font-sans selection:bg-cyan-500/30 pb-24">
      <nav className="fixed top-0 w-full z-50 border-b border-teal-500/10 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="font-bold tracking-tighter text-lg text-teal-100 hover:text-teal-300 transition-colors">
            {dict.navigation.back}
          </Link>
          <div className="flex gap-6 text-sm font-medium text-teal-200/60">
            <span>{repoFullName}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
        <FadeIn delay={0.1}>
          <div className="mb-12 border-b border-teal-900/30 pb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-teal-50">{repoFullName}</h1>
            <p className="text-teal-200/50 font-mono text-sm">github.com/{repoFullName}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <article className="prose prose-invert prose-slate max-w-none 
            prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:border-b prose-h2:border-teal-900/30 prose-h2:pb-2
            prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-100 prose-code:text-teal-300 prose-code:bg-slate-900/80 prose-code:px-1 prose-code:rounded
            prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-teal-900/30 backdrop-blur-sm
            prose-img:rounded-xl prose-img:border prose-img:border-teal-900/30"
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
