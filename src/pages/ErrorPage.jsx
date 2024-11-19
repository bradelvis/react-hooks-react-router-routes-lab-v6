import { useRouteError } from 'react-router-dom';
import NavBar from "../components/NavBar"

function ErrorPage() {
 
  const error = useRouteError();
    console.error(error);
    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>Oops! Looks like something went wrong.</h1>
        </>
    );
}

export default ErrorPage