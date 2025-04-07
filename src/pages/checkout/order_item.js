import React from "react";

const OrderItem = ({ item }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex items-center">
                <img
                    className="w-16 h-16 rounded"
                    src={item.productImageUrl}
                    alt={item.productName}
                />

                <h3 className="ml-4 font-medium text-gray-700">{item.productName}</h3>
            </div>

            <div className="mt-4 flex justify-between text-gray-600">

                <div>
                    <span className="font-medium">Price:</span> ${item.productPrice.toFixed(2)}
                </div>
                <div>
                    <span className="font-medium">Qty:</span> {item.quantity}
                </div>

                <div className="flex items-center">


                    <div>
                        <span className="font-medium">Subtotal:</span> ${item.subTotal.toFixed(2)}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default OrderItem;