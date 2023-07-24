import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{ticket.title}</h1>
          <h4 className="card-subtitle mb-2 text-muted">Price: ${ticket.price}</h4>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <button onClick={() => doRequest()} className="btn btn-primary">
            Purchase
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          width: 40%;
          height: 30%
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .card-body {
          padding: 20px;
        }

        .card-title {
          font-size: 24px;
          font-weight: bold;
        }

        .card-subtitle {
          font-size: 18px;
          color: #666;
        }

        .btn-primary {
          margin-top: 20px;
          width: 100%;
        }

        .alert {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
