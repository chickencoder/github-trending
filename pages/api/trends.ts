import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GithubListResponse } from '../../types/github';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GithubListResponse>
) {
  const { per_page, page, language } = req.query;
  const date = moment().subtract(7, 'd').format('YYYY-MM-DD');

  let query = `q=created:>${date}`;

  if (language) {
    query += ` language:${language}`;
  }

  return fetch(`${process.env.GITHUB_API}/search/repositories?${query}&sort=stars&order=desc&per_page=${per_page}&page=${page}`, {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    }
  })
  .then((response) => response.json())
  .then((data) => {
      res.status(200).json(data)
  })
}
