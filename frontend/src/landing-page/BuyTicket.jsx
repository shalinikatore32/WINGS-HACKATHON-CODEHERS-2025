import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const BASE_URL = process.env.REACT_APP_API_URL;
console.log(
  "Stripe Publishable Key:",
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function BuyTicket() {
  const { eventId, ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketAndPaymentIntent = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/events/${eventId}/tickets/${ticketId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ticket: ${response.statusText}`);
        }
        const data = await response.json();
        setTicket(data);

        // Create payment intent
        const paymentIntentResponse = await fetch(
          `${BASE_URL}/events/${eventId}/tickets/${ticketId}/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: 1 }), // Assuming purchasing one ticket
          }
        );

        if (!paymentIntentResponse.ok) {
          throw new Error(
            `Failed to create payment intent: ${paymentIntentResponse.statusText}`
          );
        }

        const paymentIntentData = await paymentIntentResponse.json();
        setClientSecret(paymentIntentData.clientSecret);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketAndPaymentIntent();
  }, [eventId, ticketId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Error confirming card payment:", error);
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Ticket purchased successfully!");
      navigate(`/events/${eventId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buy Ticket</h1>
      {ticket && (
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">{ticket.ticket_type}</h2>
          <p>Price: ${ticket.price}</p>
          <p>Available: {ticket.quantity - ticket.sold}</p>
          <form onSubmit={handleSubmit}>
            <CardElement className="mt-4 p-2 border rounded" />
            <button
              type="submit"
              disabled={!stripe}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Purchase
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function BuyTicketWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <BuyTicket />
    </Elements>
  );
}
