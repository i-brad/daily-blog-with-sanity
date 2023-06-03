import Close from '@mui/icons-material/Close'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useRef } from 'react'

interface Props {
  handler: () => void
}

function Search({ handler }: Props) {
  let ref = useRef<any>(null)
  let navigate = useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    navigate.replace(`/search/${ref.current.value}`)
    handler()
  }
  return (
    <div className="fixed top-1/2 left-1/2 z-50 h-44 w-full max-w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow-md md:w-96 md:max-w-full lg:h-48 lg:w-[30rem]">
      <Close
        onClick={handler}
        sx={{
          width: 20,
          height: 20,
        }}
        className="absolute top-2 right-2 cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110"
      />
      <h1 className="border-b-2 border-primary pb-2 text-sm font-medium uppercase">
        Search for news
      </h1>
      <p className="my-2 text-xs opacity-70">
        Search through our site for news, topics and other interesting things
        happening around you.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-3 flex items-end justify-center"
      >
        <label htmlFor="search" className="block w-full">
          <input
            ref={ref}
            className="block w-full rounded-tl-md rounded-bl-md bg-gray-200 px-3 py-2 outline-none"
            type="search"
            name="search"
            id="search"
            placeholder="type to search"
          />
        </label>
        <button
          type="submit"
          className="h-fit w-fit rounded-tr-md rounded-br-md bg-primary px-5 py-2 text-white transition-opacity duration-300 ease-in-out hover:bg-primary/90"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search
