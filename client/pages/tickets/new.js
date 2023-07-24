import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {errors && <div className="alert alert-danger">{errors}</div>}
        <button className="btn btn-primary">Submit</button>
      </form>

      <style jsx>{`
        h1 {
          margin-bottom: 20px;
        }

        form {
          max-width: 400px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          font-weight: bold;
        }

        .btn-primary {
          margin-top: 15px;
        }

        .alert {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default NewTicket;
