import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

function Trend({ data }: any) {
  return (
    <Link href={`/post/${data.slug.current}`} passHref>
      <a className="flex items-center space-x-2 border-b border-primary pb-1 transition-transform duration-300 hover:scale-105">
        <span className="relative block h-16 w-[4rem]">
          <Image
            src={urlFor(data.mainImage).url()}
            alt="trend"
            layout="fill"
            loading="lazy"
            objectPosition="center"
            objectFit="cover"
          />
        </span>
        <div className="w-full flex-1 overflow-hidden">
          <h2
            className="mb-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium"
            title={data.title}
          >
            {data.title}
          </h2>
          <p
            className="block whitespace-normal text-xs"
            title={data.description}
          >
            {data.description}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default Trend
