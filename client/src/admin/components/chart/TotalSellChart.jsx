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
        current: 2000,
        last: 1500
    },
    {
        day: '02',
        current: 2000,
        last: 1500
    },
    {
        day: '03',
        current: 2000,
        last: 1500
    },
    {
        day: '04',
        current: 2000,
        last: 1500
    },
    {
        day: '05',
        current: 2000,
        last: 1500
    },
    {
        day: '06',
        current: 2000,
        last: 1500
    },
    {
        day: '07',
        current: 2000,
        last: 1500
    },
    {
        day: '08',
        current: 2000,
        last: 1500
    },
    {
        day: '09',
        current: 2000,
        last: 1500
    },
    {
        day: '10',
        current: 2000,
        last: 1500
    },
    {
        day: '11',
        current: 2000,
        last: 1500
    },
    {
        day: '12',
        current: 2000,
        last: 1500
    },
    {
        day: '13',
        current: 2000,
        last: 1500
    },
    {
        day: '14',
        current: 2000,
        last: 1500
    },
    {
        day: '15',
        current: 2000,
        last: 1500
    },
    {
        day: '16',
        current: 2000,
        last: 1500
    },
    {
        day: '17',
        current: 2000,
        last: 1500
    },
    {
        day: '18',
        current: 2000,
        last: 1500
    },
    {
        day: '19',
        current: 2000,
        last: 1500
    },
    {
        day: '20',
        current: 2000,
        last: 1500
    },
    {
        day: '21',
        current: 2000,
        last: 1500
    },
    {
        day: '22',
        current: 2000,
        last: 1500
    },
    {
        day: '23',
        current: 2000,
        last: 1500
    },
    {
        day: '24',
        current: 2000,
        last: 1500
    },
    {
        day: '25',
        current: 2000,
        last: 1500
    },
    {
        day: '26',
        current: 2000,
        last: 1500
    },
    {
        day: '27',
        current: 2000,
        last: 1500
    },
    {
        day: '28',
        current: 2000,
        last: 1500
    },
    {
        day: '29',
        current: 2000,
        last: 1500
    },
    {
        day: '30',
        current: 2000,
        last: 1500
    },
    {
        day: '31',
        current: 2000,
        last: 1500
    },

];

const CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
        return (
            <div className='bg-white px-3 py-1 rounded-md border-solid border-gray-200 border shadow-2xl'>
                <div className='flex gap-3 items-center mt-1 text-xs font-semibold text-gray-600'><div className='w-[12px] h-[12px] rounded-full bg-current'></div> {props.currentmonth} {props.label} : {props.payload[0].value}</div>
                <div className='flex gap-3 items-center mt-1 text-xs font-semibold text-gray-600'><div className='w-[12px] h-[12px] rounded-full bg-last'></div>  {props.lastmonth} {props.label} : {props.payload[1].value}</div>
            </div>
        );
    }

    return null;
};

const TotalSellChart = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mt-10">
                <div>
                    <h1 className='text-2xl font-bold text-black_500'>Total Sells</h1>
                    <p className='text-gray-500 text-base -mt-1'>Payment received across all channels</p>
                </div>
                {/* <input type="text" name="price" id="price" className="block w-[300px]" placeholder="0.00" /> */}
                <select name="" id="" className='w-full md:w-[400px]'>
                    <option value=""></option>
                </select>
            </div>

            <div className="w-full h-[350px] mt-[20px]">
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 10,
                            bottom: 10
                        }}
                    >
                        <CartesianGrid horizontal="" vertical="true" strokeOpacity='0.5' />
                        <XAxis dataKey="day" interval={0} hide />
                        {/* <YAxis /> */}
                        <Tooltip content={<CustomTooltip active label payload currentmonth='Feb' lastmonth='Jan' />} />
                        <Line type="monotone" dataKey="current" stroke="#8884d8" strokeWidth={1.5}
                        />
                        <Line type="monotone" dataKey="last" stroke="#82ca9d" strokeWidth={1.5} />
                    </LineChart>
                </ResponsiveContainer>
                <div className="border-solid border-t border-gray-300 flex justify-between items-center mx-2 mt-1"></div>
            </div>
        </>
    )
}

export default TotalSellChart;