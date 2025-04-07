import React, { useState } from "react";
import SpecialOffers from "../../components/home/special_offers/special_offers";
import Breadcrumbs from "../../components/page_props/breadcrumbs";

const Offer = () => {
  const [prevLocation] = useState("");

  return (
    <div className="max-w-container mx-auto">
      <Breadcrumbs title="Offer" prevLocation={prevLocation} />
      <div className="pb-10">
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Offer;
