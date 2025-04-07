import React, {useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Product from "../../home/products/product";
import "../../../assets/css/pagination.css"

function Items({currentItems}) {

    return (
        <>
            {currentItems.map((item) => (
                <div key={item.id} className="w-full ">
                    <Product
                        _id={item.id}
                        img={item.imageUrls.length > 0 ? item.imageUrls[0] : 'default-image.jpg'}
                        productName={item.productName}
                        price={item.price}
                        categoryName={item.categoryName}
                        description={item.description}
                        specifications={item.specifications.map(spec => `${spec.specKey}: ${spec.specValue}`).join(', ')}
                        discounts={item.discounts}
                    />
                </div>
            ))}
        </>
    );
}

const Pagination = ({itemsPerPage, products, currentPage, setCurrentPage}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const {content = [], totalPages = 0} = products || {};

    const handlePageChange = (event) => {
        setCurrentPage(event.selected);
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
                <Items currentItems={content}/>
            </div>
            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between  focus:ring-0">

                <ReactPaginate
                    previousLabel={<button className="btn btn-prev">Previous</button>}
                    nextLabel={<button className="btn btn-next">Next</button>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    containerClassName="pagination flex items-center justify-center space-x-2 my-4"
                    activeClassName="active"
                    pageClassName="page-item"
                    pageLinkClassName="pagination-link"
                    activeLinkClassName="pagination-link-active"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="pagination-link"
                    nextLinkClassName="pagination-link"
                    disabledClassName="disabled"
                />

                <p className="text-base font-normal text-lightText">
                    Showing page {currentPage + 1} of {totalPages}
                </p>
            </div>
        </div>
    );
};

export default Pagination;