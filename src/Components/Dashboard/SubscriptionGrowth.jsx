
import { Select } from 'antd';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetSubscriptionGrowthQuery } from '../../redux/Api/dashboardApi';
const data = [
    {
        name: 'Jan',
        uv: 20,
        mt: 10,
    },
    {
        name: 'Feb',
        uv: 30,
        mt: 20,
    },
    {
        name: 'Mar',
        uv: 90,
        mt: 30,
    },
    {
        name: 'Apr',
        uv: 100,
        mt: 40,
    },
    {
        name: 'May',
        uv: 30,
        mt: 50,
    },
    {
        name: 'Jun',
        uv: 10,
        mt: 60,
    },
    {
        name: 'Aug',
        uv: 15,
        mt: 70,
    },
    {
        name: 'Sep',
        uv: 20,
        mt: 80,
    },
    {
        name: 'Nov',
        uv: 30,
        mt: 90,
    },
    {
        name: 'Dec',
        uv: 10,
        mt: 100,
    },
];

const SubscriptionGrowth = () => {
    const [year, setYear] = useState('2024')
    const {data : getSubscription} =  useGetSubscriptionGrowthQuery(year)
    // console.log(getSubscription?.data?.data);
    console.log(getSubscription);


    
    const data = getSubscription?.data?.data?.map((subscription)=>{
        return (
               { 
                name: subscription?.month,
                uv: subscription?.count,
            }
        )
    })
       
    const handleChange = (value) => {
        setYear(value);
    };
    const items = [

        {
            label: 2024,
            value: "2024",
        },
        {
            label: 2025,
            value: "2025",
        },
        {
            label: 2026,
            value: "2026",
        },
        {
            label: 2027,
            value: "2027",
        },
    ];
    return (
        <>
            <div className='between-center'>
                <p className='text-2xl'>Subscription Growth</p>
                <Select
                    defaultValue="2024"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#3475F1" opacity={1} fillOpacity={1} fill="#3475F1" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default SubscriptionGrowth
