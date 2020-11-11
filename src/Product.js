import React from 'react'
import './Product.css'
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, rating, price }) {
    const [{cart}, dispatch] = useStateValue();
    // console.log("This is the cart ",cart)
    
    const addToCart = () => {
    // dispath an action as item into data layer
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating:rating
            }
        })
}

    return (
        <div className='product'>
            <div className="product__info">
                <p>{title}</p>
                <p className='product_price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => (
                    <StarIcon />
                    ))}
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick = {addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product
