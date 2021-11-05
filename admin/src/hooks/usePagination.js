import { useState } from "react";

/**
 *
 * @param {number} totalPages
 * @param {number} currentPage
 */
export default function usePagination(totalPages = 1, currentPage = 1, limit = 10) {
    const [currentPageState, setCurrentPage] = useState(currentPage);
    const [totalPagesState, setTotalPages] = useState(totalPages);
    const [limitState, setLimit] = useState(limit);

    /**
     * Update current page
     * @param {number} index
     */
    const changePagination = (index) => {
        setCurrentPage(index);
    };

    /**
     * Update current page
     * @param {number} limit
     */
    const changeLimit = (lim) => {
        setLimit(lim);
    };

    /**
     * Set total pages
     * @param {number} total
     */
    const changeTotalPages = (total) => {
        setTotalPages(total);
    };

    return {
        currentPage: currentPageState,
        totalPages: totalPagesState,
        limit: limitState,
        changePagination,
        changeTotalPages,
        changeLimit,
    };
}
