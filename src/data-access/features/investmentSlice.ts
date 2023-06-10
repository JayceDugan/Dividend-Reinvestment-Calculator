import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export enum DistributionFrequency {
  MONTHLY = 'monthly',
  SEMIANNUALLY = 'semiannually',
  ANNUALLY = 'annually',
  QUARTERLY = 'quarterly',
}

export interface InvestmentState {
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
}

// Define the initial state using that type
const initialState: InvestmentState = {
  startingPrincipal: 10.0,
  initialAnnualDividendYield: 0.05,
  distributionFrequency: DistributionFrequency.QUARTERLY,
  annualContribution: 5.0,
  annualDividendAppreciation: 0.03,
  dividendReinvestmentPlanEnabled: true,
  dividendTaxRate: 0,
  annualSharePriceAppreciation: 0.03,
  taxExemptAnnualDividendIncome: 0,
  investmentPeriod: 21,
  sharePrice: 1.0,
};

export const investmentSlice = createSlice({
  name: 'investment',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStartingPrincipal: (
      state,
      action: PayloadAction<InvestmentState['startingPrincipal']>
    ) => {
      state.startingPrincipal = action.payload;
    },
    setInitialAnnualDividendYield: (
      state,
      action: PayloadAction<InvestmentState['initialAnnualDividendYield']>
    ) => {
      state.initialAnnualDividendYield = action.payload;
    },
    setDistributionFrequency: (
      state,
      action: PayloadAction<InvestmentState['distributionFrequency']>
    ) => {
      state.distributionFrequency = action.payload;
    },
    setAnnualContribution: (
      state,
      action: PayloadAction<InvestmentState['annualContribution']>
    ) => {
      state.annualContribution = action.payload;
    },
    setAnnualDividendAppreciation: (
      state,
      action: PayloadAction<InvestmentState['annualDividendAppreciation']>
    ) => {
      state.annualDividendAppreciation = action.payload;
    },
    setDividendReinvestmentPlanEnabled: (
      state,
      action: PayloadAction<InvestmentState['dividendReinvestmentPlanEnabled']>
    ) => {
      state.dividendReinvestmentPlanEnabled = action.payload;
    },
    setDividendTaxRate: (
      state,
      action: PayloadAction<InvestmentState['dividendTaxRate']>
    ) => {
      state.dividendTaxRate = action.payload;
    },
    setAnnualSharePriceAppreciation: (
      state,
      action: PayloadAction<InvestmentState['annualSharePriceAppreciation']>
    ) => {
      state.annualSharePriceAppreciation = action.payload;
    },
    setTaxExemptAnnualDividendIncome: (
      state,
      action: PayloadAction<InvestmentState['taxExemptAnnualDividendIncome']>
    ) => {
      state.taxExemptAnnualDividendIncome = action.payload;
    },
    setInvestmentPeriod: (
      state,
      action: PayloadAction<InvestmentState['investmentPeriod']>
    ) => {
      state.investmentPeriod = action.payload;
    },
    setSharePrice: (
      state,
      action: PayloadAction<InvestmentState['sharePrice']>
    ) => {
      state.sharePrice = action.payload;
    },
  },
});

export const {
  setAnnualDividendAppreciation,
  setAnnualSharePriceAppreciation,
  setInitialAnnualDividendYield,
  setDividendReinvestmentPlanEnabled,
  setDistributionFrequency,
  setTaxExemptAnnualDividendIncome,
  setDividendTaxRate,
  setStartingPrincipal,
  setAnnualContribution,
  setInvestmentPeriod,
  setSharePrice,
} = investmentSlice.actions;

export const selectAnnualDividendAppreciation = (state: RootState) =>
  state.investment.annualDividendAppreciation;
export const selectAnnualSharePriceAppreciation = (state: RootState) =>
  state.investment.annualSharePriceAppreciation;
export const selectInitialAnnualDividendYield = (state: RootState) =>
  state.investment.initialAnnualDividendYield;
export const selectDividendReinvestmentPlanEnabled = (state: RootState) =>
  state.investment.dividendReinvestmentPlanEnabled;
export const selectDistributionFrequency = (state: RootState) =>
  state.investment.distributionFrequency;
export const selectTaxExemptAnnualDividendIncome = (state: RootState) =>
  state.investment.taxExemptAnnualDividendIncome;
export const selectDividendTaxRate = (state: RootState) =>
  state.investment.dividendTaxRate;
export const selectAnnualContribution = (state: RootState) =>
  state.investment.annualContribution;
export const selectInvestmentPeriod = (state: RootState) =>
  state.investment.investmentPeriod;
export const selectStartingPrincipal = (state: RootState) =>
  state.investment.startingPrincipal;
export const selectSharePrice = (state: RootState) =>
  state.investment.sharePrice;

export default investmentSlice.reducer;
