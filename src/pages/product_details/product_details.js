import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Breadcrumbs from "../../components/page_props/breadcrumbs";
import ProductInfo from "../../components/page_props/product_details/product_info";
import {getProductByName} from "../../features/product/product_reducer_service";
import {useDispatch, useSelector} from "react-redux";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import {imagesToGallery} from "../../utils/utils"
import "../../assets/css/product_details.css"

const ProductDetails = () => {
    const location = useLocation();
    const params = useParams();
    const productName = params.productName;
    const [prevLocation, setPrevLocation] = useState("");
    const dispatch = useDispatch();
    const productInfo = useSelector(state => state.products.value) || {};

    function formatProductName(productName) {
        const words = productName.split('-');
        const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return formattedWords.join(' ');
    }

    const renderImageGallery = () => {

        // Convert to gallery format
        const galleryImages = productInfo.imageUrls
            ? imagesToGallery(productInfo.imageUrls)
            : [];
        return (
            <ImageGallery
                items={galleryImages}
                showThumbnails={true}
                showFullscreenButton={false}
                showPlayButton={false}
                autoPlay={true}
            />
        );

    }


    useEffect(() => {
        dispatch(getProductByName(formatProductName(productName)));
    }, [productName, dispatch]);

    return (
        <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
            <div className="max-w-container mx-auto px-4">
                <div className="xl:-mt-10 -mt-7">
                    <Breadcrumbs title="" prevLocation={prevLocation}/>
                </div>
                <div
                    className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
                    {/*<div className="h-full">*/}
                    {/*  <ProductsOnSale />*/}
                    {/*</div>*/}
                    <div className="image-gallery col-span-2 md:col-span-1 xl:col-span-3">
                        {renderImageGallery()}
                    </div>
                    <div
                        className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-4 justify-center">
                        {Object.keys(productInfo).length === 0 ? (
                            <div>Loading...</div>
                        ) : (
                            <ProductInfo productInfo={productInfo}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
