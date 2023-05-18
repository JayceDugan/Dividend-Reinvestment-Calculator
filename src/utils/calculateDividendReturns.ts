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
) =>
  Number(payload.initialAnnualDividendYield) +
  Number(payload.annualDividendAppreciation * currentYear);
const calculateAnnualDividend: CalculateAnnualDividend = (
  payload,
  currentYear
) =>
  calculatedDividendYieldPercentage(currentYear, payload) *
  Number(payload.sharePrice);

type CalculateTotalDividendReturns = (
  payload: CalculateTotalDividendReturnsPayload,
  currentYear: number,
  totalDividendReturns?: CalculateTotalDividendReturnsResult[]
) => CalculateTotalDividendReturnsResult[];
export const calculateTotalDividendReturns: CalculateTotalDividendReturns = (
  payload,
  currentYear = 1,
  totalDividendReturns = []
) => {
  const calculationsComplete =
    Number(currentYear) > Number(payload.investmentPeriod);

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
    Number(payload.annualContribution) * (Number(currentYear) - 1);
  const yieldOnCost = (Number(annualDividend) / Number(principal)) * 100;
  const afterDripValue = payload.dividendReinvestmentPlanEnabled
    ? Number(principal) + Number(annualDividend)
    : Number(principal);
  const principalIncrease =
    Number(afterDripValue) - Number(payload.startingPrincipal);
  const newBalance =
    Number(afterDripValue) +
    Number(payload.annualContribution) * Number(currentYear);

  const cumulativeDividends = totalDividendReturns.reduce(
    (acc, item) => Number(acc) + Number(item.annualDividend),
    Number(annualDividend)
  );

  return calculateTotalDividendReturns(payload, Number(currentYear) + 1, [
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
