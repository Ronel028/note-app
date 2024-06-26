import { useState, useEffect, useRef } from "react";
import { useForm, router } from "@inertiajs/react";
import ReactQuill from "react-quill";
import moment from "moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import axios from "../../utils/apiService/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { LuPencilLine } from "react-icons/lu";
import empty from "../../assets/empty.png";
import Navigation from "../../components/Navigation";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import Pagination from "../../components/Pagination";

const Notes = (props) => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [loadingStateView, setLoadingStatesView] = useState({})
    const [loadingStates, setLoadingStates] = useState({});
    const [notesContent, setNotesContent] = useState({
        id: '',
        title: '',
        content: ''
    })
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
      })

    // SAVE NEW DATA
    const save = (e) => {
        e.preventDefault();
        post('/create', {
            onSuccess: () => {
                setShowCreateModal(false);
                toast.success("New Notes Successful.");
            }
        })
    }

    // SAVE EDIT DATA
    const update = (e) => {
        e.preventDefault();
        router.post(`/update`, notesContent, {
            onSuccess: (response) => {
                setShowEditModal(false);
                toast.success("Notes Updated.");
            }
        })
    }

    // OPEN MODAL AND FETCH VIEW DATA
    const fetch = async(id) => {
        setNotesContent({
            ...notesContent,
            id: '',
            title: '',
            content: ''
        })
        setLoadingStatesView({
            ...loadingStateView,
            [id]: true
        });
        let response = await axios.get(`/fetch/${id}`);
        setNotesContent({
            ...notesContent,
            id: id,
            title: response.data.title,
            content: response.data.content,
        })
        setShowViewModal(true)
        setLoadingStatesView({
            ...loadingStateView,
            [id]: false
        });
    }

    // OPEN MODAL AND FETCH EDIT DATA
    const fetchEdit = async(id) => {
        setNotesContent({
            ...notesContent,
            id: '',
            title: '',
            content: ''
        })
        setLoadingStates({
            ...loadingStates,
            [id]: true
        });
        let response = await axios.get(`/fetch/${id}`);
        setNotesContent({
            ...notesContent,
            id: id,
            title: response.data.title,
            content: response.data.content,
        })
        setShowEditModal(true)
        setLoadingStates({
            ...loadingStates,
            [id]: false
        });
    }

    // REACT QUILL EDITOR TOOLBAR CONFIGURATION
    const toolbarOptions = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], 
            ['code-block'],
            ['link'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'color': [] }, { 'background': [] }],
        ]
    } 

    // OPEN CREATE MODAL
    const openCreateModal = () => {
        reset('title', 'content')
        setShowCreateModal(true)
    }

    useEffect(() => {
        console.log(props)
    }, [])

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
                        <Button onClick={openCreateModal} className="btn-accent"><LuPencilLine />Create</Button>
                    </div>

                    {
                        props.notes.data.length > 0 ?  <div className=" grid grid-cols-3 gap-2">
                        {
                            props.notes.data.map(note => {
                                return (
                                    <div key={note.id} className="card rounded w-full bg-base-100 border border-accent shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">{note.title}</h2>
                                            <div className="badge badge-neutral text-xs rounded">
                                                {moment(note.created_at).format('LL')}
                                            </div>
                                            <div className="truncate h-6 w-full line-clamp-1  mb-3">
                                                <div className="" dangerouslySetInnerHTML={{ __html: note.content }} />
                                            </div>
                                            <div className="card-actions justify-end">
                                                <div className="tooltip" data-tip="Edit">
                                                    <button type="button" id={note.id} onClick={(e) => fetchEdit(note.id)} className="btn rounded btn-xs btn-primary">
                                                        <CiEdit className={`${loadingStates[note.id] ? 'hidden' : 'block'}`} />
                                                        <span className={`${loadingStates[note.id] ? 'block' : 'hidden'} loading loading-dots loading-xs`}></span>
                                                    </button>
                                                </div>
                                                <div className="tooltip" data-tip="View">
                                                    <button type="button" onClick={() => fetch(note.id)} className="btn btn-xs rounded btn-accent">
                                                        <FaEye className={`${loadingStateView[note.id] ? 'hidden' : 'block'}`} />
                                                        <span className={`${loadingStateView[note.id] ? 'block' : 'hidden'} loading loading-dots loading-xs`}></span>
                                                    </button>
                                                </div>
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
                    <div className=" flex items-center justify-end">
                        <Pagination class="mt-6" links={props.notes.links} />
                    </div>
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
                                <ReactQuill
                                    modules={toolbarOptions}
                                    theme="snow" 
                                    value={data.content} 
                                    onChange={e =>  setData('content', e)} 
                                    placeholder="Type your new ideas here..." 
                                />
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
                                <ReactQuill  modules={toolbarOptions} theme="snow" value={notesContent.content} onChange={(e) => setNotesContent({ ...notesContent, content: e})} placeholder="Type your new ideas here..." />
                            </div>
                        </div>
                        <div className=" flex items-center justify-end gap-2">
                            <Button type="button" onClick={() => setShowEditModal(false)} className="btn-error">Close</Button>
                            <Button type="submit" className="btn-accent" disabled={processing}>Save</Button>
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
                        {/* <div className="ql-editor" dangerouslySetInnerHTML={{ __html: notesContent.content }} /> */}
                        <div className=" mb-2">
                            <ReactQuill 
                                    modules={{ toolbar:false }}
                                    value={notesContent.content}
                                    readOnly={true}
                                    placeholder="Type your new ideas here..." 
                                />
                        </div>
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