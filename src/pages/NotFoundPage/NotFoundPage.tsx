import type React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = (): React.ReactElement => {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
