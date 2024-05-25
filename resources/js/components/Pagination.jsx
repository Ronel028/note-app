import React from 'react';
import { Link } from '@inertiajs/react';
import { IoChevronBackOutline, IoChevronForward  } from "react-icons/io5";
  
export default function Pagination({ links }) {
  
    // function getClassName(active) {
    //     if(active) {
    //         return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
    //     } else{
    //         return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
    //     }
    // }
  
    return (
        links.length > 3 && (
            <div className="join mt-5 border border-accent rounded ">
                {links.map((link, key) => (
                    (<Link className={`join-item btn rounded btn-xs ${link.active ? 'bg-accent' : ''}`} href={ link.url }>
                        {
                            link.label === "&laquo; Previous" ? <IoChevronBackOutline /> : link.label && link.label === "Next &raquo;" ? <IoChevronForward /> : link.label 
                        }
                    </Link>)
                ))}
            </div>
        )
    );
}