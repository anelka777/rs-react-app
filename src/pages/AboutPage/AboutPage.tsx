import type React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = (): React.ReactElement => {
  return (
    <div>
      <h1>About</h1>
      <p>Author: Alena Danilchenko</p>
      <p>
        This app was built as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React Course
        </a>
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default AboutPage;
