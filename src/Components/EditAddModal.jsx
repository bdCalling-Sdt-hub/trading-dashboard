import { LoadingOutlined } from '@ant-design/icons'
import { Checkbox, Form, Input, Modal, Spin, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { TbCopyCheck } from 'react-icons/tb'
import { PlusOutlined } from '@ant-design/icons';
import { useUpdateAddsMutation } from '../redux/Api/MediaSettingApi'
import { toast } from 'sonner'

const EditAddModal = ({ openAddModal, setOpenAddModal, addData }) => {
    const [updateAds , {isLoading}] = useUpdateAddsMutation()
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState([]);
    const [isPrivate, setIsPrivate] = useState()
    const [isActive, setIsActive] = useState()
    // console.log(addData);
    useEffect(() => {
        if (addData) {
            const fileList = addData.imageUrl
                ? [
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: addData.imageUrl,
                    },
                ]
                : [];
                setIsPrivate(addData?.private)
                setIsActive(addData?.active)
            form.setFieldsValue({
                viewOrder: addData?.changeOrder,
                image: fileList,
                url : addData?.url

            })
        }
    }, [addData, form])
    const onFinish = (values) => {
        const id = addData?.key
        const formData = new FormData();
        if(fileList){
            formData.append('image' ,fileList)
        }
        // formData.append("order",values?.viewOrder)
        formData.append("url",values?.url )
        // formData.append("isPrivate",isPrivate )
        // formData.append("isActive", isActive)

        updateAds({id, data:formData}).unwrap()
        .then((payload) => {
            toast.success(payload?.message)
            setOpenAddModal(false)
        })
        .catch((error) => toast.error(error?.data?.message));

    }

    //   Checkbox value
    const onChange = (e) => {
        setIsPrivate(e.target.checked);
    };
    const handleIsActive = (e) => {
        setIsActive(e.target.checked);
    }


    // handle upload image 
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList[0]?.originFileObj);
    };

    const handleRemove = (file) => {
        setFileList(fileList[0]?.originFileObj.filter((item) => item.uid !== file.uid));
    };

    return (
        <Modal
            open={openAddModal}
            centered
            footer={false}
            onCancel={() => setOpenAddModal(false)}
        >
            <div>
                <p className='text-xl text-center py-2 font-semibold'>Edit</p>
                <Form className=''
                    layout='vertical'
                    onFinish={onFinish}
                    form={form}
                >


                    {/* <Form.Item name={`viewOrder`}
                        label={`View Order`}
                       >
                        <Input />

                    </Form.Item>
                    <Checkbox checked={isActive} className="my-2" onChange={handleIsActive} >Active</Checkbox> */}

                    <Form.Item
                        name={`url`}
                        label={`url`}
                       
                    >
                        <Input className=' border outline-none' placeholder='' />
                    </Form.Item>
                    {/* <Checkbox checked={isPrivate} onChange={onChange}>Private</Checkbox>
                    <p className="pb-5">By making a video private, it will be visible only the selected members. </p> */}

                    <Form.Item
                        name="image"
                        label="Image / Video"
                        valuePropName="fileList" 
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    >
                        <Upload
                            listType="picture-card"
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={() => false}
                            multiple={false}
                            maxCount={1}
                        >
                            <PlusOutlined />
                            <div >Add Image</div>
                        </Upload>
                    </Form.Item>

                    <div className='flex justify-center items-center gap-2'>
                        {/* disabled={isLoading} */}
                        <button className='flex items-center gap-1 py-2 px-4 bg-[#3475F1]  text-white font-semibold rounded-sm'>
                           
                             {isLoading  ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#ffffff' }} spin />} />  : <><TbCopyCheck /> save</>}
                        </button>
                        <button onClick={() => setOpenAddModal(false)} className='py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm'>
                            <RxCross2 /> Cancel
                        </button>
                    </div>

                </Form>
            </div>
        </Modal>
    )
}

export default EditAddModal