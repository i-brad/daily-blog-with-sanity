import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

function Trend({ data }: any) {
  return (
    <Link href={`/post/${data.slug.current}`} passHref>
      <a className="flex items-center space-x-2 border-b border-primary pb-1 transition-transform duration-300 hover:scale-105">
        <span className="relative block h-16 w-16">
          <Image
            src={urlFor(data.mainImage).url()}
            alt="trend"
            layout="fill"
            loading="lazy"
            objectPosition="center"
            objectFit="cover"
          />
        </span>
        <div>
          <h1 className="mb-1 text-sm font-medium">{data.title}</h1>
          <p className="text-xs">{data.description}</p>
        </div>
      </a>
    </Link>
  )
}

export default Trend
