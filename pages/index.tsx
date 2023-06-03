import Link from 'next/link'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Trend from '../components/Trend'
import { sanityClient } from '../sanity'
import { Post, Trends } from '../typing'

interface Props {
  posts: [Post]
  trends: [Trends]
  categories: [
    {
      _id: string
      title: string
    }
  ]
}

const Home = ({ posts, trends, categories }: Props) => {
  return (
    <div className="relative w-full max-w-7xl">
      <div className="relative mt-5 flex w-full flex-col px-5 md:px-10 lg:flex-row lg:space-x-10">
        <div className="mb-28 grid min-h-screen w-full grid-cols-1 place-items-start gap-10 sm:grid-cols-2 lg:max-w-6xl">
          {posts.map((post) => {
            return <Card key={post._id} data={post} />
          })}
        </div>
        <div className="relative top-0 mb-10 min-h-fit w-full space-y-5 md:max-w-sm lg:mb-40">
          {trends.length > 0 && (
            <div>
              <h2 className="border-b-2 border-primary pb-2 text-sm font-medium uppercase">
                Trending Posts
              </h2>
              <div className="mb-10 space-y-4 pt-3">
                {trends.map((post) => {
                  return <Trend key={post._id} data={post} />
                })}
              </div>
            </div>
          )}
          <div className="sticky top-24 h-fit w-full">
            <h2 className="border-b-2 border-primary pb-2 text-sm font-medium uppercase">
              Discover interesting topics
            </h2>
            <div className="space-x-2 space-y-2 pt-3">
              {categories.map((cat) => {
                return (
                  <Link
                    href={`/category/${cat.title.toLowerCase()}`}
                    passHref
                    key={cat._id}
                  >
                    <a className="inline-block rounded border-2 px-3 py-2 text-xs capitalize transition-transform duration-300 ease-in-out hover:scale-110">
                      {cat.title}
                    </a>
                  </Link>
                )
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

  const posts = await sanityClient.fetch(postQuery)

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
      categories,
    },
  }
}
