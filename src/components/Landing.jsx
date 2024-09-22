import { useState, useEffect } from 'react'

export default function Landing() {
    return (
        <div style={{ paddingTop: '30px' }} className="container">
            <header>
                <h1>&#x2728;Welcome to Starboard&#x2728;</h1>
                <p>Helping you stay <b>prepared</b> and <b>organized everday</b></p>
            </header>
            <main>
                <form>
                    <label htmlFor="email">Email for login and monthly alerts:</label>
                    <input type="email" id="email" />
                    <button type="submit">Sign In</button>
                </form>
            </main>
        </div>
    )
}