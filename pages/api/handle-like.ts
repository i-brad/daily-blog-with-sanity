// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from "@sanity/client"

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
    const { _id } = JSON.parse(req.body);

    let data = await client.patch(_id).setIfMissing({ likes: 0 }).inc({ likes: 1 }).commit().catch(err => {
        console.error(err)
        return res.status(500).json({ message: "Error sending data" })
    })

    return res.status(200).json(data)
}
