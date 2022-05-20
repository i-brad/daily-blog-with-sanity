import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DefaultSeo title='Daily - News, tips, updates and more' description='Get news ranging from different topics like, technology, design, hacks, business and more' canonical='https://dailyposts.vercel.app/' openGraph={{
        type: 'website',
        site_name: 'Daily',
        url: "https://dailyposts.vercel.app/",
        images: [
          {
            url: 'https://dailyposts.vercel.app/absolutvision-WYd_PkCa1BY-unsplash.jpg',
            width: 800,
            height: 600,
            alt: 'news',
            type: 'image/jpeg',
          },
        ],
        description: "Get news ranging from different topics like, technology, design, hacks, business and more"
      }} additionalMetaTags={[
        { name: "keywords", content: " news, blog, post, daily post, daily news, daily, strike, nigeria news, news website" }
      ]} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
