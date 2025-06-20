import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, headline = "", children, isButtonDisable = false }) {
    const handleBackdropClick = (e) => {
        if (isButtonDisable) return;
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={handleBackdropClick}
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative bg-white p-6 pt-10 rounded-lg shadow-lg w-full max-w-md"
                    >
                        <button
                            disabled={isButtonDisable}
                            onClick={onClose}
                            title="Close"
                            className={`absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold ${isButtonDisable ? 'opacity-50 !cursor-not-allowed' : 'hover:text-gray-700'}`}
                        >
                            <X size={20} />
                        </button>

                        {headline && <h2 className="text-xl font-semibold mb-4">{headline}</h2>}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
