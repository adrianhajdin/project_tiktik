import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const query = singleUserQuery(id);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);

    const data = { user: user[0], userVideos, userLikedVideos };

    res.status(200).json(data);
  }
}
