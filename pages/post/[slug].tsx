import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import PortableText from 'react-portable-text'
import Footer from '../../components/Footer'
import PostHeader from '../../components/PostHeader'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'

interface Props {
  post: Post
  categories: any
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

function Single({ post, categories }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  let [likes, setLikes] = useState(post.likes)
  let [liking, setLiking] = useState(false)
  const like = () => {
    setLiking(true)
    fetch('/api/handle-like', {
      method: 'POST',
      body: JSON.stringify({ _id: post._id }),
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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSubmitting(true)
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitting(true)
        setSubmitted(true)
      })
      .catch((err) => {
        console.error(err)
        setSubmitting(true)
        setSubmitted(false)
      })
  }
  let tags: any[] = []

  ;(() => {
    post?.categories?.map((cat) => {
      tags.push(cat.title)
    })
  })()
  return (
    <div>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`https://everythingtech.com.ng/post/${post.slug.current}`}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://everythingtech.com.ng/post/${post.slug.current}`,
          type: 'article',
          article: {
            publishedTime: post._createdAt,
            modifiedTime: post._updatedAt,
            section: 'Technology',
            authors: [post.author.name],
            tags: [...tags],
          },
          images: [
            {
              url: urlFor(post.mainImage).url(),
              alt: post.title,
            },
          ],
        }}
      />
      <main className="min-h-fit w-full">
        <span className="relative block h-40 w-full">
          <Image
            src={urlFor(post.mainImage).url()}
            alt="header"
            objectFit="cover"
            objectPosition="center"
            layout="fill"
            priority
          />
        </span>
        <div className="mt-5 min-h-screen w-full bg-gray-50 px-5 md:px-10">
          <div className="relative flex flex-col items-start justify-between space-y-10 pb-20 lg:flex-row lg:space-x-14 lg:space-y-0">
            <div className="mx-auto w-full max-w-3xl space-y-8">
              <article className="w-full">
                <h1 className="mb-5 text-2xl font-medium">{post.title}</h1>
                <div className="my-5 flex items-center justify-between space-x-5">
                  <PostHeader
                    author={post.author}
                    _createdAt={post._createdAt}
                    _updatedAt={post._updatedAt}
                  />
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
                      <span className="block h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent"></span>
                    )}
                    {likes > 0 && (
                      <span className="whitespace-nowrap text-xs font-medium">
                        {likes} like{likes > 1 ? 's' : ''}
                      </span>
                    )}
                  </span>
                </div>
                <PortableText
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                  content={post.body}
                  serializers={{
                    normal: ({ children }: any) => {
                      return <p className="my-7">{children}</p>
                    },
                    link: ({ href, children }: any) => {
                      return (
                        <a href={href} className="text-primary underline">
                          {children}
                        </a>
                      )
                    },
                    image: (data: any) => {
                      return (
                        <span className="relative block h-80 w-full overflow-hidden rounded-md">
                          <Image
                            src={urlFor(data).url()}
                            alt="media"
                            objectFit="cover"
                            objectPosition="center"
                            layout="fill"
                            loading="lazy"
                          />
                        </span>
                      )
                    },
                  }}
                  className="portable-text"
                />
              </article>
              <div>
                <h3 className="mb-3 border-b-2 border-primary pb-2 text-sm font-medium uppercase">
                  Comments
                </h3>
                {post.comments.length === 0 && (
                  <p className="my-3 text-sm opacity-80">
                    Be the first to leave a comment.
                  </p>
                )}
                <ol className="list-decimal space-y-3 pl-4">
                  {post.comments.map((comment) => {
                    return (
                      <li
                        className="rounded-md bg-gray-200 p-2"
                        key={comment._id}
                      >
                        <h2 className="text-xs font-medium opacity-50">
                          {comment.name}
                        </h2>
                        <p className="text-xs opacity-50">
                          {new Date(comment._createdAt).toLocaleString()}
                        </p>
                        <p className="mt-2 text-sm ">{comment.comment}</p>
                      </li>
                    )
                  })}
                </ol>
              </div>
              {submitted ? (
                <div className="w-full bg-primary p-3 text-white">
                  <h3 className="my-1 text-base font-medium">
                    Thanks for leaving a comment.
                  </h3>
                  <p className="text-xs">
                    Comment will show up once it has been approved.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-5 max-w-lg"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h4 className="mb-3 border-b-2 border-primary pb-2 text-sm font-medium uppercase">
                    Enjoyed the Article? Leave a comment
                  </h4>
                  <input
                    type="hidden"
                    {...register('_id')}
                    value={post._id}
                    name="_id"
                  />
                  <label htmlFor="name" className="block w-full">
                    <span className="text-sm">Name</span>
                    <input
                      {...register('name', { required: true })}
                      className="mt-2 mb-3 block w-full rounded-md bg-gray-200 px-3 py-2 outline-none"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="commenter's name"
                    />
                    {errors.name && (
                      <p className="mb-3 -mt-2 text-xs text-red-500">
                        This field is required
                      </p>
                    )}
                  </label>
                  <label htmlFor="email" className="block w-full">
                    <span className="text-sm">Email Address</span>
                    <input
                      {...register('email', { required: true })}
                      className="mt-2 mb-3 block w-full rounded-md bg-gray-200 px-3 py-2 outline-none"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@gmail.com"
                    />
                    {errors.email && (
                      <p className="mb-3 -mt-2 text-xs text-red-500">
                        This field is required and must be valid
                      </p>
                    )}
                  </label>
                  <label htmlFor="comment" className="block w-full">
                    <span className="text-sm">Comment</span>
                    <textarea
                      {...register('comment', { required: true })}
                      name="comment"
                      id="comment"
                      rows={8}
                      className="mt-2 mb-3 block w-full rounded-md bg-gray-200 px-3 py-2 outline-none"
                    ></textarea>
                    {errors.comment && (
                      <p className="mb-3 -mt-2 text-xs text-red-500">
                        This field is required
                      </p>
                    )}
                  </label>
                  <button
                    type="submit"
                    className="mt-5 h-fit w-fit rounded bg-primary px-5 py-2 text-sm text-white transition-opacity duration-300 ease-in-out hover:bg-primary/90"
                    disabled={submitting}
                    style={{ opacity: submitting ? '.5' : '1' }}
                  >
                    {submitting ? 'Sending' : 'Comment'}
                  </button>
                </form>
              )}
            </div>
            <div className="block h-fit w-full max-w-md lg:sticky lg:top-20">
              <div>
                <h2 className="border-b-2 border-primary pb-2 text-sm font-medium uppercase">
                  Discover more interesting topics
                </h2>
                <div className="space-x-2 space-y-2 pt-3">
                  {categories.map((cat: any) => {
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
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Single

export const getStaticPaths = async () => {
  const query = `*[_type == post]{
        _id, slug {current}
    }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author ->{
            name,
            image
        },
        'comments': *[_type == "comment" && post._ref == ^._id && approved == true]{
            _id,
            name,
            comment,
            _createdAt
        },
        description,
        mainImage,
        slug,
        body,
        likes,
        _updatedAt,
        categories[] -> {
            _id,
            title,
          }
    }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  const categoryQuery = `*[_type == "category"]{
        _id,
        title
      }`

  const categories = await sanityClient.fetch(categoryQuery)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      categories,
    },
    revalidate: 60,
  }
}
