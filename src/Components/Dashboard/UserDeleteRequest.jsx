import { Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import {FaEdit, FaRegEye, FaStar} from 'react-icons/fa';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        rating: 4.5,
        email: 'gmail@ gmail.com',
        regNo: '225.555.0118'
    },
    {
        key: '2',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        rating: 4.5,
        email: 'gmail@ gmail.com',
        regNo: '225.555.0118'
    },
    {
        key: '3 ',
        name: 'Mike',
        img: 'https://i.ibb.co/F3jcwjJ/artworks-YCx-Rfx-OOf-T5l-Dm-J9-K5q-X2-A-t500x500.jpg',
        phone: 324189454648487,
        rating: 4.5,
        email: 'gmail@ gmail.com',
        regNo: '225.555.0118'
    },
]
const sarvayData = [
    { name: 'Customer Feedback', id: '1' },
    { name: 'Customer Feedback', id: '2' },
    { name: 'Customer Feedback', id: '3' },
    { name: 'Customer Feedback', id: '4' },
    { name: 'Customer Feedback', id: '5' },
    { name: 'Customer Feedback', id: '6' },
    { name: 'Customer Feedback', id: '7' },
    { name: 'Customer Feedback', id: '8' },
    { name: 'Customer Feedback', id: '9' },
]
const UserDeleteRequest = () => {
    const [openAllowModal, setOpenAllowModal] = useState(false)
    const [selectedID, setSelectedID] = useState([])
    // console.log(openAllowModal)
    const columns = [
        {
            title: 'Serial No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (<div className='start-center gap-2'>
                    <img src={record?.img} className='w-[40px] h-[40px] rounded-full' alt="" />
                    <p className='font-medium'>{record?.name}</p>
                </div>)
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email  ',
        },

        {
            title: 'Request',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='start-center gap-1'>
                    <button onClick={() => setOpenAllowModal(true)} className='px-4 py-2 rounded-3xl text-white font-semibold bg-green-600'> Allow </button>
                    <button className='px-4 py-2 rounded-3xl text-white font-semibold bg-red-600'> Cancel </button>
                </div>)
            }
        },


    ];
    return (
        <div className='bg-[var(--color-7)] rounded-md'>
            <Table dataSource={dataSource} columns={columns} />
            <Modal
                centered
                footer={false}
                open={openAllowModal}
                onCancel={() => setOpenAllowModal(false)}
                width={400}
            >
                    <div style={{textAlign: 'center', height: '100px'}} className='capitalize '>
                        <div className='mb-7'>
                            <p>Do you want to delete the user?</p>
                        </div>
                        <button className='p-3 px-8 mr-3 bg-[var(--color-2)]'>Yes</button>
                        <button className='p-3 px-8 mr-3 bg-[var(--color-2)]'>No</button>
                    </div>
            </Modal>
        </div>
    )
}

export default UserDeleteRequest
