import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addProduct} from '../../features/product/product_reducer_service';
import axios from 'axios';
import '../../assets/css/add_product.css';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        productName: '',
        price: 0,
        currency: 'USD',
        categoryName: '',
        description: '',
        imageUrls: [],
        specifications: [],
        reviews: [],
        discounts: [],
    });

    const [categories, setCategories] = useState([]);
    const [specTemplates, setSpecTemplates] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchSpecTemplates(selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {
        setProductData((prevProduct) => ({
            ...prevProduct,
            specifications: specTemplates.map((specTemplate) => ({
                specKey: specTemplate.specKey,
                specValue: '',
            })),
        }));
    }, [specTemplates]);

    const fetchSpecTemplates = async (categoryName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/spec-templates/${categoryName}`);
            setSpecTemplates(response.data);
        } catch (error) {
            console.error('Error fetching specification templates:', error);
        }
    };

    const handleSpecificationChange = (e, specKey) => {
        const {value} = e.target;

        const updatedSpecifications = productData.specifications.map((spec) =>
            spec.specKey === specKey ? {...spec, specValue: value} : spec
        );

        setProductData((prevProduct) => ({
            ...prevProduct,
            specifications: updatedSpecifications,
        }));
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === 'categoryName') {
            setSelectedCategory(value);
            setProductData((prevProduct) => ({
                ...prevProduct,
                [name]: value,
                specifications: [],
            }));
        } else if (name.startsWith('specifications')) {
            const specKey = name.replace('specifications.', '');
            const updatedSpecifications = [...productData.specifications];
            const existingSpec = updatedSpecifications.find((spec) => spec.specKey === specKey);

            if (existingSpec) {
                existingSpec.specValue = value;
            } else {
                updatedSpecifications.push({specKey, specValue: value});
            }

            setProductData((prevProduct) => ({
                ...prevProduct,
                specifications: updatedSpecifications,
            }));
        } else {
            setProductData((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const urls = Array.from(files).map((file) => URL.createObjectURL(file));
            setProductData((prevProduct) => ({
                ...prevProduct,
                imageUrls: [...prevProduct.imageUrls, ...urls],
            }));
        }
    };

    const handleClearImages = () => {
        setProductData((prevProduct) => ({
            ...prevProduct,
            imageUrls: [],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(addProduct(productData));
            setProductData({
                productName: '',
                price: 0,
                currency: 'USD',
                categoryName: '',
                description: '',
                imageUrls: [],
                specifications: [],
                reviews: [],
                discounts: [],
            });

            setSelectedCategory('');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product added successfully.',
            });
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add the product. Please try again.',
            });
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="image-section">
                    <label>Image Upload:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                    />
                    <button type="button" onClick={handleClearImages}>
                        Clear Images
                    </button>
                    {productData.imageUrls.length > 0 && (
                        <div>
                            <p>Selected Images:</p>
                            <ul>
                                {productData.imageUrls.map((url, index) => (
                                    <li key={index}>
                                        <img src={url} alt={`Image ${index + 1}`}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="product-details-section">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Currency:</label>
                    <select
                        name="currency"
                        value={productData.currency}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>

                    <label>Category:</label>
                    <select
                        name="categoryName"
                        value={selectedCategory}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>

                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        maxLength={1000}
                        required
                    />

                    {specTemplates.length > 0 && (
                        <div>
                            <label>Specification Templates:</label>
                            <ul>
                                {specTemplates.map((specTemplate) => (
                                    <li key={specTemplate.id}>
                                        <label>{specTemplate.specKey}:</label>
                                        <input
                                            type="text"
                                            name={`specifications.${specTemplate.specKey}`}
                                            value={
                                                productData.specifications.find(
                                                    (spec) => spec.specKey === specTemplate.specKey
                                                )?.specValue || ''
                                            }
                                            onChange={(e) =>
                                                handleSpecificationChange(e, specTemplate.specKey)
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
