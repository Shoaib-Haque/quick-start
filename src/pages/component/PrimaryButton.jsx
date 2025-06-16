export default function PrimaryButton({ text, onButtonClick, classList = "", isButtonDisable = false, isLoading = false }) {
    return (
        <button disabled={ isButtonDisable } onClick={ onButtonClick } className={ `inline-flex items-center rounded-lg bg-blue-600 p-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none h-9 ${classList} ${isButtonDisable ? 'opacity-50 !cursor-not-allowed' : 'hover:bg-blue-700'} ${isLoading ? 'loading' : ''}` }>{ text }</button>
    )
}