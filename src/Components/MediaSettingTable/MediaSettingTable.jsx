import { Pagination, Popconfirm, Table } from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import MediaSettingModal from "../MediaSettingModal/MediaSettingModal";
import { imageUrl } from "../../redux/Api/baseApi";
import { useDeleteAdsMutation } from "../../redux/Api/MediaSettingApi";
import { toast } from "sonner";
import EditAddModal from "../EditAddModal";
import { MdCheck } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
const MediaSettingTable = ({ getAllAds, setPage }) => {
    const currentPage = getAllAds?.meta?.page || 1; 
    const pageSize = getAllAds?.meta?.limit || 10;
    const [openAddModal, setOpenAddModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [deleteAds] = useDeleteAdsMutation()
    const [addData, setAddData] = useState()
    const handleEditAds = (record) => {
        setOpenAddModal(true)
        setModalTitle('Edit')
        setAddData(record);
    }

    const handleDeleteAds = (id) => {
        deleteAds(id).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    }


    const columns = [
        {
            title: 'Sl no.',
            dataIndex: 'changeOrder',
            key: 'changeOrder',
        },
        {
            title: 'Ads',
            dataIndex: 'imageUrl',
            key: 'ads',
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
            render : (_, record)=>(
                <div>
                   {record?.active ? <MdCheck className="text-green-500" /> : <IoMdClose className="text-red-600" />}
                </div>
            )

        }, 
        {
            title: 'Private',
            dataIndex: 'private',
            key: 'private',
            render : (_, record)=>(
                <div>
                   {record?.private ? <MdCheck className="text-green-500" /> : <IoMdClose className="text-red-600" />}
                </div>
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
                    <a href="#edit" onClick={() => handleEditAds(record)} className="bg-[#3475F1] text-white p-1 rounded-md"><CiEdit size={20} /></a>
                    <Popconfirm
                        placement="topRight"
                        title="Are you sure to delete this ads?"
                        onConfirm={() => handleDeleteAds(record?.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-md"><RiDeleteBin6Line size={20} /></a>
                    </Popconfirm>
                </div>
            ),
        },
    ];


    const formattedData = getAllAds?.data?.map((add, i) => {
        const serialNumber = (currentPage - 1) * pageSize + i + 1;
        return {
            key: add?._id,
            changeOrder: serialNumber,
            imageUrl: `${imageUrl}${add?.image}`,
            viewOrder: add?.order,
            active: add?.isActive ,
            private: add?.isPrivate,
            url: add?.url
        }
    })

    return (
        <div className=" ">

            <Table columns={columns} dataSource={formattedData}
                pagination={false}
            />
            <div className="flex  items-center justify-center mt-2">
                <Pagination
                    total={getAllAds?.meta?.total}
                    pageSize={getAllAds?.meta?.limit}
                    onChange={(page) => setPage(page)}
                />
            </div>
            <MediaSettingModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} modalTitle={modalTitle} addData={addData} />

            <EditAddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} addData={addData} />

        </div>
    );
};

export default MediaSettingTable;