import React from "react";

const SkeletonCard = () => {
    return (
        <div className="animate-pulse bg-white p-4 rounded-2xl shadow-md">
            <div className="bg-gray-300 h-40 w-full rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
};

export default SkeletonCard;