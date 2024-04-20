import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductList from './ProductList'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Filter({search, category}){
    const [option, setOption] = useState(false)
    const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
      ]
      const subCategories = [
        { name: 'Totes', href: '#' },
        { name: 'Backpacks', href: '#' },
        { name: 'Travel Bags', href: '#' },
        { name: 'Hip Bags', href: '#' },
        { name: 'Laptop Sleeves', href: '#' },
      ]
      const filters = [
        {
          id: 'color',
          name: 'Color',
          options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
          ],
        },
        {
          id: 'category',
          name: 'Category',
          options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
          ],
        },
        {
          id: 'size',
          name: 'Size',
          options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
          ],
        },
      ]

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return(
        <div className=' p-5'>
            <div className=''>
                <div onClick={() => setOption(!option)} className='flex items-center gap-2 cursor-pointer'>
                    <p className=' uppercase'>Áo</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                        </svg>
                    </div>
                </div>
                {
                    option &&
                    (
                        <div className=' text-sm px-5 flex flex-col gap-2'>
                            <p className=' cursor-pointer'>Áo thun</p>
                            <p className=' cursor-pointer'>ÁO sơ mi</p>
                            <p className=' cursor-pointer'>Áo POLO</p>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Filter