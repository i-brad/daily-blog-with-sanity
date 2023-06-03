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
        title={`Category - ${params.query.category?.toString()} | Dixcovery`}
        description="Get news ranging from different topics like, technology, design, hacks, business and more"
        canonical={`https://dixcovery.vercel.app/category/${params.query.category?.toString()}`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${params.query.category?.toString()}, news, blog, post, dixcovery post, dixcovery news, dixcovery, strike, nigeria news, news website`,
          },
        ]}
      />
      <div className="relative p-5 md:px-10">
        <p className="text-xs font-medium capitalize">
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
