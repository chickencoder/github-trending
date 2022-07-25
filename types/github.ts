export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

export type GithubListResponse = {
  total_count: number;
  items: [GithubRepo];
  incomplete_results: boolean;
}