import { Link } from 'react-router-dom'
import React from 'react'

const UserCard = ({user,isConnection}) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'> 
        <Link to={`/profile/${user.username}`} className=''>
            <img src={user.profilepicture || "/profile.png"} 
            className='w-24 h-24 rounded-full object-cover mb-4'
            alt={user.name} />
            <h3 className='font-semibold text-lg text-center'>{user.name}</h3>
        </Link>
        <p className='text-gray-600 text-center'>{user.headline}</p>
        <p className='text-sm text-gray-500 mt-2'>{user.connection?.length} connections</p>
        <button className='mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full '>
            {isConnection ? "connected" :"connect"}
        </button>
    </div>
  )
}

export default UserCard
