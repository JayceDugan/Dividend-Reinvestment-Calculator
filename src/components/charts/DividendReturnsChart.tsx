import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { useInvestmentSlice } from '@/hooks';

import { calculateTotalDividendReturns } from '@/utils/calculateDividendReturns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Calculated Dividend Returns',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      // beginAtZero: true
    },
  },
};

const DividendReturnsChart = () => {
  const {
    annualContribution,
    startingPrincipal,
    annualSharePriceAppreciation,
    dividendReinvestmentPlanEnabled,
    distributionFrequency,
    dividendTaxRate,
    annualDividendAppreciation,
    initialAnnualDividendYield,
    taxExemptAnnualDividendIncome,
    investmentPeriod,
    sharePrice,
  } = useInvestmentSlice();
  // const [returns, setReturns] = useEffect();

  const returns = calculateTotalDividendReturns({
    annualContribution,
    startingPrincipal,
    annualSharePriceAppreciation,
    dividendReinvestmentPlanEnabled,
    distributionFrequency,
    dividendTaxRate,
    annualDividendAppreciation,
    initialAnnualDividendYield,
    taxExemptAnnualDividendIncome,
    investmentPeriod,
    sharePrice,
  });

  const contributions = returns.map(
    (returnYear) => returnYear.annualContribution
  );
  const dividends = returns.map((returnYear) => returnYear.annualDividend);
  const yearlyBalances = returns.map((returnYear) => returnYear.newBalance);
  const labels = returns.map((returnYear) => {
    const date = new Date();

    date.setFullYear(date.getFullYear() + returnYear.year);

    return date.getFullYear();
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Contributions',
        data: contributions,
        backgroundColor: '#0047F5',
      },
      {
        label: 'Dividends',
        data: dividends,
        backgroundColor: '#ADD8E6',
      },
      {
        label: 'Balance',
        data: yearlyBalances,
        backgroundColor: '#33AFFF',
      },
    ],
  };

  return <Bar className='h-full w-full px-5' options={options} data={data} />;
};

export default DividendReturnsChart;
