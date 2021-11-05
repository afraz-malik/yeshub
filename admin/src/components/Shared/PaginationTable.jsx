import React from "react";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationTable = ({ totalPages, currentPage, children, onPaginationClick }) => {
    return (
        <Table responsive>
            {children}
            {totalPages > 1 ? (
                <tfoot className="">
                    <tr>
                        <td className="text-center" colSpan={999}>
                            <Pagination className="pagination__nav">
                                {(() => {
                                    const paginationItems = [];
                                    for (let i = 1; i <= totalPages; i++) {
                                        paginationItems.push(
                                            <PaginationItem active={i === currentPage}>
                                                <PaginationLink
                                                    last={i === totalPages}
                                                    first={i === 1}
                                                    onClick={() => onPaginationClick(i)}
                                                >
                                                    {i}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }

                                    return paginationItems;
                                })()}
                            </Pagination>
                        </td>
                    </tr>
                </tfoot>
            ) : null}
        </Table>
    );
};

export default PaginationTable;
