import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Trend from '../components/Trend'
import { sanityClient } from '../sanity'
import { Post, Trends } from '../typing'

interface Props {
  posts: [Post];
  trends: [Trends],
  categories: [{
    _id: string;
    title: string;
  }];
}

const Home = ({ posts, trends, categories }: Props) => {

  return (
    <div className="relative max-w-7xl w-full">
      <div className='relative flex flex-col-reverse px-5 md:px-10 mt-5 lg:space-x-10 lg:flex-row w-full'>
        <div className="grid w-full min-h-screen grid-cols-1 gap-10 mb-28 sm:grid-cols-2 lg:max-w-6xl place-items-start">
          {posts.map((post) => {
            return <Card key={post._id} data={post} />
          })}
        </div>
        <div className='relative top-0 w-full md:max-w-sm min-h-fit lg:mb-40 mb-10 space-y-5'>
          {trends.length > 0 && <div>
            <h1 className='pb-2 text-sm font-medium uppercase border-b-2 border-primary'>Trending Posts</h1>
            <div className='pt-3 mb-10 space-y-4'>
              {trends.map((post) => {
                return <Trend key={post._id} data={post} />
              })}
            </div>
          </div>}
          <div className='sticky w-full top-24 h-fit'>
            <h1 className='pb-2 text-sm font-medium uppercase border-b-2 border-primary'>Discover interesting topics</h1>
            <div className='pt-3 space-x-2 space-y-2'>
              {categories.map((cat) => {
                return <Link href={`/category/${cat.title.toLowerCase()}`} passHref key={cat._id}>
                  <a className='inline-block px-3 py-2 text-xs capitalize transition-transform duration-300 ease-in-out border-2 rounded hover:scale-110'>{cat.title}</a>
                </Link>
              })}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home

export const getServerSideProps = async () => {
  const postQuery = `*[_type == "post"]{
    _id,
    title,
    categories[] -> {
      _id,
      title,
    },
    description,
    mainImage,
    slug,
    _createdAt,
    likes
  }`

  const posts = await sanityClient.fetch(postQuery);

  const trendQuery = `*[_type == "post" && likes >= 10]{
    _id,
    title,
    description,
    slug,
    mainImage
  }`

  const trends = await sanityClient.fetch(trendQuery)

  const categoryQuery = `*[_type == "category"]{
    _id,
    title
  }`

  const categories = await sanityClient.fetch(categoryQuery)

  return {
    props: {
      posts,
      trends,
      categories
    }
  }
}