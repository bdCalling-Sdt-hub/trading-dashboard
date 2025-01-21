import { Checkbox, Form, Input, Modal, Select, Spin, Upload } from "antd";
import { RxCross2 } from "react-icons/rx";
import { TbCopyCheck } from "react-icons/tb";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useCreateAdsMutation } from "../../redux/Api/MediaSettingApi";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
// eslint-disable-next-line react/prop-types
const MediaSettingModal = ({ openAddModal, setOpenAddModal, modalTitle }) => {
  const [form] = Form.useForm();
  const [createAds, { isLoading }] = useCreateAdsMutation();
  const [fileList, setFileList] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isActive, setIsActive] = useState();

  const onFinish = (value) => {
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    formData.append("url", value?.Url);
    createAds(formData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenAddModal(false);
        form.resetFields();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

 

//   // handle upload image
//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

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
      open={openAddModal}
      centered
      footer={false}
      onCancel={() => {
        setOpenAddModal(false);
        form.resetFields();
      }}
    >
      <div>
        <p className="text-xl text-center py-2 font-semibold">{modalTitle}</p>
        <Form className="" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={`Url`}
            label={`url`}
            rules={[
              {
                message: "Url is required",
              },
            ]}
          >
            <Input className=" border outline-none" placeholder="" />
          </Form.Item>

          {/* <Form.Item
                        name="image"
                        label="Image / Video"
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
                    </Form.Item> */}
          <Form.Item name="image" label="Video / Image">
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
                <div className="flex items-center gap-2">
                  <PlusOutlined />
                  <div>Add Image / Video</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className="flex justify-center items-center gap-2">
            <button
              disabled={isLoading}
              className="flex items-center gap-1 py-2 px-4 bg-[#3475F1]  text-white font-semibold rounded-sm"
            >
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "#ffffff" }}
                      spin
                    />
                  }
                />
              ) : (
                <>
                  <TbCopyCheck /> save
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpenAddModal(false)}
              disabled={isLoading}
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

export default MediaSettingModal;
