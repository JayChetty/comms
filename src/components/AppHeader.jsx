import React from 'react'
import './AppHeader.css'

export default function AppHeader({title}){
  const headerTitle = title || "comms"
  return (
    <header className="AppHeader">
      <h1> {headerTitle} </h1>
      <nav></nav>
    </header>
  )
}
