// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient  from "@sanity/client"

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion: '2021-10-21',
    token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {email} = JSON.parse(req.body);
  try {
      await client.create({
          _type: "subscribers",
          email,
      })
  } catch (error) {
      return res.status(500).json({message: "Couldn't carry out user subscription"})
  }

  return res.status(200).json({message: "subscription successful"})
}
