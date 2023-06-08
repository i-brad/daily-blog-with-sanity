import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ReactGA from 'react-ga4'
import Layout from '../components/Layout'
import '../styles/globals.css'

ReactGA.initialize(process.env.NEXT_PUBLIC_MEASUREMENT_ID as string)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DefaultSeo
        title="Dixcovery - News, tips, updates and more"
        description="Get news ranging from different topics like, technology, design, hacks, business and more"
        canonical="https://dixcovery.vercel.app/"
        openGraph={{
          type: 'website',
          site_name: 'Dixcovery',
          url: 'https://dixcovery.vercel.app/',
          images: [
            {
              url: 'https://dixcovery.vercel.app/absolutvision-WYd_PkCa1BY-unsplash.jpg',
              alt: 'news',
              type: 'image/jpeg',
            },
          ],
          description:
            'Get news ranging from different topics like, technology, design, hacks, business and more',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              ' news, blog, posts, dixcovery post, dixcovery news, dixcovery, strike, nigeria news, news website, blog posts, discovery news, discovery',
          },
        ]}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
