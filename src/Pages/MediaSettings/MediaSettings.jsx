import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import MediaSettingModal from "../../Components/MediaSettingModal/MediaSettingModal";
import MediaSettingTable from "../../Components/MediaSettingTable/MediaSettingTable";
import MediaSettingVideoTable from "../../Components/MediaSettingVideoTable/MediaSettingVideoTable";
import { useGetAllAdsQuery, useGetAllVideosQuery } from "../../redux/Api/MediaSettingApi";
import EditAddModal from "../../Components/EditAddModal";

const MediaSettings = () => {
    const [page, setPage] = useState(1)
    /** all APIs */
    const { data: getAllAds } = useGetAllAdsQuery({page : page});
    const { data: getAllVideos } = useGetAllVideosQuery()


    const [ads, setAds] = useState(true)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    // const [openCategoryModal, setOpenCategoryModal] = useState(false)

    const handleAdsModal = () => {
        setModalTitle('Add New Ads')
        setAds(true)
    }

    const handleVideoModal = () => {
        setModalTitle('Add New Video')
        setAds(false)
    }

    return (
        <div className='rounded-md'>
            <div className='  my-2 pt-5'>
                <div className='start-center gap-2 mb-3 p-5'>

                    <p className='flex items-center gap-2'> <GoArrowLeft />Media Settings</p>
                </div>
                <div className='flex justify-between items-center'>
                    {/* <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" /> */}
                    <div className='flex items-center gap-5'>
                        <button onClick={() => handleAdsModal()} className={` ${ads ? 'bg-[#3475F1] text-white' : 'border border-[#3475F1] text-[#3475F1]'} px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                            Ads
                        </button>
                        <button onClick={() => handleVideoModal()} className={` ${ads ? 'border border-[#3475F1] text-[#3475F1]' : 'bg-[#3475F1] text-white'}  px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                            Video
                        </button>
                    </div>

                    {
                        ads ? <button onClick={() => setOpenAddModal(true)} className='bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                            <FaPlus />
                            New Ads
                        </button> : <button onClick={() => setOpenAddModal(true)} className='bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                            <FaPlus />
                            New Videos
                        </button>
                    }
                </div>
            </div>



            {
                ads ? <MediaSettingTable getAllAds={getAllAds} setPage={setPage} /> : <MediaSettingVideoTable getAllVideos={getAllVideos} />
            }





            
            {/* Media setting Modal */}
            <MediaSettingModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} modalTitle={modalTitle} />
            {/* <EditAddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal}  /> */}
        </div>
    );
};

export default MediaSettings;