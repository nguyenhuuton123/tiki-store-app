import React, {useEffect, useRef, useState} from "react";
import {ImCross} from "react-icons/im";
import {useDispatch, useSelector} from "react-redux";
import {decreaseQuantity, deleteItem, increaseQuantity, selectCartData,} from "../../features/product/cart_slice";
import {deleteCartItem, getCart, updateCart} from "../../features/product/product_reducer_service";
import isEqual from "lodash/isEqual";
import Swal from "sweetalert2";

const ItemCard = ({item}) => {
    const dispatch = useDispatch();
    const [cartChanged, setCartChanged] = useState(false);
    const {cartItems} = useSelector(selectCartData);
    const prevItemsRef = useRef(cartItems);

    const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(item))
        setCartChanged(true);
    };

    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity(item))
        setCartChanged(true);
    };

    const handleDeleteItem = () => {
        Swal.fire({
            icon: "warning",
            title: `Do you want to delete ${item.productName}?`,
            showCancelButton: true, // Add Cancel button
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCartItem(item)).then(() => {
                    dispatch(getCart());
                });
                setCartChanged(true);
            }
        });
    };

    useEffect(() => {
        if (cartChanged) {
            setCartChanged(false);
            if (!isEqual(prevItemsRef.current, cartItems)) {
                dispatch(updateCart({cartItems: cartItems}));
            }
        }
    }, [cartChanged, cartItems]);

    return (
        <div className="w-full grid grid-cols-5 mb-4 border py-2">
            <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
                <ImCross
                    onClick={handleDeleteItem}
                    className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
                />
                <img className="w-32 h-32" src={item.productImageUrl} alt="productImage"/>
                <h1 className="font-titleFont font-semibold">{item.productName}</h1>
            </div>
            <div
                className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
                <div className="flex w-1/3 items-center text-lg font-semibold">
                    ${(item.productPrice).toFixed(2)}
                </div>
                <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
              onClick={handleDecreaseQuantity}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
                    <p>{item.quantity}</p>
                    <span
                        onClick={handleIncreaseQuantity}
                        className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                    >
            +
          </span>
                </div>
                <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                    <p>${item.subTotal.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
