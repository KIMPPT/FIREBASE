import React from 'react'
import {Link}from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <h3>Home</h3>
      <Link to='/login'>로그인창으로 이동</Link>
    </div>
  )
}
