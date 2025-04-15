'use client'

import s from './index.module.css'
import { SignIn} from "@/components/sign-in/SignIn"

const Auth = () => {
  return (
    <div className={s.container}>
      <SignIn/>
    </div>
  )
}

export default Auth;