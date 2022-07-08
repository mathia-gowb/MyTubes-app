import React from 'react'
import { Outlet } from 'react-router-dom'

function DemoParent() {
  return (
    <Outlet></Outlet>
  )
}

export default DemoParent