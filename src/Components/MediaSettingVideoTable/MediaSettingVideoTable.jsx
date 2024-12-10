import { Popconfirm, Table } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCheck } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { imageUrl } from "../../redux/Api/baseApi";
import { useDeleteVideoAdsMutation } from "../../redux/Api/MediaSettingApi";
import { toast } from "sonner";
import EditVideoModal from "../EditVideoModal/EditVideoModal";
const MediaSettingVideoTable = ({ getAllVideos }) => {
    const [openAddModal, setOpenAddModal] = useState(false)
    
    const [modalTitle, setModalTitle] = useState('')
    const [deleteVideo] = useDeleteVideoAdsMutation()
    const [editData, setEditData] = useState()
    // console.log(editData);
    const handelEditVideo = (record) => {
        setModalTitle('Edit')
        setOpenAddModal(true)
        setEditData(record);
    }

    const handleDeleteVideo =(id)=>{
        deleteVideo(id).unwrap()
        .then((payload) => toast.success(payload?.message))
        .catch((error) => toast.error(error?.data?.message));
    }


    const columns = [
        {
            title: 'Sl No',
            dataIndex: 'changeOrder',
            key: 'changeOrder',
        },
        {
            title: 'Video',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (text, record) => {
                if (!record?.video) {
                    return <span>No video available</span>;
                }

                return (
                    <video
                        src={`${imageUrl}${record?.video}`}
                        style={{ width: 50, height: 50 }}
                        controls={false}
                        muted
                    />
                );
            },
        },
        {
            title: 'View Order',
            dataIndex: 'viewOrder',
            key: 'viewOrder',

        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render : (_, record)=>(
                    record?.active ? <MdCheck className="text-green-500" /> : <IoMdClose className="text-red-600" />
                
            )
        },
        {
            title: 'Private',
            dataIndex: 'private',
            key: 'private',
            render : (_, record)=>(
                record?.private ? <MdCheck className="text-green-500" /> : <IoMdClose className="text-red-600" />
            
        )
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',

        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            // eslint-disable-next-line no-unused-vars
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    {/* Replace the action content with what you need, for example, icons */}
                    <a href="#edit" onClick={() => handelEditVideo(record)} className="bg-[#3475F1] text-white p-1 rounded-md"><CiEdit size={20} /></a>
                    <Popconfirm
                        title="Are you sure to delete this video?"
                        onConfirm={()=>handleDeleteVideo(record?.id)}
                    >

                        <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-md"><RiDeleteBin6Line size={20} /></a>
                    </Popconfirm>
                </div>
            ),
        },
    ];


    // Columns data
    const formattedTableData = getAllVideos?.data?.map((video, i) => {
        return {
            id: video?._id,
            key: i + 1,
            changeOrder: video?.order,
            viewOrder: video?.order,
            video: video?.video,
            active: video?.isActive ,
            private: video?.isPrivate,
            url: video?.url
        }
    })








    return (
        <div className="p-2 ">

            <Table columns={columns} dataSource={formattedTableData}
                pagination={false}

            />
            {/* <MediaSettingModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} modalTitle={modalTitle}  /> */}

        <EditVideoModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} editData={editData}  />

        </div>
    );
};

export default MediaSettingVideoTable;