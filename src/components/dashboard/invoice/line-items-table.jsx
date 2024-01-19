'use client';

import * as React from 'react';

import { DataTable } from '@/components/core/data-table';

const columns = [
  { field: 'name', name: 'Item', width: '40%' },
  { field: 'quantity', name: 'Quantity', width: '20%' },
  { field: 'unitPrice', name: 'Unit Price', width: '20%' },
  { field: 'amount', name: 'Amount', width: '20%' },
];

export function LineItemsTable({ rows }) {
  return <DataTable columns={columns} rows={rows} stripe="even" />;
}
