import styles from "./modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
const Modal = ({ isOpen, setIsOpen, onClose, children }) => {
  const backDropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const contentVariants = {
    visible: { y: 0 },
    hidden: { y: -1000 },
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={onClose}>
      {isOpen && (
        <motion.div
          className={styles.back_drop}
          variants={backDropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className={styles.modal_content}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
          >
            <button
              className={styles.close_btn}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
