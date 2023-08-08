import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const formatTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (timeLeft < 0) {
    return <div className="alert alert-danger">Order Expired</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Time left to pay: {formatTimeLeft(timeLeft)} seconds</h4>
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey="pk_test_51NWiwHBdLuFrfIVOWvzQ3GxJnyz6oUUOgijOqN9jOzabndE9dETWB7Cc4HO4jGe1csKL3Td6nt97gCxbqutqxvdJ00xVVBrvjk"
            amount={order.ticket.price * 100}
            email={currentUser.email}
            style={{ width: '100%' }}
          />
          {errors && <div className="alert alert-danger mt-4">{errors}</div>}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
        
        .card {
          width: 40%;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .alert-danger {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
