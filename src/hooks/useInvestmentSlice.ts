import { useSelector } from 'react-redux';

import {
  InvestmentState,
  selectAnnualContribution,
  selectAnnualDividendAppreciation,
  selectAnnualSharePriceAppreciation,
  selectDistributionFrequency,
  selectDividendReinvestmentPlanEnabled,
  selectDividendTaxRate,
  selectInitialAnnualDividendYield,
  selectInvestmentPeriod,
  selectSharePrice,
  selectStartingPrincipal,
  selectTaxExemptAnnualDividendIncome,
  setAnnualContribution,
  setAnnualDividendAppreciation,
  setAnnualSharePriceAppreciation,
  setDistributionFrequency,
  setDividendReinvestmentPlanEnabled,
  setDividendTaxRate,
  setInitialAnnualDividendYield,
  setInvestmentPeriod,
  setSharePrice,
  setStartingPrincipal,
  setTaxExemptAnnualDividendIncome,
} from '@/data-access/features/investmentSlice';
import { useAppDispatch } from '@/data-access/hooks';

export const useInvestmentSlice = () => {
  /**
   * Selectors
   */
  const startingPrincipal = useSelector(selectStartingPrincipal);
  const investmentPeriod = useSelector(selectInvestmentPeriod);
  const annualContribution = useSelector(selectAnnualContribution);
  const initialAnnualDividendYield = useSelector(
    selectInitialAnnualDividendYield
  );
  const distributionFrequency = useSelector(selectDistributionFrequency);
  const annualDividendAppreciation = useSelector(
    selectAnnualDividendAppreciation
  );
  const dividendReinvestmentPlanEnabled = useSelector(
    selectDividendReinvestmentPlanEnabled
  );
  const annualSharePriceAppreciation = useSelector(
    selectAnnualSharePriceAppreciation
  );
  const taxExemptAnnualDividendIncome = useSelector(
    selectTaxExemptAnnualDividendIncome
  );
  const sharePrice = useSelector(selectSharePrice);
  const dividendTaxRate = useSelector(selectDividendTaxRate);

  /**
   * Methods
   */
  const dispatch = useAppDispatch();
  const updateInvestmentPeriod = (
    payload: InvestmentState['investmentPeriod']
  ) => dispatch(setInvestmentPeriod(payload));
  const updateAnnualContribution = (
    payload: InvestmentState['annualContribution']
  ) => dispatch(setAnnualContribution(payload));
  const updateStartingPrincipal = (
    payload: InvestmentState['startingPrincipal']
  ) => dispatch(setStartingPrincipal(payload));
  const updateDividendTaxRate = (payload: InvestmentState['dividendTaxRate']) =>
    dispatch(setDividendTaxRate(payload));
  const updateDividendReinvestmentPlanEnabled = (
    payload: InvestmentState['dividendReinvestmentPlanEnabled']
  ) => dispatch(setDividendReinvestmentPlanEnabled(payload));

  const updateInitialAnnualDividendYield = (
    payload: InvestmentState['initialAnnualDividendYield']
  ) => dispatch(setInitialAnnualDividendYield(payload));

  const updateTaxExemptAnnualDividendIncome = (
    payload: InvestmentState['taxExemptAnnualDividendIncome']
  ) => dispatch(setTaxExemptAnnualDividendIncome(payload));

  const updateAnnualSharePriceAppreciation = (
    payload: InvestmentState['annualSharePriceAppreciation']
  ) => dispatch(setAnnualSharePriceAppreciation(payload));

  const updateAnnualDividendAppreciation = (
    payload: InvestmentState['annualDividendAppreciation']
  ) => dispatch(setAnnualDividendAppreciation(payload));
  const updateDistributionFrequency = (
    payload: InvestmentState['distributionFrequency']
  ) => dispatch(setDistributionFrequency(payload));
  const updateSharePrice = (payload: InvestmentState['sharePrice']) =>
    dispatch(setSharePrice(payload));

  return {
    // Selectors
    startingPrincipal,
    investmentPeriod,
    annualContribution,
    initialAnnualDividendYield,
    distributionFrequency,
    annualDividendAppreciation,
    dividendReinvestmentPlanEnabled,
    annualSharePriceAppreciation,
    taxExemptAnnualDividendIncome,
    dividendTaxRate,
    sharePrice,
    // Methods
    updateStartingPrincipal,
    updateInvestmentPeriod,
    updateAnnualContribution,
    updateInitialAnnualDividendYield,
    updateDividendTaxRate,
    updateDividendReinvestmentPlanEnabled,
    updateTaxExemptAnnualDividendIncome,
    updateAnnualSharePriceAppreciation,
    updateAnnualDividendAppreciation,
    updateDistributionFrequency,
    updateSharePrice,
  };
};
