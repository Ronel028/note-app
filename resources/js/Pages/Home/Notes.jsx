import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { LuPencilLine } from "react-icons/lu";
import empty from "../../assets/empty.png";
import Navigation from "../../components/Navigation";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
const Notes = (props) => {

    const [showCreateModal, setShowCreateModal] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
      })

    const save = (e) => {
        e.preventDefault();
        post('/create', {
            onSuccess: () => {
                reset();
                setShowCreateModal(false);
                toast.success("New Notes Successful.");
            }
        })
    }

    useEffect(() => {
        console.log(props);
    }, [])

    function limitText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <>
        <div>
            <ToastContainer 
                position="top-right"
                autoClose={5000} 
                closeOnClick
            />
            <Navigation user={props.auth.username} />
            <main className=" mt-3">
                <div className="max-w-[1300px] w-[95%] mx-auto">
                    <div className=" flex items-center justify-end mb-3">
                        <Button onClick={() => setShowCreateModal(true)} className="btn-accent"><LuPencilLine />Create</Button>
                    </div>

                    {
                        props.notes.length > 0 ?  <div className=" grid grid-cols-3 gap-2">
                        {
                            props.notes.map(note => {
                                return (
                                    <div key={note.id} className="card w-full bg-base-100 border border-accent shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{note.title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: limitText(note.content, 20) }} />
                                            <div className="card-actions justify-end">
                                                <Button className=" btn-accent">View</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> : <div className=" flex flex-col items-center justify-center">
                                <img src={empty} alt="empty" className="w-[30rem]" />
                                <p className=" text-2xl font-bold">Time to create notes!</p>
                            </div>
                    }

                </div>
            </main>
        </div>

        {/* CREATE MODAL START */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog open={showCreateModal} className="modal bg-white bg-opacity-40">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg mb-4">New Notes</h3>
                <div className="">
                    <form onSubmit={save}>
                        <div className=" mb-3">
                            <div className=" mb-3">
                                <Input type="text" placeholder="Title" value={data.title} onChange={e => setData('title', e.target.value)} />
                                <p className=" text-red-500 italic text-xs mt-1">{errors.title}</p>
                            </div>
                            <div>
                                <ReactQuill theme="snow" value={data.content} onChange={e =>  setData('content', e)} placeholder="Type your new ideas here..." />
                                <p className=" text-red-500 italic text-xs mt-1">{errors.content}</p>
                            </div>
                        </div>
                        <div className=" flex items-center justify-end gap-2">
                            <Button type="button" onClick={() => setShowCreateModal(false)} className="btn-error">Close</Button>
                            <Button type="submit" className="btn-accent">Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
        {/* CREATE MODAL END */}
        </>
    )
}

export default Notes;