import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import MediaSettingModal from "../../Components/MediaSettingModal/MediaSettingModal";
import MediaSettingTable from "../../Components/MediaSettingTable/MediaSettingTable";
import MediaSettingVideoTable from "../../Components/MediaSettingVideoTable/MediaSettingVideoTable";
import { useGetAllAdsQuery, useGetAllVideosQuery, useGetSecondVideoQuery } from "../../redux/Api/MediaSettingApi";
import AddVideoModal from "../../Components/AddVideoModal/AddVideoModal";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import SecondVideo from "../../Components/SecondVideo/SecondVideo";
import AddSecondVideoModal from "../../Components/AddSecondVideoModal/AddSecondVideoModal";

const MediaSettings = () => {
    const [openVideoModal, setOpenVideoModal] =  useState(false)
    const [openSecondVideoModal, setOpenSecondVideoModal] =  useState(false)

    const [page, setPage] = useState(1)
    /** all APIs */
    const { data: getAllAds } = useGetAllAdsQuery({page : page});
    const { data: getAllVideos } = useGetAllVideosQuery()
    const { data : getSecondVideo} = useGetSecondVideoQuery()
    console.log(getSecondVideo);
    const [ads, setAds] = useState("ads")
    const [openAddModal, setOpenAddModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    // const [openCategoryModal, setOpenCategoryModal] = useState(false)


    const handleAdsModal = () => {
        setModalTitle('Add New Ads')
        setAds("ads")
    }

    const handleVideoModal = () => {
        setModalTitle('Add New Video')
        setAds("video")
    }

    const handleSecondVideoModal =()=>{
        setModalTitle('Add Second Video')
        setAds("secondVideo")
    }

    return (
        <div className='rounded-md shadow-md p-4'>
            <div className='  my-2'>
                <div className='start-center gap-2 mb-3 p-5'>

                    <p className='flex items-center gap-2'><Link to={-1}><BsArrowLeftShort size={25} /></Link>Media Settings</p>
                </div>
                <div className='flex justify-between items-center'>
                    {/* <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" /> */}
                    <div className='flex items-center gap-5'>
                        <button onClick={() => handleAdsModal()} className={` ${ads === "ads" ? 'bg-[#3475F1] text-white' : 'border border-[#3475F1] text-[#3475F1]'} px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                            Ads
                        </button>
                        <button onClick={() => handleVideoModal()} className={` ${ads === "video" ? 'bg-[#3475F1] text-white' : 'border border-[#3475F1] text-[#3475F1]'}  px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                            Video
                        </button>
                        <button onClick={() => handleSecondVideoModal()} className={` ${ads === "secondVideo" ? 'bg-[#3475F1] text-white' : 'border border-[#3475F1] text-[#3475F1]'}  px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                            Second Banner
                        </button>
                    </div>

                    {
                        ads === "ads" && <button onClick={() => setOpenAddModal(true)} className='bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                            <FaPlus />
                            New Ads
                        </button> 
                    }
                    {
                        ads  === "video" &&  <button onClick={() => setOpenVideoModal(true)} className='bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        <FaPlus />
                        New Videos
                    </button>
                    }
                    {
                        ads  === "secondVideo" &&  <button onClick={() => setOpenSecondVideoModal(true)} className='bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        <FaPlus />
                        Add Second Videos
                    </button>
                    }
                </div>
            </div>



            {
                ads === "ads" && <MediaSettingTable getAllAds={getAllAds} setPage={setPage} /> 
            }
            {
                ads === "video" && <MediaSettingVideoTable getAllVideos={getAllVideos} />
            }
            {
                ads === "secondVideo" && <SecondVideo getAllVideos={getSecondVideo} />
            }





            
            {/* Media setting Modal */}
            <MediaSettingModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} modalTitle={modalTitle} />
            {/* <EditAddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal}  /> */}
            <AddVideoModal setOpenVideoModal={setOpenVideoModal} openVideoModal={openVideoModal} />
            <AddSecondVideoModal setOpenVideoModal={setOpenSecondVideoModal} openVideoModal={openSecondVideoModal}   />
        </div>
    );
};

export default MediaSettings;