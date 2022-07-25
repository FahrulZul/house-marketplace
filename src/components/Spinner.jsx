import { ReactComponent as LoadingAnimation } from "../assets/spinner.svg";

function Spinner() {
    return (
        <div className="w-full h-screen grid place-items-center pb-32">
            <LoadingAnimation />
        </div>
    );
}

export default Spinner;
