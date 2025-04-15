import {Button, Card, Input, Typography} from "@internshipsamyrai44-ui-kit/components-lib"
import s from './SignIn.module.css'

export const SignIn = () => {
  return (
    <Card className={s.container} >
      <Typography variant="h2" className={s.title}>Sign in</Typography>
      <form className={s.form}>
        <Input
          type="email"
          label="Email"
          placeholder={'Epam@epam.com'}
        />
        <Input label="Password" type="password" placeholder="***************"  className={s.password}/>

        <Button className={s.button}>Sign In</Button>
      </form>
    </Card>
  )
}