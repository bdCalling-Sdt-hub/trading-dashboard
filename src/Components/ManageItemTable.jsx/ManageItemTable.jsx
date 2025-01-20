import { Form, Input, Modal, Popconfirm, Select, Spin, Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import { TbCopyCheck } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import {
  useDeleteSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetAllSubCategoryQuery,
} from "../../redux/Api/subCategoryApi";
import { toast } from "sonner";
import { imageUrl } from "../../redux/Api/baseApi";
import { useGetAllCategoryQuery } from "../../redux/Api/dashboardApi";
import { LoadingOutlined } from "@ant-design/icons";

const ManageItemTable = ({ search }) => {
  const [categories, setCategories] = useState([]);
  const [editSubCategoryData, setEditSubCategoryData] = useState();
  /** All Apis */
  const { data: getAllSubCategory } = useGetAllSubCategoryQuery(search);
  const { data: getAllCategory } = useGetAllCategoryQuery();
  const [updateSubCategory , {isLoading}] = useEditSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [form] = Form.useForm();
  /** Get all category */
  useEffect(() => {
    if (getAllCategory?.data) {
      setCategories(getAllCategory?.data);
    }
  }, [getAllCategory]);

  const columns = [
    {
      title: "SL No.",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record?.img}
            alt="user"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Sub Category",
      dataIndex: "SubCategory",
      key: "SubCategory",
    },
    {
      title: "Eligible Swap Member",
      dataIndex: "eligibleSwapMember",
      key: "eligibleSwapMember",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {/* Replace the action content with what you need, for example, icons */}
          <a
            href="#edit"
            onClick={() => {
              setEditSubCategoryData(record);
              setOpenAddModal(true);
            }}
            className="bg-[#3475F1] text-white p-1 rounded-md"
          >
            <CiEdit size={20} />
          </a>
          <Popconfirm
            title="Delete the sub category!"
            description="Are you sure to delete this sub category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteSubCategory(record?.key)}
          >
            <a
              href="#delete"
              className="bg-[#D9000A] text-white p-1 rounded-md"
            >
              <RiDeleteBin6Line size={20} />
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  /** delete sub category function */
  const handleDeleteSubCategory = (values) => {
    deleteSubCategory(values)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  // Columns data
  const tableData = getAllSubCategory?.data?.map((sub, i) => ({
    key: sub?._id,
    sno: i + 1,
    categoryId: sub?.category?._id,
    category: sub?.category?.name,
    img: `${imageUrl}${sub?.category?.image}`,
    SubCategory: sub?.name,
    eligibleSwapMember: sub?.swapLevel,
  }));

  const onFinish = (value) => {
    const id = editSubCategoryData?.key;
    const data = {
      name: value?.ItemName,
      swapLevel: value?.EligibleSwapLevel?.value,
      category: value?.Category?.value,
    };
    updateSubCategory({ id, data })
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenAddModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  useEffect(() => {
    if (editSubCategoryData) {
      form.setFieldsValue({
        ItemName: editSubCategoryData?.SubCategory,
      });
    }
  }, [form, editSubCategoryData]);

  return (
    <div className="">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} out of ${total}`,
          locale: {
            items_per_page: "",
            prev_page: "Previous",
            next_page: "Next",
          },
        }}
        className="custom-pagination"
      />

      <Modal
        open={openAddModal}
        centered
        footer={false}
        onCancel={() => setOpenAddModal(false)}
      >
        <div>
          <p className="text-xl text-center py-2 font-semibold">
            Edit Sub Category
          </p>
          <Form
            className=""
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{
              ItemName: editSubCategoryData?.SubCategory || "",
              Category: {
                value: editSubCategoryData?.categoryId || "",
                label: editSubCategoryData?.category || "Select a category",
              },
              EligibleSwapLevel: {
                value: editSubCategoryData?.swapLevel || "Gold",
                label: editSubCategoryData?.swapLevel || "Gold",
              },
            }}
          >
            <Form.Item
              name={`ItemName`}
              label={`Item Name`}
              rules={[
                {
                  message: "Item Name is required",
                },
              ]}
            >
              <Input className=" border outline-none" placeholder="" />
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
                defaultValue={{
                  value: editSubCategoryData?._id,
                  label: editSubCategoryData?.category,
                }}
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
                defaultValue={{
                  value: "Gold",
                  label: "Gold",
                }}
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
    </div>
  );
};

export default ManageItemTable;
