import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import { allRevenues, allExpenses } from "./allData";
import { useColorMode, Box, Text } from '@chakra-ui/react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ProfitLoss = () => {
    //usage revenues.revenues / revenues.revenues.totalRevenue
    //expenses.expenses.totalExpense
    const {colorMode} = useColorMode();
    const {revenues} = allRevenues();
    const {expenses} = allExpenses();
    const ratio = revenues.revenues.totalRevenue / expenses.expenses.totalExpense;
    const percentageDifference = ((ratio - 1) * 100).toFixed(2);
    const isPositive = percentageDifference >= 0;

    const chartData = {
      labels: ['Expenses', 'Revenue'],
      datasets: [
        {
          data: [expenses.expenses.totalExpense, revenues.revenues.totalRevenue],
          backgroundColor: colorMode === 'dark' ? ['#da7272', '#7289da'] : ['#fb997b', '#3bd1c7'],
          hoverBackgroundColor: colorMode === 'dark' ? ['rgba(255, 165, 0, 0.2)', 'rgba(114, 137, 218, 0.2)'] :  ['rgba(255, 99, 71, 0.2)', 'rgba(0, 128, 128, 0.2)'],
          borderColor: 'transparent',
        },
      ],
      options: { 
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              font: {
                size:5, 
              },
            },
          },
        },
      },
    };

    const PercentageMessage = () => {
      return (
        <Box mt={4} textAlign="center">
          <Text fontSize="sm" color={isPositive ? "green.300" : "red.300"}>
            {isPositive ? "+" : "-"}{percentageDifference}%
          </Text>
          <Text fontSize="sm" color={isPositive ? "green.300" : "red.300"}>
            {isPositive ? "Profit Gained" : "Lost Suffered"}
          </Text>
        </Box>
      );
    };

    const DoughnutChart = () => {
      return <Doughnut data={chartData}/>
    };
    
    
    return(
        <>
        <DoughnutChart />  
        <PercentageMessage />
        </>
    )
};

export default ProfitLoss