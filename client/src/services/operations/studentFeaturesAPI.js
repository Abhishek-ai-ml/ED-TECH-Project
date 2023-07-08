import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import rzpL from '../../assets/Logo/'
import { setPaymentLoading } from "../../slices/courseSlice";


const { studentEndpoints } = require("../apis");


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading();
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        //initiate order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {Authorisation: `Bearer ${token}`});

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const options = {
            key:process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank You for purchasing the course",
            image:rzpL,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                verifyPayment({...response, courses}, token, navigate, dispatch);

            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response)  {
            toast.error("Oops! payment failed")
            console.log(response.error)
        })
    }catch(error) {
        console.log("Payment API ERROR .....", error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {
            Authorisation: `Bearer ${token}`
        })
    }catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR.....", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {Authorisation: `Bearer ${token}`});

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successfull, You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error) {
        console.log("PAYMENT VERIFY ERROR", error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}