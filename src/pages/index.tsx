import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { Fragment, useState } from 'react';

import DividendReturnsChart from '@/components/charts/DividendReturnsChart';
import InvestmentDetailsForm from '@/components/forms/InvestmentDetailsForm';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Layout>
        <Seo />

        {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
        <div className='h-screen'>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-50 lg:hidden'
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-gray-900/80' />
              </Transition.Child>

              <div className='fixed inset-0 flex'>
                <Transition.Child
                  as={Fragment}
                  enter='transition ease-in-out duration-300 transform'
                  enterFrom='-translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='translate-x-0'
                  leaveTo='-translate-x-full'
                >
                  <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-300'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                        <button
                          type='button'
                          className='-m-2.5 p-2.5'
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className='sr-only'>Close sidebar</span>
                          <XMarkIcon
                            className='h-6 w-6 text-white'
                            aria-hidden='true'
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2'>
                      <div className='flex h-16 shrink-0 items-center'>
                        <NextImage
                          imgClassName='h-8 w-auto'
                          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                          alt='Your Company'
                        />
                      </div>
                      <nav className='flex flex-1 flex-col'>
                        <InvestmentDetailsForm />
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
              <div className='flex h-16 shrink-0 items-center'>
                <NextImage
                  imgClassName='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                  alt='Your Company'
                  width={30}
                  height={30}
                />
              </div>
              <nav className='flex flex-1 flex-col'>
                <InvestmentDetailsForm />
              </nav>
            </div>
          </div>

          <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 text-sm font-semibold leading-6 text-gray-900'>
              Dashboard
            </div>
            <a href='#'>
              <span className='sr-only'>Your profile</span>
            </a>
          </div>

          <main className='lg:pl-72 h-full mt-auto py-10'>
            <DividendReturnsChart />
          </main>
        </div>
      </Layout>
    </>
  );
}
