import { GetStaticProps } from "next"
import { sanityClient, urlFor } from "../../sanity"
import { Post } from "../../typing";
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form";
import { Children, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/Footer";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { NextSeo } from "next-seo";

interface Props {
    post: Post,
    categories: any
}

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

function Single({ post, categories }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let [likes, setLikes] = useState(post.likes)
    const like = () => {

        fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({ _id: post._id })
        }).then((res) =>
            res.json()
        ).then(data => setLikes(data?.likes)).catch(err => {
            console.error(err)
        })
    }

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        setSubmitting(true)
        fetch("/api/createComment", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data)
            setSubmitting(true)
            setSubmitted(true)
        }).catch(err => {
            console.error(err)
            setSubmitting(true)
            setSubmitted(false)
        })
    }
    let tags: any[] = [];

    (() => {
        post?.categories?.map((cat) => {
            tags.push(cat.title)
        })
    })()
    return (
        <div>
            <NextSeo title={post.title} description={post.description} canonical={`https://dailyposts.vercel.app/post/${post.slug.current}`} openGraph={{
                title: post.title,
                description: post.description,
                url: `https://dailyposts.vercel.app/post/${post.slug.current}`,
                type: 'article',
                article: {
                    publishedTime: post._createdAt,
                    modifiedTime: post._updatedAt,
                    section: 'Technology',
                    authors: [
                        post.author.name
                    ],
                    tags: [...tags],
                },
                images: [
                    {
                        url: urlFor(post.mainImage).url(),
                        width: 850,
                        height: 650,
                        alt: post.title,
                    },
                ],
            }} />
            <main className="w-full min-h-fit">
                <img src={urlFor(post.mainImage).url()} alt="default" className="object-cover w-full max-h-40" />
                <div className="w-full min-h-screen px-5 mt-5 bg-gray-50 md:px-10">
                    <div className="relative flex flex-col items-start justify-between pb-20 space-y-10 lg:space-x-14 lg:flex-row lg:space-y-0">
                        <div className="max-w-3xl w-full mx-auto space-y-8">
                            <article className="w-full">
                                <h1 className="mb-5 text-2xl font-medium">{post.title}</h1>
                                <div className="flex justify-between items-center my-5">
                                    <div className="flex items-start justify-start  space-x-3">
                                        <img src={urlFor(post.author.image).url()} alt="author" className="object-cover w-10 h-10 rounded-full" />
                                        <span>
                                            <h2 className="font-medium opacity-90">{post.author.name}</h2>
                                            <p className="text-xs text-gray-500">Published on {new Date(post._createdAt).toLocaleString()}. Updated at {new Date(post._updatedAt).toLocaleString()}</p>
                                        </span>
                                    </div>
                                    <span className='flex items-center justify-between space-x-2'>
                                        <FavoriteBorderOutlined sx={{
                                            width: 20, height: 20
                                        }} className='transition-transform duration-300 ease-in-out cursor-pointer text-primary hover:scale-125 focus:scale-125' onClick={like} />
                                        <span className='text-xs font-medium'>{likes} likes</span>
                                    </span>
                                </div>
                                <PortableText dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} content={post.body} serializers={{
                                    normal: ({ children }: any) => {
                                        return <p className="my-7">{children}</p>
                                    },
                                    link: ({ href, children }: any) => {
                                        return <a href={href} className="text-primary underline">{children}</a>
                                    }
                                }} className="portable-text" />
                            </article>
                            <div>
                                <h1 className='pb-2 mb-3 text-sm font-medium uppercase border-b-2 border-primary'>Comments</h1>
                                {post.comments.length === 0 && <p className="my-3 text-sm opacity-80">Be the first to leave a comment.</p>}
                                <ol className="pl-4 space-y-3 list-decimal">
                                    {post.comments.map((comment) => {
                                        return <li className="p-2 bg-gray-200 rounded-md" key={comment._id}>
                                            <h2 className="text-xs font-medium opacity-50">{comment.name}</h2>
                                            <p className="text-xs opacity-50">{new Date(comment._createdAt).toLocaleString()}</p>
                                            <p className="mt-2 text-sm ">{comment.comment}</p>
                                        </li>
                                    })}

                                </ol>
                            </div>
                            {submitted ? <div className="w-full bg-primary text-white p-3">
                                <h1 className="my-1 font-medium text-base">Thanks for leaving a comment.</h1>
                                <p className="text-xs">Comment will show up once it has been approved.</p>
                            </div> : <form className="max-w-lg mt-5" onSubmit={handleSubmit(onSubmit)}>
                                <h1 className='pb-2 mb-3 text-sm font-medium uppercase border-b-2 border-primary'>Enjoyed the Article? Leave a comment</h1>
                                <input type="hidden" {...register("_id")} value={post._id} name="_id" />
                                <label htmlFor="name" className="block w-full">
                                    <span className="text-sm">Name</span>
                                    <input {...register("name", { required: true })} className="block w-full px-3 py-2 mt-2 mb-3 bg-gray-200 rounded-md outline-none" type="text" name="name" id="name" placeholder="commenter's name" />
                                    {errors.name && <p className="text-red-500 text-xs -mt-2 mb-3">This field is required</p>}
                                </label>
                                <label htmlFor="email" className="block w-full">
                                    <span className="text-sm">Email Address</span>
                                    <input {...register("email", { required: true })} className="block w-full px-3 py-2 mt-2 mb-3 bg-gray-200 rounded-md outline-none" type="email" name="email" id="email" placeholder="example@gmail.com" />
                                    {errors.email && <p className="text-red-500 text-xs -mt-2 mb-3">This field is required and must be valid</p>}
                                </label>
                                <label htmlFor="comment" className="block w-full">
                                    <span className="text-sm">Comment</span>
                                    <textarea {...register("comment", { required: true })} name="comment" id="comment" rows={8} className="block w-full px-3 py-2 mt-2 mb-3 bg-gray-200 rounded-md outline-none"></textarea>
                                    {errors.comment && <p className="text-red-500 text-xs -mt-2 mb-3">This field is required</p>}
                                </label>
                                <button type="submit" className="px-5 py-2 mt-5 text-white text-sm transition-opacity duration-300 ease-in-out rounded h-fit bg-primary w-fit hover:bg-primary/90" disabled={submitting} style={{ opacity: submitting ? ".5" : "1" }}>{submitting ? "Sending" : "Comment"}</button>
                            </form>}
                        </div>
                        <div className="lg:sticky lg:top-20 w-full h-fit block max-w-md">
                            <div>
                                <h1 className='pb-2 text-sm font-medium uppercase border-b-2 border-primary'>Discover more interesting topics</h1>
                                <div className='pt-3 space-x-2 space-y-2'>
                                    {categories.map((cat: any) => {
                                        return <Link href={`/category/${cat.title.toLowerCase()}`} passHref key={cat._id}>
                                            <a className='inline-block px-3 py-2 text-xs capitalize transition-transform duration-300 ease-in-out border-2 rounded hover:scale-110'>{cat.title}</a>
                                        </Link>
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

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: "blocking"
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
        slug: params?.slug
    })

    const categoryQuery = `*[_type == "category"]{
        _id,
        title
      }`

    const categories = await sanityClient.fetch(categoryQuery)

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
            categories
        },
        revalidate: 60
    }
}