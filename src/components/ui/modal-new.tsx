import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback when the modal should close
   */
  onClose: () => void;
  
  /**
   * Modal title
   */
  title?: ReactNode;
  
  /**
   * Modal content
   */
  children: ReactNode;
  
  /**
   * Modal footer content
   */
  footer?: ReactNode;
  
  /**
   * Modal size
   */
  size?: ModalSize;
  
  /**
   * Modal position
   */
  position?: ModalPosition;
  
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  
  /**
   * Whether to close when clicking outside
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * Whether to close when pressing escape key
   */
  closeOnEscape?: boolean;
  
  /**
   * Whether to use glass effect
   */
  useGlass?: boolean;
  
  /**
   * Whether to use western styling
   */
  western?: boolean;
  
  /**
   * Additional class name for the backdrop
   */
  backdropClassName?: string;
  
  /**
   * Additional class name for the modal container
   */
  containerClassName?: string;
  
  /**
   * Additional class name for the modal content
   */
  contentClassName?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  position = 'center',
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  useGlass = false,
  western = false,
  backdropClassName = '',
  containerClassName = '',
  contentClassName = '',
}: ModalProps) => {
  // Ref for modal content
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Close on escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [closeOnEscape, isOpen, onClose]);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case 'full': return 'max-w-full m-4';
      default: return 'max-w-md';
    }
  };
  
  // Get position classes and animations
  const getPositionConfig = () => {
    switch (position) {
      case 'top':
        return {
          classes: 'items-start justify-center mt-4',
          variants: {
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 }
          }
        };
      case 'right':
        return {
          classes: 'items-center justify-end mr-4',
          variants: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 50 }
          }
        };
      case 'bottom':
        return {
          classes: 'items-end justify-center mb-4',
          variants: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 }
          }
        };
      case 'left':
        return {
          classes: 'items-center justify-start ml-4',
          variants: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -50 }
          }
        };
      case 'center':
      default:
        return {
          classes: 'items-center justify-center',
          variants: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }
            },
            exit: { 
              opacity: 0, 
              scale: 0.95,
              transition: { 
                duration: 0.2 
              }
            }
          }
        };
    }
  };
  
  const positionConfig = getPositionConfig();
  
  // Backdrop animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  // Backdrop classes
  const backdropClasses = `
    fixed inset-0 z-50 flex ${positionConfig.classes} p-4
    ${useGlass ? 'backdrop-blur-sm bg-black/30' : 'bg-black/50'}
    ${backdropClassName}
  `.trim();
  
  // Modal container classes
  const modalContainerClasses = `
    relative ${getSizeClasses()} w-full 
    ${western ? 'rounded-lg border-2 border-accent-500 shadow-lg' : 'rounded-lg border border-gray-200 shadow-xl'}
    ${useGlass ? 'bg-white/90 backdrop-blur-md' : 'bg-white'}
    ${containerClassName}
  `.trim();
  
  // Header classes
  const headerClasses = `
    flex items-center justify-between px-6 py-4
    ${western ? 'border-b-2 border-accent-200' : 'border-b border-gray-200'}
  `.trim();
  
  // Content classes
  const bodyClasses = `
    p-6 overflow-y-auto max-h-[calc(100vh-14rem)]
    ${contentClassName}
  `.trim();
  
  // Footer classes
  const footerClasses = `
    flex items-center justify-end px-6 py-4 space-x-2
    ${western ? 'border-t-2 border-accent-200' : 'border-t border-gray-200'}
  `.trim();
  
  // If no document, return null (for SSR)
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={backdropClasses}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={modalContainerClasses}
            variants={positionConfig.variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={contentRef}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className={headerClasses}>
                {title && (
                  <h3 className={`text-lg font-semibold ${western ? 'text-secondary-900' : 'text-gray-900'}`}>
                    {title}
                  </h3>
                )}
                
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={`p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      western ? 'focus:ring-accent-500' : 'focus:ring-primary-500'
                    }`}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>
            )}
            
            {/* Body */}
            <div className={bodyClasses}>
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className={footerClasses}>
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Dialog variant (simple message dialog)
export interface DialogProps extends Omit<ModalProps, 'children'> {
  /**
   * Dialog message content
   */
  message: ReactNode;
  
  /**
   * Primary action button text
   */
  confirmText?: string;
  
  /**
   * Secondary action button text
   */
  cancelText?: string;
  
  /**
   * Callback when confirm button is clicked
   */
  onConfirm?: () => void;
  
  /**
   * Whether the primary action is destructive
   */
  isDestructive?: boolean;
}

export const Dialog = ({
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isDestructive = false,
  western = false,
  ...props
}: DialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    props.onClose();
  };
  
  const primaryButtonClasses = `
    px-4 py-2 rounded-md text-white font-medium 
    ${isDestructive 
      ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
      : western 
        ? 'bg-accent-500 hover:bg-accent-600 focus:ring-accent-500' 
        : 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-500'
    }
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `.trim();
  
  const secondaryButtonClasses = `
    px-4 py-2 rounded-md text-gray-700 font-medium 
    bg-gray-100 hover:bg-gray-200 focus:ring-gray-500
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `.trim();
  
  return (
    <Modal
      {...props}
      footer={
        <>
          <button className={secondaryButtonClasses} onClick={props.onClose}>
            {cancelText}
          </button>
          <button className={primaryButtonClasses} onClick={handleConfirm}>
            {confirmText}
          </button>
        </>
      }
    >
      <div className="text-gray-700">{message}</div>
    </Modal>
  );
}; 