import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className='block w-full'>
            <hr className='mt-10 border' />
            <ul className='space-x-5 space-y-3 '>
                <li className='inline-block text-xs font-medium transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100'>
                    <Link href="/writer" passHref >
                        <a>Become a writer</a>
                    </Link>
                </li>
            </ul>
            <p className="mt-2 text-xs opacity-70">Copyright &copy;. All rights reserved&#174;.</p>
        </footer>
    )
}

export default Footer