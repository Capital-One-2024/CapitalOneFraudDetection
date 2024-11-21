interface PopupProps {
    show: boolean;
    type: "success" | "failure";
    message: string;
    onClose: () => void;
}

export default function NewTransactionPopUp({ show, type, message, onClose }: PopupProps) {
    if (!show) return null;

    const title = type === "success" ? "Success!" : "Error!";
    const btn = type === "success" ? "btn-blue" : "btn-red";
    const textColor = type === "success" ? "text-c1-blue" : "text-c1-red";

    return (
        <div
            className={`
            fixed top-0
            left-0 
            w-full 
            h-full 
            bg-black 
            bg-opacity-50 
            flex 
            justify-center 
            items-center 
            z-50
          `}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className={`text-xl font-bold ${textColor}`}>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose} className={`mt-4 px-4 py-2 btn ${btn}`}>
                    Close
                </button>
            </div>
        </div>
    );
}
