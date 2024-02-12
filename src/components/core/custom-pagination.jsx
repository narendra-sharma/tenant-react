import { TablePagination } from '@mui/base';
import React, { useState } from "react";
const CustomPagination = ({ total, onPageChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleNavClick = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1, rowsPerPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onPageChange(1, parseInt(event.target.value, 10));
  };
  return (
    <TablePagination
        component="div" className="custom-pagination"
        onPageChange={handleNavClick}
        count={total} 
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default CustomPagination;
