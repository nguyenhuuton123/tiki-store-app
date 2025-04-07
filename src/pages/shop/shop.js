import React, {useEffect, useState} from "react";
import Breadcrumbs from "../../components/page_props/breadcrumbs";
import Pagination from "../../components/page_props/shop_page/pagination";
import ProductBanner from "../../components/page_props/shop_page/product_banner";
import ShopSideNav from "../../components/page_props/shop_page/shop_side_nav";
import {useDispatch, useSelector} from "react-redux";
import {productListSelector} from "../../features/product/product_slice";
import {getProducts} from "../../features/product/product_reducer_service";
import SkeletonCard from "../../components/design_layouts/skeleton_card";

const Shop = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const dispatch = useDispatch();
    const products = useSelector(productListSelector);
    const [currentPage, setCurrentPage] = useState(0);
    const {loading} = useSelector((state) => state.products);

    const itemsPerPageFromBanner = (itemsPerPage) => {
        setItemsPerPage(itemsPerPage);
    };

    useEffect(() => {
        dispatch(getProducts({page: currentPage, size: itemsPerPage}));
    }, [dispatch, currentPage, itemsPerPage]);

    if (loading) {
        return (
            <div className="max-w-container mx-auto px-4 py-10">
                <Breadcrumbs title="Products"/>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {Array.from({length: 6}).map((_, idx) => (
                        <SkeletonCard key={idx}/>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Products"/>
            {/* ================= Products Start here =================== */}
            <div className="w-full h-full flex pb-20 gap-10">
                <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
                    <ShopSideNav/>
                </div>
                <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
                    <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner}/>
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

export default Shop;
