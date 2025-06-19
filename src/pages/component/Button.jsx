export default function Button({ text, onButtonClick, ariaLabel = "", classList = "", isButtonDisable = false, isLoading = false, bgColor="blue", textColor = "white" }) {
    return (
        <button aria-label={ariaLabel} disabled={ isButtonDisable } onClick={ onButtonClick } className={ `inline-flex justify-center w-fit items-center rounded-lg bg-${bgColor}-600 p-2.5 text-sm font-medium text-${textColor} shadow-md transition duration-300 hover:bg-${bgColor}-700 focus:outline-none h-9 ${classList} ${isButtonDisable ? 'opacity-50 !cursor-not-allowed' : ''} ${isLoading ? 'loading' : ''}` }>{ text }</button>
    )
}