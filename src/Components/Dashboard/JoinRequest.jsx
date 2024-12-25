import { Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../redux/Api/baseApi";


const JoinRequest = ({tableData}) => {
 
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="start-center gap-2">
            <img
              src={`${imageUrl}${record?.img}`}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email  ",
    },

    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact  ",
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location  ",
    },

    {
      title: "Actions",
      dataIndex: "key",
      key: "key",
      render: (_, record) => {
        return (
          <div className="start-center gap-1">
              <Link className="px-6 py-2 rounded-3xl text-black font-semibold bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white" to={`/single-user-details/${record?.id}`}>
                View
              </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="bg-[var(--color-7)] rounded-md">
      <Table dataSource={tableData} columns={columns} className="custom-pagination" pagination={false
        //   {
        //   pageSize: 5,
        //   showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
        //   locale: {
        //     items_per_page: '',
        //     prev_page: 'Previous',
        //     next_page: 'Next',
        //   },
        // }
      } />

    </div>
  );
};

export default JoinRequest;
