import { Col, Form, Input, Modal, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { Select } from "antd";
import { TbCopyCheck } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import ManageItemTable from "../Components/ManageItemTable.jsx/ManageItemTable";
import ManageCategoryTable from "../Components/ManageCategoryTable/ManageCategoryTable";
import CategoryModal from "../Components/CategoryModal/CategoryModal";
import { useGetAllCategoryQuery } from "../redux/Api/dashboardApi";
import {
  useCreateSubCategoryMutation,
  useGetAllSubCategoryQuery,
} from "../redux/Api/subCategoryApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;
const ManageItems = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(true);
  const { data: getAllCategory } = useGetAllCategoryQuery();
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();
  const { data: getAllSubCategory } = useGetAllSubCategoryQuery();

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [search, setSearch] = useState({});

  /** Get all category */
  useEffect(() => {
    if (getAllCategory?.data) {
      setCategories(getAllCategory?.data);
    }
  }, [getAllCategory]);

  const onFinish = (value) => {
    const data = {
      name: value?.name,
      swapLevel: value?.EligibleSwapLevel?.label,
      category: value?.Category?.value,
    };
    createSubCategory(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenAddModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleSelectChange = (value, label) => {
    setSearch({ value, label });
  };
  return (
    <div className="shadow-md rounded-md px-2">
      <div className="  my-2 pt-5">
        <div className="start-center gap-2 mb-3 ">
          <p className="flex items-center gap-2">
            <Link to={-1}>
              <BsArrowLeftShort size={25} />
            </Link>
            Manage Items
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setCategory(true)}
              className={` ${
                category
                  ? "bg-[#3475F1] text-white"
                  : "border border-[#3475F1] text-[#3475F1]"
              } px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}
            >
              Category
            </button>
            <button
              onClick={() => setCategory(false)}
              className={` ${
                category
                  ? "border border-[#3475F1] text-[#3475F1]"
                  : "bg-[#3475F1] text-white"
              }  px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}
            >
              Sub Category
            </button>
          </div>

          {category ? (
            <button
              onClick={() => setOpenCategoryModal(true)}
              className="bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
            >
              <FaPlus />
              Add category
            </button>
          ) : (
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#3475F1] px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
            >
              <FaPlus />
              Add Sub Category
            </button>
          )}
        </div>
      </div>

      {/* Category section */}

      {!category && (
        <Form layout="horizontal">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Category"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  onChange={(value) => handleSelectChange(value, "category")}
                  defaultValue="all"
                >
                  <Option value="all">All</Option>
                  {getAllCategory?.data?.map((category) => (
                    <Option key={category._id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Sub Category"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="pb-0"
              >
                <Select
                  onChange={(value) =>
                    handleSelectChange(value, "sub_category")
                  }
                  defaultValue="all"
                >
                  <Option value="all">All</Option>
                  {getAllSubCategory?.data?.map((subCategory) => (
                    <Option value={subCategory?.name}>
                      {subCategory?.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Eligible Swap Member"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  onChange={(value) => handleSelectChange(value, "swapLevel")}
                  defaultValue="all"
                >
                  <Option value="all">All</Option>
                  <Option value="Gold">Gold</Option>
                  <Option value="Platinum">Platinum</Option>
                  <Option value="Diamond">Diamond</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      {category ? <ManageCategoryTable /> : <ManageItemTable search={search} />}

      <CategoryModal
        setOpenAddModal={setOpenCategoryModal}
        openAddModal={openCategoryModal}
      />

      <Modal
        open={openAddModal}
        centered
        footer={false}
        onCancel={() => setOpenAddModal(false)}
      >
        <div>
          <p className="text-xl text-center py-2 font-semibold">
            Add Sub Category
          </p>
          <Form className="" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name={`name`}
              label={`Sub Category Name`}
              rules={[
                {
                  message: "Item Name is required",
                },
              ]}
            >
              <Input
                className=" border outline-none"
                placeholder="Sub category name"
              />
            </Form.Item>
            <Form.Item
              name={`Category`}
              label={`Category`}
              rules={[
                {
                  message: "Category is required",
                  required: true,
                },
              ]}
            >
              <Select
                labelInValue
                placeholder="Select a category"
                options={categories?.map((category) => ({
                  label: category?.name,
                  value: category?._id,
                }))}
              />
            </Form.Item>
            <Form.Item
              name={`EligibleSwapLevel`}
              label={`Eligible swap level`}
              rules={[
                {
                  message: "Eligible swap level is required",
                  required: true,
                },
              ]}
            >
              <Select
                labelInValue
                placeholder="Select A swap level"
                options={[
                  {
                    value: "Gold",
                    label: "Gold",
                  },
                  {
                    value: "Platinum",
                    label: "Platinum",
                  },
                  {
                    value: "Diamond",
                    label: "Diamond",
                  },
                ]}
              />
            </Form.Item>
            <div className="flex items-center gap-2">
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
              <button className="py-2 px-4 flex items-center gap-1 bg-red-600 text-white font-semibold rounded-sm">
                <RxCross2 /> Cancel
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageItems;
