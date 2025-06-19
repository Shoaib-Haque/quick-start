import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, headline = "", children, isButtonDisable = false }) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (isButtonDisable) return;
        // Only close if clicked on the backdrop, not the modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
            <div className="relative bg-white p-6 pt-10 rounded-lg shadow-lg w-full max-w-md">
                <button
                    disabled={isButtonDisable}
                    onClick={onClose}
                    className={`absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold ${isButtonDisable ? 'opacity-50 !cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                    <X size={20} />
                </button>

                {headline && <h2 className="text-xl font-semibold mb-4">{ headline }</h2>}
                { children }
            </div>
        </div>
    );
}