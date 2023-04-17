import { ReactComponent as LoadingAnimation } from "../assets/spinner.svg";

function Spinner() {
    return (
        // <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center items-center mt-72 sm:h-96 sm:mt-0">
            <LoadingAnimation />
        </div>
    );
}

export default Spinner;
