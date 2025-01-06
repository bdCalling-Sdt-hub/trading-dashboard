import { Form, Input, Modal, Popconfirm, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import CategoryModal from "../CategoryModal/CategoryModal";
import { useDeleteCategoryMutation, useEditCategoryMutation, useGetAllCategoryQuery } from "../../redux/Api/dashboardApi";
import { imageUrl } from "../../redux/Api/baseApi";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { TbCopyCheck } from "react-icons/tb";
import { PlusOutlined } from "@ant-design/icons";

const ManageCategoryTable = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [editOpenModal, setOpenEditModal] = useState(false)
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm()
    const { data: getAllCategory } = useGetAllCategoryQuery()
    const [editCategory, { isLoading }] = useEditCategoryMutation()
    const [editData, setEditData] = useState()
    const [deleteCategory] = useDeleteCategoryMutation()


    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const columns = [
        {
            title: 'SL No.',
            dataIndex: 'sno',
            key: 'sno',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (text, record) => <img className="object-contain" src={record.imageUrl} alt={record.name} style={{ width: 60, height: 60 }} />,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <a href="#edit" onClick={() => {
                        setOpenEditModal(true)
                        setEditData(record)
                    }} className="bg-[#3475F1] text-white p-1 rounded-md"><CiEdit size={20} /></a>
                    <Popconfirm
                        title="Delete the category!"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteCategory(record?.key)}
                    >
                        <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-md"><RiDeleteBin6Line size={20} /></a>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    /** Delete category */
    const handleDeleteCategory = (values) => {
        deleteCategory(values).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));

    }

    /** Category data */
    const dataTable = getAllCategory?.data?.map((category, i) => (
       
        {
            key: category?._id,
            sno: i + 1,
            category: category?.name,
            imageUrl: `${imageUrl}${category?.image}`,

        }
    ))
    console.log(getAllCategory?.data);



    const handleEditCategory = (values) => {
        const id = editData?.key
        console.log(values?.name);
        const formData = new FormData();
        if (!values?.name) {
            return toast.error('Please enter category name!');
        }
        /** Check image is missing or not */
        if (fileList[0]?.originFileObj) {
           formData.append('image', fileList[0].originFileObj)
        }
        formData.append('name', values?.name)
        editCategory( {formData, id} ).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenEditModal(false)
                console.log(payload);
            })
            .catch((error) => {
                toast.error(error?.data?.message)
            });

    }

    /** edit modal initial data  */
    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                name: editData?.category
            })
            if (editData?.imageUrl) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: editData?.imageUrl,
                    },
                ]);
            }

        }
    }, [editData, form])



    return (
        <div className="p-2 ">

            <Table columns={columns} dataSource={dataTable} pagination={{
                pageSize: 10,
                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                locale: {
                    items_per_page: '',
                    prev_page: 'Previous',
                    next_page: 'Next',
                },
            }}
                className="custom-pagination"

            />
            <CategoryModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />

            <Modal
                open={editOpenModal}
                centered
                footer={false}
                onCancel={() => setOpenEditModal(false)}
            >
                <div>
                    <p className='text-xl text-center py-2 font-semibold'>Edit Category</p>
                    <Form className=''
                        form={form}
                        layout='vertical'
                        onFinish={handleEditCategory}
                    >
                        <Form.Item
                            name={`name`}
                            label={`Category Name`}
                            rules={[
                                {
                                    message: 'Category Name is required',

                                }
                            ]}
                        >
                            <Input className=' border outline-none' placeholder='' />
                        </Form.Item>
                        <Form.Item label="Image" style={{ width: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={() => false}
                                    multiple={false}
                                    className="upload-full-width"
                                    maxCount={1}
                                >
                                    {fileList.length >= 1 ? null : (
                                        <div className='flex items-center gap-2'>
                                            <PlusOutlined />
                                            <div>Add Image</div>
                                        </div>
                                    )}
                                </Upload>
                            </div>
                        </Form.Item>


                        <div className='flex justify-center items-center gap-2'>
                            <button className='flex items-center gap-1 py-2 px-4 bg-[#3475F1]  text-white font-semibold rounded-sm'>
                                <TbCopyCheck /> save
                            </button>
                            <button onClick={() => {
                                setOpenEditModal(false)

                            }} className='py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm'>
                                <RxCross2 /> Cancel
                            </button>
                        </div>

                    </Form>
                </div>
            </Modal>

        </div>
    );
};

export default ManageCategoryTable;