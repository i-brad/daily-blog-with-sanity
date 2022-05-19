import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

function Trend({ data }: any) {
    return (
        <Link href={`/post/${data.slug.current}`} passHref>
            <a className='flex items-center pb-1 space-x-2 transition-transform duration-300 border-b border-primary hover:scale-105'>
                <img src={urlFor(data.mainImage).url()} alt="default" className="object-cover w-16 h-16 " />
                <div >
                    <h1 className='mb-1 text-sm font-medium'>{data.title}</h1>
                    <p className='text-xs'>{data.description}</p>
                </div>
            </a>
        </Link>
    )
}

export default Trend