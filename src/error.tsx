import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {isRouteErrorResponse(error) ? (
            <> {error.statusText}</>
          ) : (
            'Unknown error message'
          )}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;
