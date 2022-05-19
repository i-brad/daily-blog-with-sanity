import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import { urlFor } from '../sanity'

function Card({ data }: any) {
    let [likes, setLikes] = useState(data.likes)
    const like = () => {

        fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({ _id: data._id })
        }).then((res) =>
            res.json()
        ).then(data => setLikes(data?.likes)).catch(err => {
            console.error(err)
        })
    }
    return (
        <div className='w-full pb-5 transition-transform ease-in-out border-b border-primary group'>
            <img src={urlFor(data.mainImage).url()} alt="default" className="object-cover w-full mx-auto duration-300 h-60 group-hover:scale-105" />
            <h1 className='py-2 font-medium text-md border-y border-primary md:text-lg'>{data.title}</h1>
            <p className='my-3 text-xs'>{data.description}</p>
            <p className='my-2 space-x-2 text-xs font-medium opacity-50 w-fit'>{data.categories.map((cat: any,) => {
                return <span key={cat._id}>#{cat.title}</span>
            })}</p>
            <p className='text-xs font-medium opacity-70'>Created on {new Date(data._createdAt).toLocaleString()}</p>
            <div className='flex items-center justify-between mt-2'>
                <Link href={`/post/${data.slug.current}`} passHref>
                    <a className='text-xs font-medium duration-300 opacity-70 hover:opacity-100 underline'>Read</a>
                </Link>
                <span className='flex items-center justify-between space-x-2'>
                    <FavoriteBorderOutlined sx={{
                        width: 20, height: 20
                    }} className='transition-transform duration-300 ease-in-out cursor-pointer text-primary hover:scale-125 focus:scale-125' onClick={like} />
                    <span className='text-xs font-medium'>{likes} likes</span>
                </span>
            </div>
        </div>
    )
}

export default Card
