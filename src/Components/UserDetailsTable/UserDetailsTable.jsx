import { Pagination, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { useBlockUserMutation, useGetAllUserQuery } from "../../redux/Api/dashboardApi";
import { imageUrl } from "../../redux/Api/baseApi";
import { toast } from "sonner";
import { useState } from "react";
const UserDetailsTable = ({ search }) => {
    const [page, setPage] = useState(1)
    const { data: getAllUser, isLoading } = useGetAllUserQuery({ search, page })
    const [blockUser] = useBlockUserMutation()
    const columns = [
        {
            title: 'S. No.',
            dataIndex: 'sno',
            key: 'sno',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={record?.img} alt="user" style={{ width: 30, height: 30, marginRight: 8 }} />
                    {text}
                </div>
            ),
        },
        {
            title: 'Member Since',
            dataIndex: 'memberSince',
            key: 'memberSince',
        },
        {
            title: 'Membership Type',
            dataIndex: 'membershipType',
            key: 'membershipType',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, render) => (
                <div onClick={() => handleBlockUser(render?.key)} className={`cursor-pointer   ${render?.isBlock ? "text-red-500" : 'text-gray-500'}`}>
                    <MdBlockFlipped size={20} />
                </div>
            ),
        },
    ];

    /** handle block user  */
    const handleBlockUser = (id) => {
        blockUser(id).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
            })
            .catch((error) => toast.error(error?.data?.message));
    }

    const formattedTableData = getAllUser?.data?.map((user, i) => {
        const currentPage = getAllUser?.meta?.page || 1;
        const limit = getAllUser?.meta?.limit || 10;
        const sno = (currentPage - 1) * limit + i + 1;
        return {
            key: user?._id,
            sno: sno,
            name: user?.name,
            img: `${imageUrl}${user?.profile_image}`,
            memberSince: user?.createdAt?.split("T")[0],
            membershipType: user?.userType,
            email: user?.email,
            contactNumber: user?.phone_number,
            location: user?.address || 'Not Available',
            isBlock: user?.is_block
        }
    })


    // Columns data




    return (
        <div className="p-2 ">

            <Table
                columns={columns}
                dataSource={formattedTableData}
                pagination={false}
                className="custom-pagination"
            />
            <div className="flex justify-center mt-4">
                <Pagination
                    onChange={page => setPage(page)}
                    pageSize={getAllUser?.meta?.limit}
                    total={getAllUser?.meta?.total}
                />
            </div>

        </div>
    )
}

export default UserDetailsTable;