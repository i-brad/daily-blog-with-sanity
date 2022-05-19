import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className='block w-full'>
            <hr className='mt-10 border' />
            <ul className='space-x-5 space-y-3 '>
                <li className='inline-block text-xs font-medium transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100'>
                    <Link href="/" passHref >
                        <a>Help</a>
                    </Link>
                </li>
                <li className='inline-block text-xs font-medium transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100'>
                    <Link href="/" passHref >
                        <a>Become a writer</a>
                    </Link>
                </li>
                <li className='inline-block text-xs font-medium transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100'>
                    <Link href="/" passHref >
                        <a>Our story</a>
                    </Link>
                </li>
                <li className='inline-block text-xs font-medium transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100'>
                    <Link href="/" passHref >
                        <a>Support</a>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer