import { Checkbox, Form, Input, Modal, Select, Spin, Upload } from "antd";
import { RxCross2 } from "react-icons/rx";
import { TbCopyCheck } from "react-icons/tb";
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useCreateAdsMutation } from "../../redux/Api/MediaSettingApi";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
// eslint-disable-next-line react/prop-types
const MediaSettingModal = ({ openAddModal, setOpenAddModal, modalTitle  }) => {
    const [form] = Form.useForm()
    const [createAds, { isLoading }] = useCreateAdsMutation()
    const [fileList, setFileList] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false)
    const [isActive, setIsActive] = useState()


    const onFinish = (value) => {
        const formData = new FormData();
        formData.append('image', fileList[0].originFileObj)
        formData.append('isPrivate', isPrivate)
        formData.append('isActive', isActive)
        formData.append('url', value?.Url)
        formData.append('order', value?.viewOrder)
        createAds(formData).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenAddModal(false)
                form.resetFields()
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

    const handleSelectItemChange = (value) => {
        console.log(value);
    }


    // handle upload image 
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };


    return (
        <Modal
            open={openAddModal}
            centered
            footer={false}
            onCancel={() =>{
                setOpenAddModal(false)
                form.resetFields()
            }}
        >
            <div>
                <p className='text-xl text-center py-2 font-semibold'>{modalTitle}</p>
                <Form className=''
                    layout='vertical'
                    onFinish={onFinish}
                    form={form}
                >


                    <Form.Item name={`viewOrder`}
                        label={`View Order`}
                        rules={[
                            {
                                message: 'view Order is required',

                            }
                        ]}>
                        <Input />

                    </Form.Item>
                    <Checkbox className="my-2" onChange={handleIsActive} >Active</Checkbox>

                    <Form.Item
                        name={`Url`}
                        label={`url`}
                        rules={[
                            {
                                message: 'Url is required',

                            }
                        ]}
                    >
                        <Input className=' border outline-none' placeholder='' />
                    </Form.Item>
                    <Checkbox onChange={onChange}>Private</Checkbox>
                    <p className="pb-5">By making a video private, it will be visible only the selected members. </p>

                    <Form.Item
                        name="image"
                        label="Image"
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
                        <button disabled={isLoading} className='flex items-center gap-1 py-2 px-4 bg-[#3475F1]  text-white font-semibold rounded-sm'>
                            {isLoading  ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#ffffff' }} spin />} />  : <><TbCopyCheck /> save</>}
                        </button>
                        <button type="button" onClick={()=> setOpenAddModal(false)} disabled={isLoading} className='py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm'>
                            <RxCross2 /> Cancel
                        </button>
                    </div>

                </Form>
            </div>
        </Modal>
    );
};

export default MediaSettingModal;