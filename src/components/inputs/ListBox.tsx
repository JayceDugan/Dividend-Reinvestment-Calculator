// import { Listbox } from '@headlessui/react'
// import { useEffect, useState } from "react";
//
//
// const ListBox = <T extends ListBoxOption>(props: ListBoxProps<T>) => {
//
//   return (
//     <Listbox value={selectedOption} onChange={setSelectedOption}>
//       <Listbox.Button>{selectedOption.label}</Listbox.Button>
//       <Listbox.Options>
//         { options.map((option) => (
//           <Listbox.Option
//             key={option?.id}
//             value={option}
//           >
//             {option.label}
//           </Listbox.Option>
//         ))}
//       </Listbox.Options>
//     </Listbox>
//   )
// }
//
// export default ListBox

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
interface ListBoxOption {
  id: string;
  label: string;
  value: unknown;
}

interface ListBoxProps<OptionItem extends ListBoxOption> {
  label: string;
  options: OptionItem[];
  onChange: (value: OptionItem['value']) => unknown;
  value: OptionItem['value'];
}

export default function ListBox<T extends ListBoxOption>(
  props: ListBoxProps<T>
) {
  const { onChange, options, label, value } = props;
  const [selectedOption, setSelectedOption] = useState<ListBoxOption>(
    (options.find((option) => option.value === value) as ListBoxOption) ??
      options[0]
  );

  useEffect(() => {
    if (selectedOption.value !== value) {
      onChange(selectedOption.value);
    }
  }, [selectedOption, onChange, value]);

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <div>
          <Listbox.Label className='block text-xs font-medium leading-6 text-gray-900'>
            {label}
          </Listbox.Label>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
              <span className='block truncate capitalize'>
                {selectedOption.label}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9 capitalize'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate capitalize'
                          )}
                        >
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
