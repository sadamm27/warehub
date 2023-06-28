import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { allWarehouses } from '../allData';
import { useColorMode } from '@chakra-ui/react';
Chart.register(...registerables);


const BarChart = ({ data }) => {
  const { colorMode } = useColorMode();
  const barColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';

  // Extract product quantities from the data array
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Products Quantity',
        data: data.map((item) =>
          item.Products.reduce(
            (total, product) => total + product.WarehouseStock.quantity,
            0
          )
        ),
        backgroundColor: barColor,
        borderSkipped: 'bottom',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
        },
        grid: {
          display: false, // Remove y-axis grid lines
        },
      },
      x: {
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


  
const WarehouseBar = () => {
    const { warehouses } = allWarehouses();
  
    return (
      <div>
        <BarChart data={warehouses} />
      </div>
    );
};
  
  

export default WarehouseBar;
  
