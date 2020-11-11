import React, { useState ,useEffect} from 'react'
import './Payment.css'    
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'
import { Link ,useHistory} from 'react-router-dom';
import {CardElement,useStripe,useElements, Elements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import { getCartTotal } from './reducer';
import axios from './axios'


function Payment() {
    const [{ cart, user }, dispatch] = useStateValue()
    const history = useHistory();
    const stripe = useStripe()
    const element = useElements()

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error,setError] =useState(null)
    const [disabled,setDisabled] =useState(true)
    const [clientSecret, setClientSecret] = useState(true) // for telling that stripe i ahve somthing
    
    useEffect(() => {
        //generate special stripe secrete ehich allow us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expext the total in a currencies subunits  
                url:`/payments/create?total=${getCartTotal(cart) * 100}`
            })  
            //console.log(response)
                setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [cart])

    console.log('The client secret is >>>', clientSecret)
    
    const handleSubmit = async (event) => {
        //stripe fancy stuff
        event.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card:element.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent == payment confirmation
            setSucceeded(true);
            setError(true);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            })
            history.replace('/orders')
        })
    }
    const handleChange = event => {
        //listen for change in cardElement
        //and display any error as the customer type their card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{ cart?.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>    
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>53 shivpuri-b</p>
                        <p>gangapur city (raj-322201)</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
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
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                    <h3>Payment Method</h3>
                    </div>                    
                    <div className="payment__details">{/* Stripe */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>     
                                           
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹ "}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{ processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

    
export default Payment
