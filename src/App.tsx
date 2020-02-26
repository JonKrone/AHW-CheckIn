import React, { useState } from 'react'

import './App.css'
import 'tachyons/css/tachyons.min.css'

import MetaForm, { MetaData } from './components/MetaForm'
import SignInForm from './components/SignInForm'

const App: React.FC<{}> = () => {
  const [meta, setMeta] = useState<MetaData | null>(null)
  // const [meta, setMeta] = useState<MetaData | null>({
  //   teacher: 'Jon',
  //   location: 'Bennys',
  // })

  return (
    <>
      {meta ? (
        <SignInForm meta={meta} />
      ) : (
        <MetaForm onSubmit={meta => setMeta(meta)} />
      )}
    </>
  )
}

export default App
