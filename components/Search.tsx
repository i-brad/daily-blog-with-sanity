import Close from "@mui/icons-material/Close"
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useRef } from "react"

interface Props {
    handler: () => void;
}


function Search({ handler }: Props) {
    let ref = useRef<any>(null);
    let navigate = useRouter()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        navigate.replace(`/search/${ref.current.value}`)
        handler()
    }
    return (
        <div className='fixed z-50 p-5 max-w-[98%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md top-1/2 left-1/2 h-fit w-fit'>
            <Close onClick={handler} sx={{
                width: 20, height: 20
            }} className='absolute transition-transform duration-300 ease-in-out cursor-pointer top-2 right-2 text-primary hover:scale-110 focus:scale-110' />
            <h1 className='pb-2 text-sm font-medium uppercase border-b-2 border-primary'>Search for news</h1>
            <p className="my-2 text-sm opacity-70">Search through our site for news, topics and other interesting things happening around you.</p>
            <form onSubmit={handleSubmit} className="flex items-end justify-center mt-3">
                <label htmlFor="search" className="block w-full">
                    <input ref={ref} className="block w-full px-3 py-2 bg-gray-200 outline-none rounded-tl-md rounded-bl-md" type="search" name="search" id="search" placeholder="type to search" />
                </label>
                <button type="submit" className="px-5 py-2 text-white transition-opacity duration-300 ease-in-out rounded-tr-md rounded-br-md h-fit bg-primary w-fit hover:bg-primary/90">Search</button>
            </form>
        </div>
    )
}

export default Search


export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log(context.query)

    return {
        props: {}
    }
}