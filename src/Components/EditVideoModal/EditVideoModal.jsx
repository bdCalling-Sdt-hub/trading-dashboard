import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TbCopyCheck } from 'react-icons/tb';
import { toast } from 'sonner';
import { useUpdateVideoMutation } from '../../redux/Api/MediaSettingApi';
import { imageUrl } from '../../redux/Api/baseApi';

const EditVideoModal = ({ openAddModal, setOpenAddModal, editData }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [updateEditVideo] = useUpdateVideoMutation();

    // Populate the form and state when editing existing data
    useEffect(() => {
        if (editData) {
            // if (editData?.video) {
            //     const videoElement = document.createElement('video');
            //     videoElement.crossOrigin = 'anonymous';
            //     videoElement.src = `${imageUrl}${editData.video}`;
            //     console.log(videoElement.src);
            //     videoElement.addEventListener('loadeddata', () => {
            //         const canvas = document.createElement('canvas');
            //         canvas.width = 150; // Thumbnail width
            //         canvas.height = 90; // Thumbnail height
            //         const ctx = canvas.getContext('2d');
    
            //         // Wait for the video to load enough data to render a frame
            //         videoElement.currentTime = 1; // Capture frame at 1 second
            //         videoElement.onseeked = () => {
            //             ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
            //             const thumbnailUrl = canvas.toDataURL(); // Convert to Base64
    
            //             // Update fileList with the generated thumbnail
            //             setFileList([
            //                 {
            //                     uid: '-1',
            //                     name: 'video-thumbnail.png',
            //                     status: 'done',
            //                     url: thumbnailUrl, // Use the generated thumbnail
            //                 },
            //             ]);
            //         };
            //     });
            // }

            setIsPrivate(editData?.private || false);
            setIsActive(editData?.active || false);
            form.setFieldsValue({
                // video : `${imageUrl}${editData?.video}`,
                viewOrder: editData?.changeOrder || '',
                url: editData?.url || '',
            });
        }
    }, [editData, form]);

    // Handle form submission
    const onFinish = (values) => {
        // const formData = new FormData();
        // if (fileList.length && fileList[0]?.originFileObj) {
        //     formData.append('video', fileList[0].originFileObj);
        // }

        const formData = {
            // order : values?.viewOrder ,
            url :  values?.url,
            // isPrivate : isPrivate,
            // isActive, isActive
        }

        // formData.append('order', values.viewOrder || '');
        // formData.append('url', values.url || '');
        // formData.append('isPrivate', isPrivate);
        // formData.append('isActive', isActive);

        updateEditVideo({ id: editData?.id, formData })
            .unwrap()
            .then((payload) => {
                toast.success(payload?.message);
                setOpenAddModal(false);
            })
            .catch((error) => toast.error(error?.data?.message));
    };

    // Handle file upload
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

    // Handle file removal
    const handleRemove = (file) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };

    // Handle modal close
    const handleCancel = () => {
        setOpenAddModal(false);
        form.resetFields();
        setFileList([]);
        setIsPrivate(false);
        setIsActive(false);
    };

    return (
        <Modal
            open={openAddModal}
            centered
            footer={null}
            onCancel={handleCancel}
        >
            <div>
                <p className="text-xl text-center py-2 font-semibold">Edit Video</p>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    {/* <Form.Item
                        name="viewOrder"
                        label="View Order"
                        rules={[{ required: true, message: 'Please enter the view order' }]}
                    >
                        <Input placeholder="Enter view order" />
                    </Form.Item> */}

                    {/* <Checkbox
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="mb-4"
                    >
                        Active
                    </Checkbox> */}

                    <Form.Item
                        name="url"
                        label="Video URL"
                        rules={[{ required: true, message: 'Please enter the video URL' }]}
                    >
                        <Input placeholder="Enter video URL" />
                    </Form.Item>

                    {/* <Checkbox
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="mb-4"
                    >
                        Private
                    </Checkbox>
                    <p className="pb-5 text-sm">
                        By making the video private, it will only be visible to selected members.
                    </p> */}

                    {/* <Form.Item
                        name="video"
                        label="Video Thumbnail"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload
                            listType="picture-card"
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={() => false}
                            fileList={fileList}
                            maxCount={1}
                        >
                            {fileList.length < 1 && (
                                <div className="flex items-center gap-2">
                                    <PlusOutlined />
                                    <div>Upload New Video</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item> */}

                    <div className="flex justify-center gap-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded"
                        >
                            <TbCopyCheck /> Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded"
                        >
                            <RxCross2 /> Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default EditVideoModal;