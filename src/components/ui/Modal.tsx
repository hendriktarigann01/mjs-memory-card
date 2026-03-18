import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showClose?: boolean;
}

/**
 * Accessible modal overlay.
 * Clicking the backdrop closes the modal (when showClose is true).
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  showClose = true,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={showClose ? onClose : undefined}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative"
            >
              {/* Close button */}
              {showClose && (
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E0F5F2] text-gray-400 hover:text-[#3BBFB0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Title */}
              {title && (
                <h2 className="text-xl font-black text-[#3BBFB0] uppercase tracking-wider mb-4 pr-8">
                  {title}
                </h2>
              )}

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
