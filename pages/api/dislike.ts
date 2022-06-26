import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { userId, postId } = req.body;

    const data = await client
      .patch(postId)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();
    res.status(200).json(data);
  }
}
