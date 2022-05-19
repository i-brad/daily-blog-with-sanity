import React from 'react'
import Navbar from './Navbar'

function Layout({ children }: any) {
    return (
        <section className="min-h-screen bg-gray-50 relative">
            <Navbar />
            <main>
                {children}
            </main>
        </section>
    )
}

export default Layout