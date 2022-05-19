import Close from '@mui/icons-material/Close'
import { useRef, useState } from 'react'

function Subscription({ handler }: any) {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false)
    let emailRef = useRef<any>(null)


    const handle = (e: any) => {
        setSubmitting(true)
        e.preventDefault()
        let data = {
            email: emailRef.current.value
        }
        console.log(data)
        fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(() => {
            setSubmitting(true)
            setSubmitted(true)
        }).catch(err => {
            console.error(err)
            setSubmitting(true)
            setSubmitted(false)
        })
    }
    return (
        <div className='fixed z-50 p-5 max-w-[98%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md top-1/2 left-1/2 h-fit w-fit'>
            <Close onClick={handler} sx={{
                width: 20, height: 20
            }} className='absolute transition-transform duration-300 ease-in-out cursor-pointer top-2 right-2 text-primary hover:scale-110 focus:scale-110' />
            {submitted ? <p className='p-3 w-full'>Thanks for subscribing to our news letter.</p> : <><h1 className='pb-2 text-sm font-medium uppercase border-b-2 border-primary'>Subscribe to our news letter</h1>
                <p className="my-2 text-sm opacity-70">Stay update with things happening around you. Be one step ahead.</p>
                <form className="flex items-end justify-center mt-5" onSubmit={handle} >
                    <label htmlFor="email_news" className="block w-full">
                        <span className="text-sm">Email Address</span>
                        <input className="block w-full px-3 py-2 mt-2 bg-gray-200 outline-none rounded-tl-md rounded-bl-md" ref={emailRef} type="email" name="email" id="email_news" placeholder="example@gmail.com" required />
                    </label>
                    <button type="submit" className="px-5 py-2 text-white transition-opacity duration-300 ease-in-out rounded-tr-md rounded-br-md h-fit bg-primary w-fit hover:bg-primary/90" disabled={submitting} style={{ opacity: submitting ? ".5" : "1" }}>{submitting ? "Subscribing" : "Subscribe"}</button>
                </form> </>}
        </div>
    )
}

export default Subscription