import {  Table } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import img from '../../assets/images/adsVideo.png'
import { MdCheck, MdDragHandle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import MediaSettingModal from "../MediaSettingModal/MediaSettingModal";
import { isAction } from "@reduxjs/toolkit";
const MediaSettingVideoTable = ({getAllVideos}) => {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')


    const handelEditVideo = ()=>{
        setModalTitle('Edit')
        setOpenAddModal(true)
    }


    const columns = [
        {
            title: 'Change Order',
            dataIndex: 'changeOrder',
            key: 'changeOrder',
        },
        {
            title: 'Video',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (text, record) => <img src={record.imageUrl} alt={record.name} style={{ width: 50, height: 50 }} />,
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

        },
        {
            title: 'Private',
            dataIndex: 'private',
            key: 'private',

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
                    <a href="#delete" onClick={() => handelEditVideo()} className="bg-[#3475F1] text-white p-1 rounded-md"><CiEdit size={20} /></a>
                    <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-md"><RiDeleteBin6Line size={20} /></a>
                </div>
            ),
        },
    ];

    // console.log(getAllVideos?.data);
    // Columns data
    const formattedTableData = getAllVideos?.data?.map((video, i)=>{
        return  {
            key: i + 1,
            changeOrder: <MdDragHandle size={20} />,
            imageUrl: img,
            viewOrder: video?.order,
            active : video?.isActive ? <MdCheck className="text-green-500" /> : <IoMdClose className="text-red-600" />,
            private : video?.isPrivate ? <MdCheck className="text-green-500" /> : <IoMdClose className="text-red-600" />,
            url : video?.url
        }
    })
   


    




    return (
        <div className="p-2 ">

            <Table columns={columns} dataSource={formattedTableData} 
            pagination={false}
           
            />
            <MediaSettingModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} modalTitle={modalTitle} />

            

        </div>
    );
};

export default MediaSettingVideoTable;