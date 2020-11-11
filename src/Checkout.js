import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'



function Checkout() {
    const [{ cart, user }, dispatch] = useStateValue()

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <h3>Hello, {user?.email}</h3>
                <h2 className='checkout__title'>
                    Shopping Cart</h2>
                    
                    {cart.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}
                        />
            ))}

                
            </div>
            <div className='checkout__right'>
                <Subtotal />
            </div>
        </div>
    )

}

export default Checkout;
