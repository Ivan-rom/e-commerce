import { Link } from 'react-router-dom';

type Props = {
  text?: string;
  subText?: string;
};

function NotFound({ text, subText }: Props) {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-9xl">404</h1>
      {text ? (
        <>
          <div className="text-4xl mt-5 mb-3">{text}</div>
          <div className="text-2xl">{subText}</div>
        </>
      ) : (
        <>
          <div className="text-4xl mt-5 mb-3">Looks like you’ve got lost...</div>
          <div className="text-2xl">
            The page you’re looking for doesn’t exist or has been moved.
          </div>
        </>
      )}
      <Link to="/" className="mt-10 text-sky-600 text-3xl">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
