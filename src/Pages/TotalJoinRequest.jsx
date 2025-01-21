import React, { useState } from "react";
import JoinRequest from "../Components/Dashboard/JoinRequest";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePlanSubscriberQuery } from "../redux/Api/dashboardApi";
import { Pagination } from "antd";

const TotalJoinRequest = () => {
  const [page, setPage] = useState(1);
  const { data: getSubscriber } = usePlanSubscriberQuery(page);
  console.log(getSubscriber?.data?.meta);
  const tableData = getSubscriber?.data?.data?.map((user, i) => ({
    key: i + 1,
    id: user?._id,
    name: user?.user_id?.name,
    img: user?.user_id?.profile_image,
    contact: user?.phone_number,
    email: user?.email,
    location: user?.place_of_birth,
  }));
  return (
    <div>
      <div className="between-center  my-2 pt-5">
        <div className="start-center  mb-3 ">
          <Link to={-1} className=" py-1 px-2 rounded-md start-center gap-1">
            <IoArrowBackSharp />
          </Link>
          <p className="text-xl">New Join Request</p>
        </div>
        {/* <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" /> */}
      </div>
      <JoinRequest tableData={tableData} />
      <div className="flex justify-center mt-5">
        <Pagination
        onChange={(page)=> setPage(page)}
        total={getSubscriber?.data?.meta?.total}
        pageSize={getSubscriber?.data?.meta?.limit}
        />
      </div>
    </div>
  );
};

export default TotalJoinRequest;
