import Close from '@mui/icons-material/Close'
import { useRef, useState } from 'react'

function Subscription({ handler }: any) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  let emailRef = useRef<any>(null)

  const handle = (e: any) => {
    setSubmitting(true)
    e.preventDefault()
    let data = {
      email: emailRef.current.value,
    }
    // console.log(data)
    fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitting(true)
        setSubmitted(true)
      })
      .catch((err) => {
        // console.error(err)
        setSubmitting(true)
        setSubmitted(false)
      })
  }
  return (
    <div className="fixed top-1/2 left-1/2 z-50 h-44 w-full max-w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow-md md:w-96 md:max-w-full lg:h-56 lg:w-[28rem]">
      <Close
        onClick={handler}
        sx={{
          width: 20,
          height: 20,
        }}
        className="absolute top-2 right-2 cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110"
      />
      {submitted ? (
        <p className="w-full p-3">Thanks for subscribing to our news letter.</p>
      ) : (
        <>
          <h1 className="border-b-2 border-primary pb-2 text-sm font-medium uppercase">
            Subscribe to our news letter
          </h1>
          <p className="my-2 text-sm opacity-70">
            Stay update with things happening around you. Be one step ahead.
          </p>
          <form
            className="mt-5 flex items-end justify-center"
            onSubmit={handle}
          >
            <label htmlFor="email_news" className="block w-full">
              <span className="text-sm">Email Address</span>
              <input
                className="mt-2 block w-full rounded-tl-md rounded-bl-md bg-gray-200 px-3 py-2 outline-none"
                ref={emailRef}
                type="email"
                name="email"
                id="email_news"
                placeholder="example@gmail.com"
                required
              />
            </label>
            <button
              type="submit"
              className="h-fit w-fit rounded-tr-md rounded-br-md bg-primary px-5 py-2 font-medium text-white transition-opacity duration-300 ease-in-out hover:bg-primary/90"
              disabled={submitting}
              style={{ opacity: submitting ? '.5' : '1' }}
            >
              {submitting ? 'Subscribing' : 'Subscribe'}
            </button>
          </form>{' '}
        </>
      )}
    </div>
  )
}

export default Subscription
