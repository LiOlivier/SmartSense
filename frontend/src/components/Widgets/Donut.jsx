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
        '#BFA2DB',
        '#A1C9C1',
        '#F4BFBF',
        '#F7D9C4',
        '#B6D8F2',
        '#FFE382',
        '#C8E3D4'
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
        position: 'right',
        labels: {
          color: 'white',
        }
      },
    },
    cutout: '70%'
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default Donut;
