import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div className='w-full flex flex-col flex-1'
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
  
);

export default PageWrapper;