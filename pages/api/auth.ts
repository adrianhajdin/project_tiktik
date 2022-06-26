import type { NextApiRequest, NextApiResponse } from 'next';

import { allUsersQuery } from './../../utils/queries';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const doc = JSON.parse(req.body);

    client.createIfNotExists(doc).then(() => {
      res.status(200).json('Login successful');
    });
  } else if (req.method === 'GET') {
    const data = await client.fetch(allUsersQuery());
    res.status(200).json(data);
  }
}
