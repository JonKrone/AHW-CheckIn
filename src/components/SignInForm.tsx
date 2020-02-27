import React, { useState, useEffect, useRef } from 'react'

import Waiver from './Waiver'
import { MetaData } from './MetaForm'
import ThankYou from './ThankYou'

const emailRegex = /(?!.*\.\.)(^[^.][^@\s]+@[^@\s]+\.[^@\s.]+$)/

interface SignInFormProps {
  meta: MetaData
}

const SignInForm: React.FC<SignInFormProps> = ({ meta }) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState<string>('')
  const [waiver, setWaiver] = useState<boolean>(false)
  const [showThanks, setShowThanks] = useState(false)
  const [needsEmail, setNeedsEmail] = useState(false)

  const isValid = emailRegex.test(email) && waiver

  // Hide the ThankYou message after a couple seconds
  useEffect(() => {
    if (showThanks) {
      setTimeout(() => setShowThanks(false), 1500)
    }
  }, [showThanks])

  useEffect(() => {
    if (needsEmail) {
      emailRegex.test(email) && setNeedsEmail(false)
    }
  }, [needsEmail, email])

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
      // fDb
      //   .collection('students')
      //   .doc(String(now))
      //   .set(studentRegistration)
      //   .then(
      //     d => console.log('saved student to fDb'),
      //     e => console.log('failed to add student to fDb')
      //   )

      setShowThanks(true)

      // reset form
      setEmail('')
      setWaiver(false)
      emailRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-column items-center w-100">
      <ThankYou isVisible={showThanks} />
      <input
        className="lh-solid bg-light-gray ba b--light-gray br2 pa3"
        style={{ width: '22rem', outlineColor: 'rgb(224, 65, 41)' }}
        ref={emailRef}
        type="email"
        name="Email"
        placeholder="Email"
        autoComplete="off"
        autoFocus
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={_ => !emailRegex.test(email) && setNeedsEmail(true)}
      />
      {needsEmail && (
        <span
          className="absolute"
          style={{
            top: emailRef.current!.offsetTop + emailRef.current!.offsetHeight,
            color: 'rgb(224, 65, 41)',
          }}
        >
          Please make sure your email is correct
        </span>
      )}

      <div className="mt4 pa2">
        <input
          id="waiver"
          className="mr2 pointer"
          style={{ transform: 'scale(1.4)', outlineColor: 'rgb(224, 65, 41)' }}
          type="checkbox"
          checked={waiver}
          onChange={e => setWaiver(e.target.checked)}
          onKeyDown={e => e.which === 13 && setWaiver(!waiver)}
        />
        <label htmlFor="waiver" className="pointer">
          I Promise I won't sue if I hurt myself
        </label>
      </div>
      <div className="mt4">
        <button
          className="lh-solid ba white b--light-gray br2 pa3"
          style={{
            backgroundColor: 'rgb(224, 65, 41)',
            outlineColor: 'rgb(224, 65, 41)',
          }}
          disabled={!isValid}
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
