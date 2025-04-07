import React from "react";
import Brand from "./shop_by/brand";
import Category from "./shop_by/category";
import Color from "./shop_by/color";
import Price from "./shop_by/price";

const ShopSideNav = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Category icons={false}/>
            <Color/>
            <Brand/>
            <Price/>
        </div>
    );
};

export default ShopSideNav;
