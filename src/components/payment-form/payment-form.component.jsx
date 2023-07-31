import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useState } from "react";

import {useSelector} from 'react-redux';

import {selectCartTotal} from '../../store/cart/cart.selector';

import {selectCurrentUser} from '../../store/user/user.selector';

import Button from "../button/button.component";

import './payment-form.styles.scss';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment , setIsProcessingPayment] = useState(false);


    const paymentHandler = async (e) => {
        e.reventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

            const {paymentInten: { client_secret }} = response;

            console.log(client_secret)

            const paymentResult = await stripe.confirmCardPayment(client_secret , {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: currentUser ? currentUser.displayName : 'Guest',
                    },
                },
            });

            setIsProcessingPayment(false);


            if(paymentResult.error){
                alert(paymentResult.error);
            } else {
                if(paymentResult.paymentIntent.status === 'succeeded'){
                    alert('Payment Successful')
                }
            }
    };

    return (
        <div className="container" onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement />
            <Button disabled = {isProcessingPayment} buttonType={Button}> Pay now </Button>
        </div>
    )
}


export default PaymentForm;