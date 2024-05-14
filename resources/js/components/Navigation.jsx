import { Link } from "@inertiajs/react";
import { FaBookBookmark } from "react-icons/fa6";

const Navigation = ({ user }) => {
    return (
        <>
            <div className="py-1 bg-accent" >
                <div className=" max-w-[1300px] w-[95%] mx-auto flex items-center justify-between">
                    <div className="">
                        <a className=" text-xl font-bold flex items-center gap-1"><FaBookBookmark className=" text-lg" />YNotes</a>
                    </div>
                    <div className="">
                        <p className=" text-sm tracking-wide">Welcome <span className=" capitalize font-bold">{user}!</span></p>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li>
                                <Link href="auth/logout" method="delete">Logout</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation;