import React from 'react'
import { UserDetail } from '../common/UserDetail/UserDetail'

export const User = () => {
  return (
    <div className='bg bg-user' style={{backgroundImage: `url('../src/assets/clinica_usuario.jpg')`}}>
      <UserDetail></UserDetail>
    </div>
  )
}