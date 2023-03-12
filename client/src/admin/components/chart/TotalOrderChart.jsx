import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {
        day: "01",
        uv: 4000,
        pv: 2400,
    },
    {
        day: "02",
        uv: 3000,
        pv: 1398,
    },
    {
        day: "03",
        uv: 2000,
        pv: 9800,
    },
    {
        day: "04",
        uv: 2780,
        pv: 3908,
    },
    {
        day: "05",
        uv: 1890,
        pv: 4800,
    },
    {
        day: "06",
        uv: 2390,
        pv: 3800,
    },
    {
        day: "07",
        uv: 3490,
        pv: 4300,
    }
];

const CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
        return (
            <div className='bg-white px-3 py-1 rounded-md border-solid border-gray-200 border shadow-2xl'>
                <div className='flex gap-3 items-center mt-1 text-xs font-semibold text-gray-600'><div className='w-[12px] h-[12px] rounded-full bg-current'></div>{props.currentmonth} {props.label} : {props.payload[0].value}</div>
                <div className='flex gap-3 items-center mt-1 text-xs font-semibold text-gray-600'><div className='w-[12px] h-[12px] rounded-full bg-last'></div>{props.currentmonth} {props.label} : {props.payload[1].value}</div>
            </div>
        );
    }

    return null;
};

const TotalOrderChart = () => {
    return (
        <div className='p-3 bg-white border-solid border border-gray-200 shadow-sm rounded-lg'>
            <div className="flex justify-between items-start ">
                <div>
                    <h1 className='text-[16px] text-black_500 font-semibold'>Total orders</h1>
                    <p className='text-sm text-gray-500'>Last 7 days</p>
                </div>
                <h1 className='text-lg text-black_500 font-semibold'>16,247</h1>
            </div>

            {/* Charts */}
            <div className="flex justify-center items-center py-5 ">
                <BarChart
                    width={170}
                    height={150}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="0 3" />
                    <XAxis dataKey="day" interval={0} hide />
                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip currentmonth="Jan" />} />
                    <Bar dataKey="pv" stackId="a" barSize={5} radius={[0, 0, 10, 10]} fill="#8884d8" />
                    <Bar dataKey="uv" stackId="a" barSize={5} radius={[10, 10, 0, 0]} fill="#82ca9d" />
                </BarChart>
            </div>

            {/* Complete in percent */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-2 bg-current rounded-sm"></div>
                    <p className='text-black_500 text-xs font-medium'>Completed</p>
                </div>
                <p className='text-black_500 text-xs font-medium'>52%</p>
            </div>

            {/* Pending payment in percent */}
            <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-2 bg-last rounded-sm"></div>
                    <p className='text-black text-xs font-medium'>Pending payment</p>
                </div>
                <p className='text-black text-xs font-medium'>48%</p>
            </div>


        </div>
    )
}

export default TotalOrderChart;