import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { urlFor } from '../sanity'

function Card({ data }: any) {
  let [likes, setLikes] = useState(data.likes)
  let [liking, setLiking] = useState(false)
  const like = () => {
    setLiking(true)
    fetch('/api/handle-like', {
      method: 'POST',
      body: JSON.stringify({ _id: data._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLikes(data?.likes)
        setLiking(false)
      })
      .catch((err) => {
        // console.error(err)
        setLiking(false)
      })
  }
  return (
    <div className="group w-full border-b border-primary pb-5 transition-transform ease-in-out">
      {/* <img
        src={urlFor(data.mainImage).url()}
        alt="default"
        className="object-cover w-full mx-auto duration-300 h-60 group-hover:scale-105"
      /> */}
      <span className="relative mx-auto block h-60 w-full duration-300 group-hover:scale-105">
        <Image
          src={urlFor(data.mainImage).url()}
          alt="thumbnail"
          loading="lazy"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </span>
      <h1 className="text-md border-y border-primary py-2 font-medium md:text-lg">
        {data.title}
      </h1>
      <p className="my-3 text-xs">{data.description}</p>
      <p className="my-2 w-fit space-x-2 text-xs font-medium opacity-50">
        {data.categories.map((cat: any) => {
          return <span key={cat._id}>#{cat.title}</span>
        })}
      </p>
      <p className="text-xs font-medium opacity-70">
        Created on {new Date(data._createdAt).toLocaleString()}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <Link href={`/post/${data.slug.current}`} passHref>
          <a className="text-xs font-medium underline opacity-70 duration-300 hover:opacity-100">
            Read
          </a>
        </Link>
        <span className="flex items-center justify-between space-x-2">
          {!liking ? (
            <FavoriteBorderOutlined
              sx={{
                width: 20,
                height: 20,
              }}
              className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-125 focus:scale-125"
              onClick={like}
            />
          ) : (
            <span className="block h-5 w-5 animate-pulse rounded-full bg-primary/50"></span>
          )}
          <span className="text-xs font-medium">{likes} likes</span>
        </span>
      </div>
    </div>
  )
}

export default Card
