import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string;
    email: string;
    why: string;
}

export default function Writer() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        setSubmitting(true)
        fetch("/api/writer", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data)
            setSubmitting(true)
            setSubmitted(true)
        }).catch(err => {
            console.error(err)
            setSubmitting(true)
            setSubmitted(false)
        })
    }

    return (
        <section className="min-h-screen pb-10 text-white bg-primary pt-14">
            <div className='flex flex-col justify-start max-w-xl mx-auto text-center'>
                <h1 className="text-5xl font-medium md:text-6xl">Become a writer doing what you love</h1>
                <p className='my-5 text-sm opacity-70'>If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. </p>
            </div>
            {submitted ? <div className="max-w-lg p-3 mx-auto bg-white rounded-md text-primary">
                <h3 className="my-1 text-base font-medium">Thanks for wanting to become a writer with us.</h3>
                <p className="text-xs">We will go through your submission and contact you if you got accepted or rejected.</p>
            </div> : <form className="max-w-lg p-3 mx-auto mt-5 bg-white rounded-md text-primary" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" className="block w-full">
                    <span className="text-sm">Name</span>
                    <input {...register("name", { required: true })} className="block w-full px-3 py-2 mt-2 mb-3 text-black bg-gray-200 rounded-md outline-none" type="text" name="name" id="name" placeholder="name" />
                    {errors.name && <p className="mb-3 -mt-2 text-xs text-red-500">This field is required</p>}
                </label>
                <label htmlFor="email" className="block w-full">
                    <span className="text-sm">Email Address</span>
                    <input {...register("email", { required: true })} className="block w-full px-3 py-2 mt-2 mb-3 text-black bg-gray-200 rounded-md outline-none" type="email" name="email" id="email" placeholder="example@gmail.com" />
                    {errors.email && <p className="mb-3 -mt-2 text-xs text-red-500">This field is required and must be valid</p>}
                </label>
                <label htmlFor="why" className="block w-full">
                    <span className="text-sm">Why do you want to be a writer with us?</span>
                    <textarea {...register("why", { required: true })} name="why" id="why" rows={8} className="block w-full px-3 py-2 mt-2 mb-3 text-black bg-gray-200 rounded-md outline-none"></textarea>
                    {errors.why && <p className="mb-3 -mt-2 text-xs text-red-500">This field is required</p>}
                </label>
                <button type="submit" className="px-5 py-2 mt-5 text-sm text-white transition-opacity duration-300 ease-in-out rounded h-fit bg-primary w-fit hover:bg-primary/90" disabled={submitting} style={{ opacity: submitting ? ".5" : "1" }}>{submitting ? "Submitting" : "Submit"}</button>
            </form>}
        </section >
    )
}
