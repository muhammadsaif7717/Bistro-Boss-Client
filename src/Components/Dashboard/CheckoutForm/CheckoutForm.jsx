import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecret from "../../../Hooks/useAxiosSecret";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const axiosSecure = useAxiosSecret();
    const [cart] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then((res) => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
            .catch(error => {
                console.error("Error creating payment intent:", error);
            });
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //
        if (!stripe || !elements) {
            return;
        }
        //
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        //
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        //
        if (paymentMethodError) {
            console.log('Payment Error', paymentMethodError);
            setError(paymentMethodError.message);
            return;
        }
        else {
            console.log('Payment Method', paymentMethod);
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'unknown',
                    },
                },
            });
        if (confirmError) {
            console.log("Confirm Error")
        }
        else {
            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('Your Payment Is Successfull', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                //now save the payment in database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post(`/payments`, payment)
                console.log(res.data)
                if (res.data.paymentResult.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Payment is Successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    //navigate
                    setTimeout(() => {
                        navigate('/');
                    }, 1700);
                }

            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-info">
                    Pay
                </button>
                <p className="text-red-500">{error}</p>
                {
                    transactionId &&
                    <p className="text-green-500">Your Transaction Id is: {transactionId}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;