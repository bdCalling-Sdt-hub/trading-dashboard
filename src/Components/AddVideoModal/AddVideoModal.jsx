import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TbCopyCheck } from 'react-icons/tb';
import { useAddVideoMutation } from '../../redux/Api/MediaSettingApi';
import { toast } from 'sonner';

const AddVideoModal = ({ openVideoModal, setOpenVideoModal }) => {
    const [addVideo] = useAddVideoMutation()
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const onFinish = (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append('video', fileList[0].originFileObj)
        formData.append('isPrivate', isPrivate)
        formData.append('isActive', isActive)
        formData.append('url', values?.Url)
        formData.append('order', values?.viewOrder)
        addVideo(formData).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenVideoModal(false)
            })
            .catch((error) => toast.error(error?.data?.message));
    };

    // Checkbox value
    const onChange = (e) => {
        setIsPrivate(e.target.checked);
    };
    const handleIsActive = (e) => {
        setIsActive(e.target.checked);
    };

    // Handle upload video
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(
            newFileList.map((file) => {
                if (file.originFileObj) {
                    // Generate video thumbnail
                    const videoUrl = URL.createObjectURL(file.originFileObj);
                    const videoElement = document.createElement('video');
                    videoElement.src = videoUrl;
                    videoElement.currentTime = 1; // Seek to 1 second for the thumbnail

                    videoElement.addEventListener('loadeddata', () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = 150;
                        canvas.height = 90; // Set the desired thumbnail dimensions
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                        // Replace the preview thumbnail with the generated thumbnail
                        file.thumbUrl = canvas.toDataURL();
                        setFileList([...newFileList]); // Update the fileList
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
                <p className="text-xl text-center py-2 font-semibold">Add Video</p>
                <Form className="" layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item
                        name="viewOrder"
                        label="View Order"
                        rules={[
                            {
                                required: true,
                                message: 'View Order is required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Checkbox className="my-2" onChange={handleIsActive}>
                        Active
                    </Checkbox>

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
                    <Checkbox onChange={onChange}>Private</Checkbox>
                    <p className="pb-5">
                        By making a video private, it will be visible only to selected members.
                    </p>

                    <Form.Item name="video" label="Video">
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
                            <TbCopyCheck /> Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenVideoModal(false)}
                            className="py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm"
                        >
                            <RxCross2 /> Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default AddVideoModal;
