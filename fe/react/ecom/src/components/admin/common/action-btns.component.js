import {FaPen, FaTrash} from "react-icons/fa"
import { NavLink } from "react-router-dom";

import Swal from "sweetalert2"
export function ActionBtns(props){
    
    const confirmDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                props.onDelete(props.id);
            }
          })

        
    }
    return (
        <>
            <NavLink to={props.editUrl + '/' + props.id} className="btn btn-sm btn-success btn-circle">
                <FaPen></FaPen>
            </NavLink>
            &nbsp;
            <button onClick={confirmDelete}  className="btn btn-sm btn-danger btn-circle">
                <FaTrash />
            </button>
        </>
    );
}