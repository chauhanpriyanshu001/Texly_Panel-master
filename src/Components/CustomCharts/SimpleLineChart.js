import { logDOM } from '@testing-library/react';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const demoData = [
   

  {
    name: 'Page B',
     value: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
     value: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
     value: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
     value: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
     value: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
     value: 3490,
    pv: 4300,
  },
];


const SimpleLineChart =({chartData})=> {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip"
        style={{
          backgroundColor:"var(--dark)",
          borderRadius:"var(--radius)",
          padding:'.5vw',
  
        }}
        >
          <p className="label">{`${payload[0].payload.name} : ${payload[0].value}`}</p>
  
        </div>
      );
    }
    return null;
  };
  
    const data=chartData?chartData:demoData;
// const  demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }

export default SimpleLineChart