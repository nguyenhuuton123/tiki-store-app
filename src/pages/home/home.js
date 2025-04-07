import React from "react";
import Banner from "../../components/banner/banner";
import BannerBottom from "../../components/banner/banner_bottom";
import BestSellers from "../../components/home/best_sellers/best_sellers";
import NewArrivals from "../../components/home/new_arrivals/new_arrivals";
import Sale from "../../components/home/sale/sale";
import SpecialOffers from "../../components/home/special_offers/special_offers";
import YearProduct from "../../components/home/year_product/year_product";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
