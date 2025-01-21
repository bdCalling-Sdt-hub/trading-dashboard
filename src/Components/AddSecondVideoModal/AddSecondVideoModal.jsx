import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {  Form, Input, Modal, Spin, Upload } from 'antd';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TbCopyCheck } from 'react-icons/tb';
import { useCreateSecondVideoMutation } from '../../redux/Api/MediaSettingApi';
import { toast } from 'sonner';

const AddSecondVideoModal = ({ openVideoModal, setOpenVideoModal }) => {
    const [addVideo , {isLoading}] = useCreateSecondVideoMutation()
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
   

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('files', fileList[0].originFileObj)
      
        formData.append('url', values?.Url)
        // formData.append('order', values?.viewOrder)
        addVideo(formData).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenVideoModal(false)
            })
            .catch((error) => toast.error(error?.data?.message));
    };


    // Handle upload video
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(
            newFileList.map((file) => {
                if (file.originFileObj) {
                    const videoUrl = URL.createObjectURL(file.originFileObj);
                    const videoElement = document.createElement('video');
                    videoElement.src = videoUrl;
                    videoElement.currentTime = 1;

                    videoElement.addEventListener('loadeddata', () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = 150;
                        canvas.height = 90; 
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                        file.thumbUrl = canvas.toDataURL();
                        setFileList([...newFileList]); 
                    });
                }
                return file;
            })
        );
    };


    const handleRemove = (file) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };

    return (
        <Modal
            open={openVideoModal}
            centered
            footer={false}
            onCancel={() => {
                setOpenVideoModal(false);
                form.resetFields();
                setFileList([]);
            }}
        >
            <div>
                <p className="text-xl text-center py-2 font-semibold">Add Second Video</p>
                <Form className="" layout="vertical" onFinish={onFinish} form={form}>
                 

                    <Form.Item
                        name="Url"
                        label="URL"
                        rules={[
                            {
                                required: true,
                                message: 'URL is required',
                            },
                        ]}
                    >
                        <Input className="border outline-none" placeholder="" />
                    </Form.Item>
             
                    <Form.Item name="video" label="Video / Image">
                        <Upload
                            listType="picture-card"
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={() => false}
                            multiple={false}
                            maxCount={1}
                            fileList={fileList}
                        >
                            {fileList.length < 1 && (
                                <div className='flex items-center gap-2'>
                                    <PlusOutlined />
                                    <div>Add Video</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <div className="flex justify-center items-center gap-2">
                        <button
                            className="flex items-center gap-1 py-2 px-4 bg-[#3475F1] text-white font-semibold rounded-sm"
                            type="submit"
                        >
                            {isLoading  ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#ffffff' }} spin />} />  : <><TbCopyCheck /> save</>}
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenVideoModal(false)}
                            disabled={isLoading}
                            className={`py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm ${isLoading && "bg-red-300 cursor-not-allowed"}`}
                        >
                            <RxCross2 /> Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default AddSecondVideoModal;
