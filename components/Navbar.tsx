import Search from '@mui/icons-material/Search'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import SearchBar from './Search'
import Subscription from './Subscription'

function Navbar() {
  let [isSearchBarActive, setSearchBarActive] = useState(false)
  let [isSubscribing, setSubscribing] = useState(false)

  const handleSearch = () => {
    setSearchBarActive(!isSearchBarActive)
  }
  const handleSubscribing = () => {
    setSubscribing(!isSubscribing)
  }
  return (
    <>
      {(isSearchBarActive || isSubscribing) && (
        <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black/30"></div>
      )}
      {isSubscribing && <Subscription handler={handleSubscribing} />}
      {isSearchBarActive && <SearchBar handler={handleSearch} />}
      <nav className="sticky top-0 z-40 w-full bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 md:px-10">
          <Link href="/" passHref>
            <a className="relative inline-block h-10 w-36">
              <Image src="/logo.svg" alt="everythingtech" layout="fill" />
              <span className="relative top-5 -right-9 text-xs font-medium text-primary">
                verythingtech
              </span>
            </a>
          </Link>
          <div className="flex items-center justify-between space-x-1 md:space-x-3">
            <button
              className="flex w-fit items-center rounded p-2 text-xs md:bg-primary/10"
              onClick={handleSearch}
            >
              <Search
                className="text-primary"
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            </button>
            <button
              onClick={handleSubscribing}
              className="rounded bg-primary px-5 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:bg-primary/90"
            >
              Subscribe
            </button>
          </div>
        </div>
        {/* <div className='w-full px-5 py-2 bg-white border-y border-primary md:px-10'>
          <ul className="flex items-center space-x-5 overflow-auto hide-scroll">
            <li>
              <Link passHref href="/">
                <a className='pb-2 text-sm font-medium transition-all duration-500 border-2 border-transparent hover:border-b-primary hover:text-primary'>Latest</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a className='pb-2 text-sm font-medium transition-all duration-500 border-2 border-transparent hover:border-b-primary hover:text-primary'>Design</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/category/asuu">
                <a className='pb-2 text-sm font-medium transition-all duration-500 border-2 border-transparent hover:border-b-primary hover:text-primary'>ASUU</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a className='pb-2 text-sm font-medium transition-all duration-500 border-2 border-transparent hover:border-b-primary hover:text-primary'>Jamb</a>
              </Link>
            </li>
            <li>
              <Link passHref href="/">
                <a className='pb-2 text-sm font-medium transition-all duration-500 border-2 border-transparent hover:border-b-primary hover:text-primary'>Fresher</a>
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    </>
  )
}

export default Navbar
