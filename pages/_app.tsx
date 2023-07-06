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
        title="Everythingtech - Tech News, Tech trends, Tech Startups, Paid Internship Opportunities and more"
        description="Discover the latest in cutting-edge technology and stay ahead of the game with our 
        comprehensive tech website. Explore insightful articles, expert reviews, and up-to-the-minute
        news on gadgets, software, AI, and more. Unlock the power of innovation and fuel your curiosity with our trusted source for all things tech. Visit us now and elevate your tech knowledge
        to new heights. Get news ranging from different topics like, technology, design, hacks, business and more .Get news ranging from different topics like technology, design, hacks, business and more"
        canonical="https://everythingtech.com.ng/"
        openGraph={{
          type: 'website',
          site_name: 'Everythingtech',
          url: 'https://everythingtech.com.ng',
          images: [
            {
              url: 'https://dixcovery.vercel.app/absolutvision-WYd_PkCa1BY-unsplash.jpg',
              alt: 'news',
              type: 'image/jpeg',
            },
          ],
          description:
            "Discover the latest in cutting-edge technology and stay ahead of the game with our 
        comprehensive tech website Explore insightful articles expert reviews and up-to-the-minute
        news on gadgets software AI and more Unlock the power of innovation and fuel your curiosity with our trusted source for all things tech Visist us now and elevate your tech knowledge
        to new heights Get news ranging from different topics like technology design hacks business and more Get news ranging from different topics like technology design hacks business and more",
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              ' Technology news, Tech blog, Gadgets and devices, Software development, IT solutions, Tech industry updates, Artificial intelligence (AI), Cybersecurity, Mobile apps, Cloud computing, Internet of Things (IoT), Data analytics, Web development, Tech reviews, Tech tutorials, Tech trends, Tech events, Tech startups, Tech innovations, Digital transformation ',
          },
        ]}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
