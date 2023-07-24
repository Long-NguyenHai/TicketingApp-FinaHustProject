import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="signup-container">
      <form onSubmit={onSubmit} className="signup-form">
        <h1 className="signup-heading">Sign Up</h1>
        <div className="form-group">
          <label className="signup-label">Email Address</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control signup-input"
          />
        </div>
        <div className="form-group">
          <label className="signup-label">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control signup-input"
          />
        </div>
        {errors && <div className="alert alert-danger">{errors}</div>}
        <button className="btn btn-primary signup-button">Sign Up</button>
      </form>

      <style jsx>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .signup-form {
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          background-color: #f9f9f9;
        }

        .signup-heading {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .signup-label {
          font-size: 16px;
          font-weight: bold;
        }

        .signup-input {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .signup-button {
          width: 100%;
        }

        .alert {
          margin-top: 20px;
        }

        .alert-danger {
          color: #721c24;
          background-color: #f8d7da;
          border-color: #f5c6cb;
          padding: 8px;
          border: 1px solid transparent;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
