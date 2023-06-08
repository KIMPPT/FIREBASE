import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
export default function Board() {
  const user=useSelector((state)=>state.user)
    return (
    <div>
        {user&&user.email}입니다
    </div>
  )
}
