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
  const [showThanks, setShowThanks] = useState(false)

  const isValid = emailRegex.test(email) && waiver

  // Hide the ThankYou message after a couple seconds
  useEffect(() => {
    if (showThanks) {
      setTimeout(() => setShowThanks(false), 1500)
    }
  }, [showThanks])

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

  return (
    <div className="flex flex-column items-center w-100">
      <ThankYou isVisible={showThanks} />

      <div className="email-box">
        <input
          className="bg-light-gray ba b--light-gray br1 pa1"
          type="text"
          name="Email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="mt4">
        <input
          id="waiver"
          type="checkbox"
          className="mr2"
          checked={waiver}
          onChange={e => setWaiver(e.target.checked)}
        />
        <label htmlFor="waiver">I Promise I won't sue if I hurt myself</label>
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
