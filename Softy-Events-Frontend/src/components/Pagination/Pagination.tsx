import {
  setCurrentPageToPagination,
  setItemsPerPageToPagination,
} from '@src/store/slices/sittingSlice/sittingSlice';
import React, { useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useAppDispatch } from '../../store/index';
import { getAllClient } from '../../store/slices/clientSlice/clientThunk';
import { getRoles } from '../../store/slices/role/roleThunk';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  isUserTable: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  isUserTable,
}) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    isUserTable
      ? dispatch(
          getAllClient({
            page: currentPage + 1,
            pageSize: itemsPerPage,
            orderBy: 'createdAt',
            order: 'desc',
          })
        )
      : dispatch(getRoles({ page: currentPage + 1, pageSize: itemsPerPage }))
    dispatch(setCurrentPageToPagination(currentPage + 1));
    dispatch(setItemsPerPageToPagination(itemsPerPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    isUserTable
      ? dispatch(
          getAllClient({
            page: currentPage - 1,
            pageSize: itemsPerPage,
            orderBy: 'createdAt',
            order: 'desc',
          })
        )
      : dispatch(getRoles({ page: currentPage - 1, pageSize: itemsPerPage }))
    dispatch(setCurrentPageToPagination(currentPage - 1));
    dispatch(setItemsPerPageToPagination(itemsPerPage));
  };

  const handlePageChange = (page: number) =>
  {

    setCurrentPage(page);
    isUserTable
      ? dispatch(
          getAllClient({ page: page, pageSize: itemsPerPage, orderBy: 'createdAt', order: 'asc' })
        )
      : dispatch(getRoles({ page: page, pageSize: itemsPerPage }))
    dispatch(setCurrentPageToPagination(page));
    dispatch(setItemsPerPageToPagination(itemsPerPage));
  };

  const formatPageNumber = (pageNumber: number) => {
    return pageNumber < 10 ? `0${pageNumber}` : `${pageNumber}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() =>
          {
            i!==currentPage&&handlePageChange(i)
          }}
          className={`pagination-button ${
            currentPage === i && 'pagination-button-active'
          }`}
        >
          {formatPageNumber(i)}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button className="prev-next-btns" onClick={handlePreviousPage} disabled={currentPage === 1}>
        <BsArrowLeftShort />
        <p>Previous</p>
      </button>
      <div className="pagination-button-page-number">{renderPageNumbers()}</div>
      <button
        className="prev-next-btns"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <p>Next</p>
        <BsArrowRightShort />
      </button>
    </div>
  )
};

export default Pagination;
