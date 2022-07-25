import { GithubListResponse } from "../types/github"

interface GetGithubRepoProps {
    per_page?: number;
    page?: number;
    language?: string;
}

export const getGithubRepos = ({per_page = 30, page = 1, language}: GetGithubRepoProps): Promise<GithubListResponse> => {
    return fetch(`/api/trends?per_page=${per_page}&page=${page}&language=${language}`)
    .then((response) => response.json())
}