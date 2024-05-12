import { FaBook } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react'
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";

const Signup = () => {

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        retypePassword: '',
      })

    const save = (e) => {
        e.preventDefault();
        post('auth/signup')
    }

    return (
        <>
            <main className=" w-full min-h-screen h-auto flex items-center justify-center">
                <div className=" ">
                    <div className=" flex items-center flex-col mb-7 px-10">
                        <FaBook className=" text-4xl text-accent mb-2" />
                        <h1 className=" font-bold text-lg tracking-normal">Register to create your account</h1>
                    </div>
                    <form onSubmit={save}>
                        <div className="mb-5" >
                            <Input type="text" value={data.username} onChange={e => setData('username', e.target.value)} placeholder="Username"/>
                            <p className=" text-red-500 italic text-xs">{errors.username}</p>
                        </div>
                        <div className="mb-5" >
                            <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="Email Address"/>
                            <p className=" text-red-500 italic text-xs">{errors.email}</p>
                        </div>
                        <div className="mb-5" >
                            <Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} placeholder="Password" />
                            <p className=" text-red-500 italic text-xs">{errors.password}</p>
                        </div>
                        <div className="mb-5" >
                            <Input type="password" value={data.retypePassword} onChange={e => setData('retypePassword', e.target.value)} placeholder="Re-type password" />
                        </div>
                        <div>
                            <Button type="submit" className=" btn-accent w-full mb-1">Signup</Button>
                            <div className=" flex items-center justify-end">
                                <p className=" text-xs">Have an account? <Link href="/login" className="text-accent hover:underline">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Signup;