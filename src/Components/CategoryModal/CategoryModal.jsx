import { Form, Input, Modal, Spin, Upload } from "antd";
import { RxCross2 } from "react-icons/rx";
import { TbCopyCheck } from "react-icons/tb";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateCategoryMutation } from "../../redux/Api/dashboardApi";
import { toast } from "sonner";

const CategoryModal = ({ openAddModal, setOpenAddModal }) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = (value) => {
    const formData = new FormData();
    /** Check name is missing or not */
    if (!value?.name) {
      return toast.error("Please enter category name!");
    }

    /** Check image is missing or not */
    if (!fileList[0]?.originFileObj) {
      return toast.error("Please upload an image!");
    }
    formData.append("name", value?.name);
    formData.append("image", fileList[0].originFileObj);
    createCategory(formData)
      .unwrap()
      .then((payload) => {
        setOpenAddModal(false);
        form.resetFields();
        setFileList([]);
        toast.success(payload?.message);
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  return (
    <Modal
      open={openAddModal}
      centered
      footer={false}
      onCancel={() => setOpenAddModal(false)}
    >
      <div>
        <p className="text-xl text-center py-2 font-semibold">
          Create Category
        </p>
        <Form className="" form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name={`name`}
            label={`Category Name`}
            rules={[
              {
                message: "Category Name is required",
                required : true
              },
            ]}
          >
            <Input className=" border outline-none" placeholder=""  />
          </Form.Item>
          <Form.Item label="Image" style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
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
                  <div className="flex items-center gap-2">
                    <PlusOutlined />
                    <div>Add Image</div>
                  </div>
                )}
              </Upload>
            </div>
          </Form.Item>

          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => {}}
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
              onClick={() => {
                setOpenAddModal(false);
              }}
              disabled={isLoading}
              className={`py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm ${isLoading && "bg-red-400"}`}
            >
              <RxCross2 /> Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
