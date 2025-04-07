import React, {useEffect, useState} from "react";
import Breadcrumbs from "../../components/page_props/breadcrumbs";
import Pagination from "../../components/page_props/shop_page/pagination";
import ProductBanner from "../../components/page_props/shop_page/product_banner";
import ShopSideNav from "../../components/page_props/shop_page/shop_side_nav";
import {useDispatch, useSelector} from "react-redux";
import {productListSelector} from "../../features/product/product_slice";
import {getProductsByCategory} from "../../features/product/product_reducer_service";
import {useParams} from "react-router-dom";

const Category = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const dispatch = useDispatch();
    const products = useSelector(productListSelector);
    const [currentPage, setCurrentPage] = useState(0);
    const params = useParams();
    const categoryName= params.categoryName;
    const itemsPerPageFromBanner = (itemsPerPage) => {
        setItemsPerPage(itemsPerPage);
    };

    useEffect(() => {
        dispatch(getProductsByCategory({categoryName, page: currentPage, size: itemsPerPage }));
    }, [dispatch, currentPage, itemsPerPage, categoryName]);

    if(!products) {
        return <p>Unable to fetch products</p>
    }

    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Products" />
            {/* ================= Products Start here =================== */}
            <div className="w-full h-full flex pb-20 gap-10">
                <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
                    <ShopSideNav />
                </div>
                <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
                    <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        products={products}
                    />
                </div>
            </div>
            {/* ================= Products End here ===================== */}
        </div>
    );
};

export default Category;
