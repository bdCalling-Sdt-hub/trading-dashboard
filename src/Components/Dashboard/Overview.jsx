
import { Select } from 'antd';
import React, { PureComponent, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetUserGrowthQuery } from '../../redux/Api/dashboardApi';

const Overview = () => {
    const [year, setYear] = useState('2025')
    /**user growth API */
    const {data  : getUserGrowth} = useGetUserGrowthQuery(year);
    const chartData =  getUserGrowth?.data?.data?.map(data =>(
        {
            name : data?.month,
            uv : data?.count
        }
    )
  )
  
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
                <p className='text-2xl'>User Growth</p>
                <Select
                    defaultValue="2025"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={500}
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
                        <Bar dataKey="uv" stackId="a" fill="#3475F1" radius={[10, 10, 0, 0]}  />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Overview
