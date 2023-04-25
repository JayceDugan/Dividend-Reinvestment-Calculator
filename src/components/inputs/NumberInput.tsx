interface NumberInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  suffix?: string;
}

export default function NumberInput(props: NumberInputProps) {
  const { label, suffix, ...inputProps } = props;

  return (
    <div>
      <label
        htmlFor='price'
        className='block text-xs font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='relative mt-1 rounded-md shadow-sm'>
        <input
          type='number'
          min='0'
          step='1'
          name='price'
          id='price'
          className='block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='0'
          aria-describedby='price-currency'
          {...inputProps}
        />
        {suffix && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              {suffix}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
