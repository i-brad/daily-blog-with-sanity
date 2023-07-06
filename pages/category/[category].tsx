import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import Card from '../../components/Card'
import { sanityClient } from '../../sanity'

function Category({ posts }: any) {
  let params = useRouter()
  //console.log(posts)
  return (
    <div className="relative">
      <NextSeo
        title={`Category - ${params.query.category?.toString()} | Evertthingtech`}
        description="Discover the latest in cutting-edge technology and stay ahead of the game with our 
        comprehensive tech website. Explore insightful articles, expert reviews, aand up-to-the-minute
        news on gadgets, software, AI, and more. Unlock the power of innovation and fuel your curiosity with our trusted source for all things tech. Visist us now and elevate your tech knowledge
        to new heights. Get news ranging from different topics like, technology, design, hacks, business and more"
        canonical={`https://dixcovery.vercel.app/category/${params.query.category?.toString()}`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${params.query.category?.toString()}, news, blog, post, everythingtech post, everythingtech news, everythingtech, strike, nigeria news, news website, tech, Technology news, Tech blog, Gadgets and devices, Software development, IT solutions, Tech industry updates, Artificial intelligence (AI), Cybersecurity, Mobile apps, Cloud computing, Internet of Things (IoT), Data analytics, Web development, Tech reviews, Tech tutorials, Tech trends, Tech events, Tech startups, Tech innovations, Digital transformation `,
          },
        ]}
      />
      <div className="relative p-5 md:px-10">
        <p className="text-sm font-medium capitalize opacity-70">
          Category &gt; {params.query.category}
        </p>
        <div className="mt-5">
          {posts.length > 0 ? (
            <div className="mb-28 grid min-h-screen w-full grid-cols-1 place-items-start gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => {
                return <Card key={post._id} data={post} />
              })}
            </div>
          ) : (
            <p className="text-center text-sm">
              No post found in this category
            </p>
          )}
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
      category: category.title,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
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
    category: params?.category,
  })

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}
