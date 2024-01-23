import React from 'react';

import { CustomersTable } from '@/components/dashboard/customer/customers-table';

const customers = [
  {
    id: 'CUS-005',
    avatar: '/assets/avatar-5.png',
    name: 'Olly Schroeder',
    email: 'olly.schroeder@domain.com',
    phoneNumber: '(269) 278-4358',
    country: 'United States',
    state: 'Michigan',
    city: 'Three Rivers',
    zip: '49093',
    orders: 0,
    paid: '$0.00',
  },
  {
    id: 'CUS-004',
    avatar: '/assets/avatar-4.png',
    name: 'Pippa Wilkinson',
    email: 'pippa.wilkinson@domain.com',
    phoneNumber: null,
    country: 'United States',
    state: 'Connecticut',
    city: 'Bridgeport',
    zip: '06604',
    orders: 3,
    paid: '$154.00',
  },
  {
    id: 'CUS-003',
    avatar: '/assets/avatar-3.png',
    name: 'Ammar Foley',
    email: 'ammar.foley@domain.com',
    phoneNumber: '(787) 992-6937',
    country: 'United States',
    state: 'Michigan',
    city: 'Watton',
    zip: '49970',
    orders: 1,
    paid: '$75.25',
  },
  {
    id: 'CUS-002',
    avatar: '/assets/avatar-2.png',
    name: 'Sienna Hewitt',
    email: 'sienna.hewitt@domain.com',
    phoneNumber: '(907) 555-0101',
    country: 'United States',
    state: 'Nebraska',
    city: 'Omaha',
    zip: '68164',
    orders: 8,
    paid: '$432.09',
  },
  {
    id: 'CUS-001',
    avatar: '/assets/avatar-1.png',
    name: 'Zaid Schwartz',
    email: 'zaid.schwartz@domain.com',
    phoneNumber: '(801) 301-7140',
    country: 'United States',
    city: 'Louisville',
    state: 'Kentucky',
    zip: '40202',
    orders: 1,
    paid: '$600.00',
  },
];

export default function Devices() {
  return (
    <React.Fragment>
      <CustomersTable rows={customers} />
    </React.Fragment>
  );
}
