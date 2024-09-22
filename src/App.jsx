import { useState } from 'react'
import Landing from './components/Landing'
import Header from './components/Header'
import Weather from './components/Weather'

function App() {
  const [signedIn, setSignedIn] = useState(true)

  return (
    <>
      {signedIn ? (
        <>
        <Header />
        <Weather />
        </>
      ) : (
        <Landing />
      )}
    </>
  )
}

export default App
