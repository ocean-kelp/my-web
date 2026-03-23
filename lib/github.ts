const GITHUB_USERNAME = process.env.github_username;
const GITHUB_TOKEN = process.env.github_token;

export interface Repo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  owner: {
    login: string;
  }
}

export async function getPortfolioRepos(): Promise<Repo[]> {
  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    console.error("Missing GitHub credentials in .env");
    return [];
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${GITHUB_TOKEN}`
  };

  // Fetch all repos the user has access to (including orgs), up to 100 recently updated ones
  const res = await fetch(`https://api.github.com/user/repos?type=all&sort=updated&per_page=100`, {
    headers,
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    console.error("Failed to fetch Github repos:", await res.text());
    return [];
  }

  const allRepos: Repo[] = await res.json();
  
  // Filter for repos that have the 'portfolio' topic
  const portfolioRepos = allRepos.filter(repo => 
    repo.topics && repo.topics.includes('portfolio')
  );

  return portfolioRepos;
}

export async function getRepoMarkdown(repoFullName: string): Promise<string | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
  };
  
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  // repoFullName is like "org/repo" or "user/repo"
  // Try fetching .portfolio.md first
  let res = await fetch(`https://api.github.com/repos/${repoFullName}/contents/.portfolio.md`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    // Fallback to README.md
    res = await fetch(`https://api.github.com/repos/${repoFullName}/contents/README.md`, {
      headers,
      next: { revalidate: 3600 },
    });
  }

  if (!res.ok) {
    return null;
  }

  return await res.text();
}
