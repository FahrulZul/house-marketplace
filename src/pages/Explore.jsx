import { Link } from "react-router-dom";

function Explore() {
    return (
        <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-10">Explore</h1>
            <Link to="/sign-in" className="text-sm text-sky-500 font-medium">
                Sign in
            </Link>
        </div>
    );
}

export default Explore;
