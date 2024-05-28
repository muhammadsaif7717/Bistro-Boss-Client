import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../SectionTitle/SectionTitle";
import {  Elements, } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);

const Payment = () => {


    return (
        <div>
            <SectionTitle
                subHeading={`--- PLease Pay to Eat ---`}
                heading={`Payment`}
            ></SectionTitle>

            <div>
                <Elements stripe={stripePromise}>
                    < CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;