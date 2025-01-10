import React from 'react'
import UsersAll from '../../../api/users/controllers/fetchUser'

const UsersPage = () => {
  return (
    <div className='container'>
      <UsersAll />
    </div>
  )
}

export default UsersPage