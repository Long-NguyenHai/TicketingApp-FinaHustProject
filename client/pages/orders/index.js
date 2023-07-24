const OrderIndex = ({ orders }) => {
  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ticket Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ticket.title}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }

        .table {
          width: 60%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ccc;
        }

        th {
          font-weight: bold;
          background-color: #f2f2f2;
        }

        tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
