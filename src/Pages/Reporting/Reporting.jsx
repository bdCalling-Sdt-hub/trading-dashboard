import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Pagination, Popconfirm, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    useDeleteReportMutation,
  useGetAllReportQuery,
  useReplyReportMutation,
} from "../../redux/Api/ReportingApis";
import { imageUrl } from "../../redux/Api/baseApi";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const Reporting = () => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [feedback, setFeedback] = useState({});

  const [replyFeedback] = useReplyReportMutation();
  const { data: getAllReport } = useGetAllReportQuery(page);
  const [deleteReport] =  useDeleteReportMutation()
    console.log(getAllReport?.data?.meta);

  const dataSource = getAllReport?.data?.result?.map((feedback) => {
    return {
      key: feedback?._id,
      name: feedback?.userFrom?.name,
      email: feedback?.userFrom?.email,
      profile: feedback?.userFrom?.profile_image,
      reportAgainstName: feedback?.againstUser?.name,
      reportAgainstEmail: feedback?.againstUser?.email,
      reportAgainstImage: feedback?.againstUser?.profile_image,
      description: feedback?.description,
      time: feedback?.updatedAt?.split("T")[1]?.replace("Z", "")?.split(".")[0],
      status: feedback?.replayed,
      orderId: feedback?.swapId,
    };
  });
  console.log(dataSource);

  const handleDeleteReport =(id)=>{
    console.log(id);
    deleteReport(id).unwrap()
    .then((payload) => toast.success(payload?.message))
  .catch((error) => toast.error(error?.data?.message));

  }

  // const dataSource = [
  //     {
  //         key : '123',
  //         name : 'Sh',
  //         description : "des",
  //         time  : "1/2/32",
  //         status : "Pending"
  //     },
  //     {
  //         key : '123',
  //         name : 'Sh',
  //         description : "des",
  //         time  : "1/2/32",
  //         // status : "Replied"
  //     },
  // ]

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-5">
            <img
              src={`${imageUrl}${record?.profile}`}
              className="h-16 w-16"
              alt=""
            />
            <div>
              <p className="text-md">{record?.name}</p>
              <p className="text-[#4E4E4E] text-sm">{record?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Against Name",
      dataIndex: "reportAgainstName",
      key: "reportAgainstName",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-5">
            <img
              src={`${imageUrl}${record?.reportAgainstImage}`}
              className="h-16 w-16"
              alt=""
            />
            <div>
              <p className="text-md">{record?.reportAgainstName}</p>
              <p className="text-[#4E4E4E] text-sm">
                {record?.reportAgainstEmail}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => {
        return <p>{record?.description?.slice(0, 10)}</p>;
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let color = "blue";
        if (record?.status === true) color = "green";
        return (
          <div>
            <Button
              onClick={() => {
                setOpenModal(true);
                setFeedback(record);
              }}
              type="text"
              disabled={record?.status}
              icon={<FaReply />}
              style={{
                backgroundColor: color === "blue" ? "#E6E5F1" : "#E6F4EA",
                color: color === "blue" ? "#4A3AFF" : "#31A24C",
                fontWeight: "bold",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {record?.status ? "Replied" : "Pending"}
            </Button>
            {/* <Button
                            type="text"
                            icon={<DeleteOutlined />}

                        /> */}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center gap-2">
            <a href="#delete" onClick={() => {
                
            }} className="bg-[#3475F1] text-white p-1 rounded-md"><CiEdit size={20} /></a>
            <Popconfirm
                title="Delete the category!"
                description="Are you sure to delete this category?"
                okText="Yes"
                cancelText="No"
                onConfirm={() =>  handleDeleteReport(record?.key)}
            >
                <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-md"><RiDeleteBin6Line size={20} /></a>
            </Popconfirm>
        </div>
    ),
    },
  ];

  const onFinish = (value) => {
    const data = {
      description: value?.replyMessage,
    };

    console.log(value);
    replyFeedback({ id: feedback?.key, data })
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center  w-full pb-8">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <BsArrowLeftShort size={25} />
          </Link>
          Reporting
        </div>
      </div>
      <div className="table-container" style={{ padding: "20px" }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <div className="flex justify-center items-center mt-5">
          <Pagination onChange={(page)=> setPage(page)} pageSize={getAllReport?.data?.meta?.limit} total={getAllReport?.data?.meta?.total} />
        </div>
      </div>
      <Modal
        centered
        open={openModal}
        footer={false}
        onCancel={() => setOpenModal(false)}
      >
        <h1 className="text-xl">Feedback Reply</h1>
        <p>Feedback from : </p>
        <TextArea value={feedback?.description} />

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name={"replyMessage"} label="Your Reply">
            <TextArea rows={5} />
          </Form.Item>

          <div className="flex items-center justify-center">
            <button className="bg-[#3475F1] text-white px-6  py-2 rounded-md">
              Send
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default Reporting;
