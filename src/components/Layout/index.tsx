import React from 'react'
import {Container} from './style'
import QueueInput from '../QueueInput'
import Queue from '../Queue'


const Layout = () => {

  return(
    <Container>
      <QueueInput />
      <Queue />
    </Container>
  )
}

export default Layout;
