import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity'

function PostHeader({ author, _createdAt, _updatedAt }: any) {
  return (
    <div className="flex items-start justify-start space-x-3">
      <span className="relative block h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={urlFor(author.image).url()}
          alt="author"
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          loading="lazy"
        />
      </span>
      <span>
        <h2 className="font-medium opacity-90">{author.name}</h2>
        <p className="text-xs text-gray-500">
          Published on {new Date(_createdAt).toDateString()}. Updated at{' '}
          {new Date(_updatedAt).toDateString()}
        </p>
      </span>
    </div>
  )
}

export default PostHeader
