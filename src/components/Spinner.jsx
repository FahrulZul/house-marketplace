import { ReactComponent as LoadingAnimation } from "../assets/spinner.svg";

function Spinner() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingAnimation />
        </div>
    );
}

export default Spinner;
