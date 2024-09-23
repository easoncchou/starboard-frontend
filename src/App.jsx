import { useState } from 'react'
import Landing from './components/Landing'
import Header from './components/Header'
import Weather from './components/Weather'
import ToDo from './components/ToDo'

function App() {
  const [signedIn, setSignedIn] = useState(true)

  return (
    <>
      {signedIn ? (
        <>
        <Header />
        <Weather />
        <ToDo/>
        </>
      ) : (
        <Landing />
      )}
    </>
  )
}

export default App
