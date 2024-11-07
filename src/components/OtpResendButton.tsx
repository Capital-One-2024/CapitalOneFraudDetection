export default function OtpResendButton() {
    function handleClick() {
        console.log("Resend OTP");
    }

    return (
        <button className="font-semibold md:hover:underline" onClick={handleClick}>
            Resend OTP
        </button>
    );
}
