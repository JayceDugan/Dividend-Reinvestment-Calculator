import { useInvestmentSlice } from '@/hooks';

import { DistributionFrequency } from '@/data-access/features/investmentSlice';

import CurrencyInput from '@/components/inputs/CurrencyInput';
import ListBox from '@/components/inputs/ListBox';
import NumberInput from '@/components/inputs/NumberInput';

const InvestmentDetailsForm = () => {
  const {
    startingPrincipal,
    initialAnnualDividendYield,
    annualContribution,
    annualDividendAppreciation,
    dividendTaxRate,
    annualSharePriceAppreciation,
    taxExemptAnnualDividendIncome,
    investmentPeriod,
    distributionFrequency,
    dividendReinvestmentPlanEnabled,
    updateAnnualContribution,
    updateInvestmentPeriod,
    updateStartingPrincipal,
    updateInitialAnnualDividendYield,
    updateDividendTaxRate,
    updateDividendReinvestmentPlanEnabled,
    updateDistributionFrequency,
    updateTaxExemptAnnualDividendIncome,
    updateAnnualSharePriceAppreciation,
    updateAnnualDividendAppreciation,
  } = useInvestmentSlice();

  const DRIPOptions = [
    {
      id: 'drip-active',
      label: 'Active',
      value: true,
    },
    {
      id: 'drip-inactive',
      label: 'Inactive',
      value: false,
    },
  ];

  const distributionFrequencyOptions = Object.values(DistributionFrequency).map(
    (frequency) => {
      return {
        id: 'distribution-frequency-' + frequency,
        label: frequency,
        value: frequency,
      };
    }
  );

  const updateHandlerFunction =
    (handlerFunction: (payload: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handlerFunction(Number(e.target.value));

  return (
    <div className='flex flex-col gap-3'>
      <CurrencyInput
        label='Starting Principal'
        suffix=''
        value={startingPrincipal}
        onChange={updateHandlerFunction(updateStartingPrincipal)}
        min={0}
      />
      <NumberInput
        label='Initial Annual Dividend Yield'
        suffix='%'
        value={initialAnnualDividendYield}
        onChange={updateHandlerFunction(updateInitialAnnualDividendYield)}
        min={0}
      />
      <ListBox
        label='Distribution Frequency'
        options={distributionFrequencyOptions}
        onChange={updateDistributionFrequency}
        value={distributionFrequency}
      />
      <CurrencyInput
        label='Annual Contribution'
        onChange={updateHandlerFunction(updateAnnualContribution)}
        value={annualContribution}
        min={0}
      />
      <NumberInput
        label='Annual Dividend Appreciation %'
        suffix='%'
        value={annualDividendAppreciation}
        min={0}
        onChange={updateHandlerFunction(updateAnnualDividendAppreciation)}
      />
      <ListBox
        label='DRIP'
        options={DRIPOptions}
        onChange={updateDividendReinvestmentPlanEnabled}
        value={dividendReinvestmentPlanEnabled}
      />
      <NumberInput
        label='Dividend Tax Rate'
        suffix='%'
        value={dividendTaxRate}
        min={0}
        onChange={updateHandlerFunction(updateDividendTaxRate)}
      />
      <NumberInput
        label='Annual Share Price Appreciation'
        suffix='%'
        value={annualSharePriceAppreciation}
        min={0}
        onChange={updateHandlerFunction(updateAnnualSharePriceAppreciation)}
      />
      <CurrencyInput
        label='Tax exempt dividend income per year'
        suffix=''
        value={taxExemptAnnualDividendIncome}
        min={0}
        onChange={updateHandlerFunction(updateTaxExemptAnnualDividendIncome)}
      />
      <NumberInput
        label='Investment Period'
        suffix='years'
        step={1}
        min={1}
        onChange={updateHandlerFunction(updateInvestmentPeriod)}
        value={investmentPeriod}
      />
    </div>
  );
};

export default InvestmentDetailsForm;
