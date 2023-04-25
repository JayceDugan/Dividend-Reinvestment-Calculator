import { DistributionFrequency } from '@/data-access/features/investmentSlice';

type CalculateTotalDividendReturnsPayload = {
  startingPrincipal: number;
  sharePrice: number;
  initialAnnualDividendYield: number;
  distributionFrequency: DistributionFrequency;
  annualContribution: number;
  annualDividendAppreciation: number;
  dividendReinvestmentPlanEnabled: boolean;
  dividendTaxRate: number;
  annualSharePriceAppreciation: number;
  taxExemptAnnualDividendIncome: number;
  investmentPeriod: number;
};

export interface CalculateTotalDividendReturnsResult {
  year: number;
  distributionFrequency: DistributionFrequency;
  principal: number;
  annualDividend: number;
  yield: number;
  yieldOnCost: number;
  afterDripValue: number;
  principalIncrease: number;
  annualContribution: number;
  newBalance: number;
  cumulativeDividends: number;
}

type CalculateAnnualDividend = (
  payload: CalculateTotalDividendReturnsPayload,
  currentYear: number
) => number;
const calculatedDividendYieldPercentage = (
  currentYear: number,
  payload: CalculateTotalDividendReturnsPayload
) => {
  return Number(
    payload.initialAnnualDividendYield +
      payload.annualDividendAppreciation * currentYear
  ).toFixed(2);
};
const calculateAnnualDividend: CalculateAnnualDividend = (
  payload,
  currentYear
) => {
  return Number(
    Number(calculatedDividendYieldPercentage(currentYear, payload)) *
      Number(payload.sharePrice)
  );
};

type CalculateTotalDividendReturns = (
  payload: CalculateTotalDividendReturnsPayload,
  currentYear?: number,
  totalDividendReturns?: CalculateTotalDividendReturnsResult[]
) => CalculateTotalDividendReturnsResult[];
export const calculateTotalDividendReturns: CalculateTotalDividendReturns = (
  payload,
  currentYear = 1,
  totalDividendReturns = []
) => {
  const calculationsComplete = currentYear > payload.investmentPeriod;

  if (calculationsComplete) {
    return totalDividendReturns;
  }

  const annualDividend = calculateAnnualDividend(payload, currentYear);
  const yieldPercentage = calculatedDividendYieldPercentage(
    currentYear,
    payload
  );
  const principal =
    Number(payload.startingPrincipal) +
    payload.annualContribution * (currentYear - 1);
  const yieldOnCost = Number((annualDividend / principal) * 100).toFixed(2);
  const afterDripValue = payload.dividendReinvestmentPlanEnabled
    ? Number(principal + annualDividend).toFixed(2)
    : Number(principal).toFixed(2);
  const principalIncrease = Number(
    Number(afterDripValue) - Number(payload.startingPrincipal)
  ).toFixed(2);
  const newBalance = Number(
    Number(afterDripValue) + Number(payload.annualContribution) * currentYear
  ).toFixed(2);
  const cumulativeDividends = totalDividendReturns.reduce(
    (acc, item) => acc + item.annualDividend,
    annualDividend
  );

  return calculateTotalDividendReturns(payload, currentYear + 1, [
    ...totalDividendReturns,
    {
      year: currentYear,
      distributionFrequency: payload.distributionFrequency,
      principal,
      annualDividend,
      yield: yieldPercentage,
      yieldOnCost,
      afterDripValue,
      principalIncrease,
      annualContribution: payload.annualContribution,
      newBalance,
      cumulativeDividends,
    },
  ]);
};
