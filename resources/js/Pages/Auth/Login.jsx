import { FaBook } from "react-icons/fa";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import { Link, useForm } from "@inertiajs/react";

const Login = () => {

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
      })

    const save = (e) => {
        e.preventDefault();
        post('auth/authenticate')
    }

    return (
        <>
            <main className=" w-full min-h-screen h-auto flex items-center justify-center">
                <div>
                    <div className=" flex items-center flex-col mb-7 px-10">
                        <FaBook className=" text-4xl text-accent mb-2" />
                        <h1 className=" font-bold text-lg tracking-normal">Signin to Access your Account</h1>
                    </div>
                    <form onSubmit={save}>
                        <div className="mb-5" >
                            <Input type="text" value={data.username} onChange={e => setData('username', e.target.value)} placeholder="Username"/>
                        </div>
                        <div className="mb-5" >
                            <Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} placeholder="Password" />
                        </div>
                        <div>
                            <Button type="submit" className=" btn-accent w-full mb-1">Login</Button>
                            <div className=" flex items-center justify-end">
                                <p className=" text-xs">Don't have an account? <Link href="/signup" className="text-accent hover:underline">Create Account</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login;