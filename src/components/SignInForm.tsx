import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { fDb } from '../utils/firebase'
import Waiver from './Waiver'
import { MetaData } from './MetaForm'

const emailRegex = /(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)/

interface SignInFormProps {
  meta: MetaData
}

const SignInForm: React.FC<SignInFormProps> = ({ meta }) => {
  const [email, setEmail] = useState<string>('')
  const [waiver, setWaiver] = useState<boolean>(true)

  const isValid = emailRegex.test(email) && waiver

  const handleSubmit = () => {
    if (isValid) {
      const now = Date.now()
      const studentRegistration = {
        firstName: 'first',
        lastName: 'last',
        teacher: meta.teacher,
        class: meta.location,
        email,
        agreeToWaiver: waiver,
        timestamp: now,
        sentViaEmail: false,
      }

      // add to firebase
      fDb
        .collection('students')
        .doc(String(now))
        .set(studentRegistration)
        .then(
          d => console.log('saved student to fDb'),
          e => console.log('failed to add student to fDb')
        )

      // flashThankYou(firstName)

      // reset form
      setEmail('')
      setWaiver(true)
    }
  }

  const useDelay = (delay: number) => {
    const [done, setDone] = useState(false)
    setTimeout(() => {
      setDone(true)
    }, delay)
    return done
  }

  const [show, setShow] = useState(false)
  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 2000)
    }
  }, [show])

  const MyComponent: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-5 vh-50 bg-gray"
          style={{ width: '50vw' }}
          key="thanks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ yoyo: Infinity, duration: 1 }}
        >
          Thank you!
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="flex flex-column items-center w-100">
      <button onClick={() => setShow(!show)}>Show</button>
      <div className="hide thank-you-tmp">
        <h3 className="thank-you-msg"></h3>
        <MyComponent isVisible={show} />
      </div>

      <div className="email-box">
        <div className="errorable-input">
          <input
            className="email-input errorable"
            type="text"
            name="Email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="waiver-box">
        <div className="errorable-input">
          <label className="errorable">
            <input
              type="checkbox"
              className="waiver-input"
              checked={waiver}
              onChange={e => setWaiver(e.target.checked)}
            />
            I Promise I won't sue if I hurt myself
          </label>
        </div>
      </div>

      <div className="submit-box">
        <button disabled={isValid} className="submit-input">
          Register
        </button>
      </div>
      <Waiver />
    </div>
  )
}

export default SignInForm
