import React, { useState } from "react";
import JoinRequest from "../Components/Dashboard/JoinRequest";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePlanSubscriberQuery } from "../redux/Api/dashboardApi";
import { Pagination } from "antd";
import { CiSearch } from "react-icons/ci";

const TotalJoinRequest = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const { data: getSubscriber } = usePlanSubscriberQuery({page , search});
  const tableData = getSubscriber?.data?.data?.map((user, i) => ({
    key: i + 1,
    id: user?._id,
    name: user?.user_id?.name,
    img: user?.user_id?.profile_image,
    contact: user?.phone_number,
    email: user?.email,
    location: user?.place_of_birth,
  }));

  console.log(tableData);
  return (
    <div>
      <div className="between-center  my-2 pt-5">
        <div className="start-center  mb-3 ">
          <Link to={-1} className=" py-1 px-2 rounded-md start-center gap-1">
            <IoArrowBackSharp />
          </Link>
          <p className="text-xl">New Join Request</p>
        </div>
        <div>
          <div className="relative">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch />
            </span>
          </div>
        </div>
      </div>
      <JoinRequest tableData={tableData} />
      <div className="flex justify-center mt-5">
        <Pagination
          onChange={(page) => setPage(page)}
          total={getSubscriber?.data?.meta?.total}
          pageSize={getSubscriber?.data?.meta?.limit}
        />
      </div>
    </div>
  );
};

export default TotalJoinRequest;
