import { BsArrowLeftShort } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import UserDetailsTable from "../Components/UserDetailsTable/UserDetailsTable"
import { useState } from "react";
import { Link } from "react-router-dom";



const UserDetails = () => {
    const [search , setSearch] = useState('') 
    return (
        <div className="p-2 shadow-md">
            <div className="flex justify-between item-center ">
                <div className="flex items-center gap-2">
                   <Link to={-1}><BsArrowLeftShort size={25} /></Link>
                    User Details</div>
                <div>
                    <div className="relative">
                        <input
                        onChange={(e)=>setSearch(e.target.value)}
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">

                            <CiSearch />
                        </span>
                    </div>
                </div>
            </div>

            {/* User Details table */}

            <UserDetailsTable search={search}/>


        </div>
    )
}

export default UserDetails