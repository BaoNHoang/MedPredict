'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function LogoutConfirmModal({
    open,
    onClose,
    onConfirm,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-extrabold text-gray-900">
                            Are you sure?
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Logging out will end your current session.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-100">
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800">
                                Logout
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}