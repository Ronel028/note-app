import { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import moment from "moment";
import axios from "../../utils/apiService/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { LuPencilLine } from "react-icons/lu";
import empty from "../../assets/empty.png";
import Navigation from "../../components/Navigation";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";

function limitText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

const Notes = (props) => {

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [notesContent, setNotesContent] = useState({
        id: '',
        title: '',
        content: ''
    })
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
      })

    const save = (e) => {
        e.preventDefault();
        post('/create', {
            onSuccess: () => {
                reset('title', 'content')
                setShowCreateModal(false);
                toast.success("New Notes Successful.");
            }
        })
    }

    const update = (e) => {
        e.preventDefault();
        router.post(`/update`, notesContent, {
            onSuccess: (response) => {
                console.log(response);
                reset('id','title', 'content')
                setShowEditModal(false);
                toast.success("Notes Updated.");
            }
        })
    }

    const fetch = async(id) => {
        let response = await axios.get(`/fetch/${id}`);
        setNotesContent({
            ...notesContent,
            id: id,
            title: response.data.title,
            content: response.data.content,
        })
        setShowViewModal(true)
      
    }

    const fetchEdit = async(id) => {
        setNotesContent({
            ...notesContent,
            id: '',
            title: '',
            content: ''
        })
        let response = await axios.get(`/fetch/${id}`);
        setNotesContent({
            ...notesContent,
            id: id,
            title: response.data.title,
            content: response.data.content,
        })
        setShowEditModal(true)
      
    }

    // useEffect(() => {
    //     console.log(props);
    // }, [])

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
                                    <div key={note.id} className="card rounded w-full bg-base-100 border border-accent shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{note.title}</h2>
                                            <div className="badge badge-neutral text-xs rounded">
                                                {moment(note.created_at).format('LL')}
                                            </div>
                                            <div className="truncate h-5 w-full line-clamp-1  mb-3">
                                                <div className="" dangerouslySetInnerHTML={{ __html: note.content }} />
                                            </div>
                                            <div className="card-actions justify-end">
                                                <Button type="button" onClick={() => fetchEdit(note.id)} className=" btn-primary">Edit</Button>
                                                <Button type="button" onClick={() => fetch(note.id)} className=" btn-accent">View</Button>
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
        <dialog open={showCreateModal} className="modal bg-white bg-opacity-60">
            <div className="modal-box w-11/12 max-w-5xl border border-accent">
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

         {/* EDIT MODAL START */}
         <dialog open={showEditModal} className="modal bg-white bg-opacity-60">
            <div className="modal-box w-11/12 max-w-5xl border border-accent">
                <h3 className="font-bold text-lg mb-4">Edit Notes</h3>
                <div className="">
                    <form onSubmit={update}>
                        <div className=" mb-3">
                            <div className=" mb-3">
                                <Input type="text"  placeholder="Title" value={notesContent.title} onChange={(e) => setNotesContent({ ...notesContent, title: e.target.value })} />
                            </div>
                            <div>
                                <ReactQuill theme="snow" value={notesContent.content} onChange={(e) => setNotesContent({ ...notesContent, content: e})} placeholder="Type your new ideas here..." />
                            </div>
                        </div>
                        <div className=" flex items-center justify-end gap-2">
                            <Button type="button" onClick={() => setShowEditModal(false)} className="btn-error">Close</Button>
                            <Button type="submit" className="btn-accent">Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
        {/* EDIT MODAL END */}

        {/* view MODAL START */}
        <dialog open={showViewModal} className="modal bg-white bg-opacity-60 ">
            <div className="modal-box w-11/12 max-w-5xl border border-accent">
                <div className="">
                    <main>
                        <h1 className=" text-xl font-semibold capitalize pb-3 mb-3 border-b">{notesContent.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: notesContent.content }} />
                        <div className=" flex items-center justify-end gap-2">
                            <Button type="button" onClick={() => setShowViewModal(false)} className="btn-error">Close</Button>
                        </div>
                    </main>
                </div>
            </div>
        </dialog>
        {/* view MODAL END */}

        </>
    )
}

export default Notes;