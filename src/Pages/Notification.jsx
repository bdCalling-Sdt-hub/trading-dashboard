import { Button, Table } from 'antd';
import { IoArrowBackSharp } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDeleteNotificationMutation, useGetAllNotificationQuery } from '../redux/Api/dashboardApi';
import { toast } from 'sonner';


const Notification = () => {
    const { data: getAllNotification, isLoading } = useGetAllNotificationQuery()
    const [deleteNotification] = useDeleteNotificationMutation()
    const timeAgo = (timestamp) => {
        const now = new Date();
        const createdAt = new Date(timestamp);
        const differenceInMs = now - createdAt;

        const minutes = Math.floor(differenceInMs / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    const allNotification = getAllNotification?.data?.allNotification?.map((notification, i) => {
        return {
            key: notification?._id,
            notification: notification?.message,
            time: timeAgo(notification?.createdAt)
        }
    })

    const columns = [
        {
            dataIndex: 'notification',
            key: 'notification',
            render: text => <span>{text}</span>,
        },
        {
            dataIndex: 'time',
            key: 'time',
            width: '150px',
            render: text => <span>{text}</span>,
        },
        {
            key: 'action',
            width: '50px',
            render: (text, record) => (
                <Button type="text" icon={<RiDeleteBin6Line size={20} className='text-[#D9000A]' />} onClick={() => handleDelete(record.key)} />
            ),
        },
    ];
    const handleDelete = (id) => {
        // console.log(`Delete notification with key: ${key}`);
        deleteNotification(id).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    }
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <button
                    className="text-[#242424] text-[20px] font-semibold flex items-center gap-2"
                >
                    Notifications
                </button>

            </div>
            <div>
                <h2 className='text-[18px] font-semibold py-2'>Total {getAllNotification?.data?.allNotification?.length} Notifications</h2>
                <Table columns={columns} dataSource={allNotification} pagination={false
                    //     {
                    //     pageSize: 5,
                    //     showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                    //     locale: {
                    //         items_per_page: '',
                    //         prev_page: 'Previous',
                    //         next_page: 'Next',
                    //     },
                    // }
                }
                    className="custom-pagination" />
            </div>
        </div>
    );
}

export default Notification
