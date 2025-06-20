export default function Button({
    text = "",
    title = "",
    onButtonClick,
    ariaLabel = "",
    classList = "",
    isButtonDisable = false,
    isLoading = false,
    bgColor = "blue",
    textColor = "white",
    variant = "default", // or "icon"
    children
}) {
    const baseClasses = "inline-flex justify-center items-center text-sm font-medium transition duration-300 focus:outline-none h-9";

    const colorClasses = {
        blue: "bg-blue-600 hover:bg-blue-700 text-white",
        red: "bg-red-600 hover:bg-red-700 text-white",
        gray: "bg-gray-600 hover:bg-gray-700 text-white",
        green: "bg-green-600 hover:bg-green-700 text-white",
    };

    const iconColorClasses = {
        blue: "text-blue-600 hover:text-blue-700",
        red: "text-red-600 hover:text-red-700",
        gray: "text-gray-600 hover:text-gray-700",
    };

    const finalClasses =
        variant === "icon"
            ? `${baseClasses} bg-transparent ${iconColorClasses[bgColor] || iconColorClasses.gray}`
            : `${baseClasses} ${colorClasses[bgColor] || colorClasses.blue} text-${textColor} p-2.5`;

    return (
        <button
            aria-label={ariaLabel}
            disabled={isButtonDisable}
            onClick={onButtonClick}
            title={title}
            className={`${finalClasses} ${classList} ${isButtonDisable ? "opacity-50 !cursor-not-allowed" : ""} ${isLoading ? "loading" : ""}`}
        >
            {children || text}
        </button>
    );
}