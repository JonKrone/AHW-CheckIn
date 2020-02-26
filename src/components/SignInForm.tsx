import React, { useState, useEffect } from 'react'

import { fDb } from '../utils/firebase'
import Waiver from './Waiver'
import { MetaData } from './MetaForm'
import ThankYou from './ThankYou'

const emailRegex = /(?!.*\.\.)(^[^.][^@\s]+@[^@\s]+\.[^@\s.]+$)/

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
        firstName: null,
        lastName: null,
        teacher: meta.teacher,
        class: meta.location,
        email,
        agreeToWaiver: waiver,
        timestamp: now,
        sentViaEmail: false,
      }

      // add to our firebase students collection
      fDb
        .collection('students')
        .doc(String(now))
        .set(studentRegistration)
        .then(
          d => console.log('saved student to fDb'),
          e => console.log('failed to add student to fDb')
        )

      setShowThanks(true)

      // reset form
      setEmail('')
      setWaiver(true)
    }
  }

  const [showThanks, setShowThanks] = useState(false)
  // Hide the ThankYou message after a couple seconds
  useEffect(() => {
    if (showThanks) {
      setTimeout(() => setShowThanks(false), 1500)
    }
  }, [showThanks])

  return (
    <div className="flex flex-column items-center w-100">
      <button onClick={() => setShowThanks(!showThanks)}>Show</button>
      <ThankYou isVisible={showThanks} />

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

      <div className="mt4">
        <label>
          <input
            type="checkbox"
            className="mr2"
            checked={waiver}
            onChange={e => setWaiver(e.target.checked)}
          />
          I Promise I won't sue if I hurt myself
        </label>
      </div>

      <div className="mt4">
        <button
          disabled={isValid}
          className="submit-input"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>

      <Waiver />
    </div>
  )
}

export default SignInForm
