import { auth } from '@/auth'
import React from 'react'

const AboutPage = async () => {
    const session = await auth()
  return (
    <div>AboutPage {session?.user.email}</div>
  )
}

export default AboutPage