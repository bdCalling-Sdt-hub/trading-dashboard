import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbCopyCheck } from "react-icons/tb";
import { PlusOutlined } from "@ant-design/icons";
import { useUpdateAddsMutation } from "../redux/Api/MediaSettingApi";
import { toast } from "sonner";

const EditAddModal = ({ openAddModal, setOpenAddModal, addData }) => {
  const [updateAds, { isLoading }] = useUpdateAddsMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  console.log(addData?.imageUrl);

  useEffect(() => {
    if (addData) {
      const fileList = addData.imageUrl
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: addData.imageUrl,
            },
          ]
        : [];

      form.setFieldsValue({
        viewOrder: addData?.changeOrder,
        // image: fileList,
        url: addData?.url,
      });
    }
  }, [addData, form]);
  const onFinish = (values) => {
    const id = addData?.key;
    const formData = new FormData();
    if (fileList && fileList.length > 0) {
      formData.append("image", fileList[0]?.originFileObj);
    }
    formData.append("url", values?.url);
    updateAds({ id, data: formData })
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenAddModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

//   // handle upload image
//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

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

  const handleRemove = (file) => {
    setFileList(fileList?.filter((item) => item.uid !== file.uid));
  };

  return (
    <Modal
      open={openAddModal}
      centered
      footer={false}
      onCancel={() => setOpenAddModal(false)}
    >
      <div>
        <p className="text-xl text-center py-2 font-semibold">Edit</p>
        <Form className="" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item name={`url`} label={`url`}>
            <Input className=" border outline-none" placeholder="" />
          </Form.Item>

          {/* <Form.Item
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
                            <div >Add Image / Video</div>
                        </Upload>
                    </Form.Item> */}

          <Form.Item
            name="image"
            label="Image / Video"
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
                  <div>Upload New Image / Video</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className="flex justify-center items-center gap-2">
            {/* disabled={isLoading} */}
            <button className="flex items-center gap-1 py-2 px-4 bg-[#3475F1]  text-white font-semibold rounded-sm">
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
              onClick={() => setOpenAddModal(false)}
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

export default EditAddModal;
