import { useRouter } from 'next/router'
import { GetStaticProps } from "next"
import React from 'react'
import Card from '../../components/Card'
import { sanityClient } from '../../sanity'
import { NextSeo } from 'next-seo'

function Category({ posts }: any) {
    let params = useRouter()
    //console.log(posts)
    return (
        <div className='relative'>
            <NextSeo title={`Category - ${params.query.category?.toString()} | Daily`} description='Get news ranging from different topics like, technology, design, hacks, business and more' canonical={`https://dailyposts.vercel.app/category/${params.query.category?.toString()}`} additionalMetaTags={[
                { name: "keywords", content: `${params.query.category?.toString()}, news, blog, post, daily post, daily news, daily, strike, nigeria news, news website` }
            ]} />
            <div className='relative md:px-10 p-5'>
                <p className='text-xs font-medium capitalize'>Category &gt; {params.query.category}</p>
                <div className='mt-5'>
                    {posts.length > 0 ? <div className="grid w-full min-h-screen grid-cols-1 gap-10 mb-28 sm:grid-cols-2 lg:grid-cols-3 place-items-start">
                        {posts.map((post: any) => {
                            return <Card key={post._id} data={post} />
                        })}
                    </div> : <p className='text-sm text-center'>No post found in this category</p>}
                </div>
            </div>
        </div>
    )
}

export default Category

export const getStaticPaths = async () => {
    const categoryQuery = `*[_type == "category"]{
        title
      }`

    const categories = await sanityClient.fetch(categoryQuery)
    const paths = categories.map((category: any) => ({
        params: {
            category: category.title
        }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && $category in categories[]->title]{
        _id,
        _createdAt,
        title,
        categories[] -> {
            _id,
            title,
          },
        description,
        mainImage,
        slug,
        likes
    }`

    const posts = await sanityClient.fetch(query, {
        category: params?.category
    })


    if (!posts) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            posts,
        },
        revalidate: 60
    }
}