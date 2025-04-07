import React, {useEffect, useState} from "react";
import OrderItem from "./order_item";
import axios from "axios";
import {submitOrder} from "../../features/product/product_reducer_service";
import {resetCart} from "../../features/product/cart_slice";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

const CheckoutForm = ({cart}) => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {customerName} = useSelector((state) => state.auth);

    const fetchCities = async () => {
        try {
            const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleCityChange = (e) => {
        const selectedCityId = e.target.value;
        const selectedCity = cities.find((city) => city.Id === selectedCityId);
        if (selectedCity) {
            setDistricts(selectedCity.Districts || []);
            setWards([]);
            setCity(selectedCity.Name);
        } else {
            setDistricts([]);
        }
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const selectedDistrict = districts.find((district) => district.Id === selectedDistrictId);
        if (selectedDistrict) {
            setWards(selectedDistrict.Wards || []);
            setDistrict(selectedDistrict.Name);
        } else {
            setWards([]);
        }
    };

    const handleWardChange = (e) => {
        const selectedWardId = e.target.value;
        const selectedWard = wards.find((ward) => ward.Id === selectedWardId);
        if (selectedWard) {
            setWard(selectedWard.Name);
        }
    };

    const orderItems = cart.cartItems;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!city || !district || !ward || street.trim() === "") {
            alert("Please fill in all address fields before placing the order.");
            return;
        }
        const orderDTO = {
            addressDTO: {
                street,
                city,
                district,
                ward,
            },
            total: cart.totalPrice,
            items: cart.cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                subTotal: item.subTotal,
            })),
        };
        dispatch(submitOrder(orderDTO));
        dispatch(resetCart());
        Swal.fire({
            icon: "success",
            title: "Order Placed, please check your email!",
            showConfirmButton: true
        });
        navigate("/");
    };

    return (
        <div className="max-w-container mx-auto px-4">
            <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5 mb-4">
                        <label className="block text-xs font-semibold text-gray-600">Customer Name</label>
                        <div
                            className="w-full py-2 px-3 rounded-md focus:outline-none focus:border-primeColor">
                            {customerName}
                        </div>
                    </div>

                    <div className="col-span-5 mb-4">
                        <label className="block text-xs font-semibold text-gray-600">City</label>
                        <select
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
                            onChange={handleCityChange}
                        >
                            <option value="" disabled selected>Select City</option>
                            {cities.map((city) => (
                                <option key={city.Id} value={city.Id}>{city.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-5 mb-4">
                        <label className="block text-xs font-semibold text-gray-600">District</label>
                        <select
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
                            onChange={handleDistrictChange}
                        >
                            <option value="" disabled selected>Select District</option>
                            {districts.map((district) => (
                                <option key={district.Id} value={district.Id}>{district.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-5 mb-4">
                        <label className="block text-xs font-semibold text-gray-600">Ward</label>
                        <select
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
                            onChange={handleWardChange}
                        >
                            <option value="" disabled selected>Select Ward</option>
                            {wards.map((ward) => (
                                <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-6 mb-4">
                        <label className="block text-xs font-semibold text-gray-600">Street</label>
                        <input
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
                            type="text"
                            placeholder="Enter street"
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>


                    <div className="col-span-12 mb-4">
                        <h2 className="text-lg font-bold mb-2">Order Items</h2>
                        {orderItems.map((item) => (
                            <div key={item._id}>
                                <OrderItem item={item}/>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-12 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total Price:</span>
                            <span className="text-lg font-bold text-primeColor">{cart.totalPrice.toFixed(2)} USD</span>
                        </div>
                    </div>

                    <div className="col-span-12 mb-4">
                        <button
                            type="submit"
                            className="w-full bg-primeColor text-white py-2 px-4 rounded-full hover:bg-black focus:outline-none focus:shadow-outline"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
