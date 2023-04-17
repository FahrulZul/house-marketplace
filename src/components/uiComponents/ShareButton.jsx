import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

const ShareButton = () => {
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    return (
        <div
            className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareLinkCopied(true);
                setTimeout(() => {
                    setShareLinkCopied(false);
                }, 2000);
            }}
        >
            <FiShare2 size={20} />
            {shareLinkCopied && (
                <p className="absolute left-full w-20 top-1 text-xs">
                    Link Copied!
                </p>
            )}
        </div>
    );
};

export default ShareButton;
