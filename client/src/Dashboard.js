import React from 'react'
import useAuth from './useAuth'

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  return (
    <div>
      <h1>{code}</h1>
    </div>
  )
}
