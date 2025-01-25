import { Table } from 'antd';
import './subscription.css';
import { useState } from 'react';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import { useAllSubscriptionQuery } from '../../redux/Api/subscription';


const specificPageHeaderStyle = {
    backgroundColor: '#EAEAEA',
};





const SubscriptionTable = () => {
    const [singlePlanData, setSinglePlanData ] = useState();

    const {data : getAllSubscription} = useAllSubscriptionQuery()
    const [openAddModal, setOpenAddModal] = useState(false)


    const formattedTableData = getAllSubscription?.data?.subscriptions?.map((plan, i)=>{
        return {
            id : plan?._id,
            key: i + 1,
            subscriptionPlan: plan?.planName,
            membershipFee: plan?.fee,
            pointsRangeStart: plan?.pointRangeStart,
            pointsRangeEnd: plan?.pointRangeEnd,
            pointsPerSwap: `${plan?.swapPoint}`,
            pointsPerPositiveComment: plan?.positiveCommentPoint,
            pointsPerNegativeComment: plan?.negativeCommentPoint,
            productPriceLimit : plan?.productPriceLimit,  
            duration : plan?.duration
        }
    })

    // Columns items
    const columns = [
        {
            title: 'SL No.',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Subscription Plan',
            dataIndex: 'subscriptionPlan',
            key: 'subscriptionPlan',
        },
        {
            title: 'Membership Fee Per Month',
            dataIndex: 'membershipFee',
            key: 'membershipFee',
        },
        {
            title: 'Points Range Start',
            dataIndex: 'pointsRangeStart',
            key: 'pointsRangeStart',
        },
        {
            title: 'Points Range End',
            dataIndex: 'pointsRangeEnd',
            key: 'pointsRangeEnd',
        },
        {
            title: 'Point Earn Per Swap',
            dataIndex: 'pointsPerSwap',
            key: 'pointsPerSwap',
        },
        {
            title: 'Point Earn Per Positive Comment',
            dataIndex: 'pointsPerPositiveComment',
            key: 'pointsPerPositiveComment',
        },
        {
            title: 'Point Lose Per Negative Comment',
            dataIndex: 'pointsPerNegativeComment',
            key: 'pointsPerNegativeComment',
        },
        {
            title: 'Product Pice Limit',
            dataIndex: 'productPriceLimit',
            key: 'productPriceLimit',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_,record) => (
                <a href="#edit" onClick={() => handleSubscriptionEdit(record)} className='text-[#3475F1]'>Edit</a>
            ),
        },
    ];



    // Show even number row gray background color




    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'even-row' : '';
    };

    const handleSubscriptionEdit = (data) => {
        setOpenAddModal(!openAddModal)
        setSinglePlanData(data)
    }
    return (<div className="specific-page-table">
        <Table columns={columns} dataSource={formattedTableData} pagination={false} components={{
            header: {
                cell: (props) => (
                    <th {...props} style={specificPageHeaderStyle} />
                ),
            },

        }}
            rowClassName={rowClassName}
        />

        <SubscriptionModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} singlePlanData={singlePlanData} />
    </div>)
};

export default SubscriptionTable;
