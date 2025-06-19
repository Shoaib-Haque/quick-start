export default function FormInput({ value, onChange, placeholder, error, disabled = false }) {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`border rounded p-1 w-full ${error ? 'border-red-500' : 'border-gray-300'} focus:border-gray-500 focus:outline-none ${disabled ? 'opacity-50 !cursor-not-allowed' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
};