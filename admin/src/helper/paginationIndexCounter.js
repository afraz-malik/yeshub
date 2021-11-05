const paginationIndexCounter = (currentPage, index, limit = 10) => {
    return (currentPage - 1) * limit + (index + 1);
};

export default paginationIndexCounter;
