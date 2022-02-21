import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '@mui/material'
import { setNotification } from './../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const onCloseHandler = () => {
    dispatch(setNotification(''))
  }
  if(!notification) {
    return <></>
  }
  return <Alert onClose={() => onCloseHandler() } severity={notification.type} >{notification.message}</Alert>
}

export default Notification