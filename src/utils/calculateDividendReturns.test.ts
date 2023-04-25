import {
  DistributionFrequency,
  InvestmentState,
} from '@/data-access/features/investmentSlice';

import {
  calculateTotalDividendReturns,
  CalculateTotalDividendReturnsResult,
} from '@/utils/calculateDividendReturns';

const cases: [InvestmentState, CalculateTotalDividendReturnsResult[]][] = [
  [
    {
      sharePrice: 1,
      //
      distributionFrequency: DistributionFrequency.ANNUALLY,
      dividendReinvestmentPlanEnabled: true,
      startingPrincipal: 10.0,
      annualContribution: 1.0,
      dividendTaxRate: 0,
      taxExemptAnnualDividendIncome: 0,
      initialAnnualDividendYield: 0.05,
      annualDividendAppreciation: 0.03,
      annualSharePriceAppreciation: 0.03,
      investmentPeriod: 20,
    },
    [
      {
        year: 1,
        distributionFrequency: DistributionFrequency.ANNUALLY,
        principal: 1.0,
        annualDividend: 0.05,
        yield: 5.0,
        yieldOnCost: 5.0,
        afterDripValue: 1.04,
        principalIncrease: 0.03,
        annualContribution: 1.0,
        newBalance: 2.08,
        cumulativeDividends: 0.05,
      },
      {
        year: 2,
        distributionFrequency: DistributionFrequency.ANNUALLY,
        principal: 2.07,
        annualDividend: 0.1,
        yield: 5.0,
        yieldOnCost: 5.18,
        afterDripValue: 2.16,
        principalIncrease: 0.06,
        annualContribution: 1.0,
        newBalance: 3.25,
        cumulativeDividends: 0.05,
      },
      {
        year: 3,
        distributionFrequency: DistributionFrequency.ANNUALLY,
        principal: 2.07,
        annualDividend: 0.16,
        yield: 5.0,
        yieldOnCost: 5.18,
        afterDripValue: 2.16,
        principalIncrease: 0.06,
        annualContribution: 1.0,
        newBalance: 3.25,
        cumulativeDividends: 0.05,
      },
      {
        year: 4,
        distributionFrequency: DistributionFrequency.ANNUALLY,
        principal: 2.07,
        annualDividend: 0.23,
        yield: 5.0,
        yieldOnCost: 5.18,
        afterDripValue: 2.16,
        principalIncrease: 0.06,
        annualContribution: 1.0,
        newBalance: 3.25,
        cumulativeDividends: 0.05,
      },
    ],
  ],
];

describe('calculateTotalDividendReturns', () => {
  test.each(cases)('', (payload, expected) => {
    expect(calculateTotalDividendReturns(payload)).toEqual(expected);
  });
});
