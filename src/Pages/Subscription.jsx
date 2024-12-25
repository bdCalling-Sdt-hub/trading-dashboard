import { BsArrowLeftShort } from "react-icons/bs"
import SubscriptionTable from "../Components/SubscriptionTable/SubscriptionTable"
import { Link } from "react-router-dom"



const Subscription = () => {
    return (
        <div className="p-2 shadow-md">
            <div className="flex items-center gap-2 pb-5">
                <Link to={-1}><BsArrowLeftShort size={25} /></Link>
                <h1 className="">Subscription</h1>
            </div>
            <SubscriptionTable/>
        </div>
    )
}

export default Subscription