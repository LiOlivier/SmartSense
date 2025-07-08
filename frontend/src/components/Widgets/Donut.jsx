import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Donut = ({ data }) => {
  const labels = data.map(d => d.label);
  const values = data.map(d => d.value);

  const backgroundColors = [
    '#e87dff', '#a05aff', '#8758e0',
    '#c28dfc', '#dcb0ff', '#f2e0ff', '#ded9ff'
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        }
      },
    },
    cutout: '60%'
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default Donut;
