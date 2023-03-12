import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const data = [
    {
        day: '01',
        current: 5,
    },
    {
        day: '02',
        current: 10,
    },
    {
        day: '03',
        current: 7,
    },
    {
        day: '04',
        current: 20,
    },
    {
        day: '05',
        current: 30,
    },
    {
        day: '06',
        current: 5,
    },
    {
        day: '07',
        current: 2,
    },
];

const CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
        return (
            <div className='bg-white px-3 py-1 rounded-md border-solid border-gray-200 border shadow-lg '>
                <div className='flex gap-3 items-center text-xs font-semibold text-gray-600'><div className='w-[12px] h-[12px] rounded-full bg-current'></div> {props.currentmonth} {props.label} : {props.payload[0].value}</div>
            </div>
        );
    }

    return null;
};

const NewCustomerChart = () => {
    return (
        <div className='p-3 bg-white border-solid border border-gray-200 shadow-sm rounded-lg'>
            <div className="flex justify-between items-start ">
                <div>
                    <h1 className='text-[16px] text-black_500 font-semibold'>New customers</h1>
                    <p className='text-sm text-gray-500'>Last 7 days</p>
                </div>
                <h1 className='text-lg text-black_500 font-semibold'>356</h1>
            </div>

            {/* Charts */}
            <div className="w-full flex justify-center items-center py-5">
                <div className="h-[150px] w-full">
                    <ResponsiveContainer>
                        <LineChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray='0 3' />
                            <XAxis dataKey="day" interval={0} hide />
                            {/* <YAxis /> */}
                            <Tooltip cursor={false} content={<CustomTooltip active label payload currentmonth='Feb' />} />
                            <Line type="monotone" dataKey="current" stroke="#8884d8" strokeWidth={1.5}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Range day */}
            <div className="mt-3 pt-1 flex justify-between items-center border-solid border-t border-gray-200">
                <p className="text-black_500 text-xs font-medium">1 Jan</p>
                <p className="text-black_500 text-xs font-medium">7 Jan</p>
            </div>
        </div>
    )
}

export default NewCustomerChart;