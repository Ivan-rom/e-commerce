import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <div>Looks like you’ve got lost...</div>
      <div>The page you’re looking for doesn’t exist or has been moved.</div>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFound;
