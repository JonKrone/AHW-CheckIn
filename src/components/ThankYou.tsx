import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ThankYouProps {
  isVisible: boolean
}

const ThankYou: React.FC<ThankYouProps> = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <div className="absolute absolute--fill">
        <div className="flex h-100 justify-center items-center">
          <motion.div
            className="br4"
            style={{
              backgroundColor: 'antiquewhite',
              padding: '75px 125px',
              boxShadow: 'antiquewhite 0px 0px 20px 10px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>Have a great class!</h3>
          </motion.div>
        </div>
      </div>
    )}
  </AnimatePresence>
)

export default ThankYou
