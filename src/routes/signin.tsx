import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FormEventHandler } from 'react'
import { supabase } from '../libs/supabase'

export const Route = createFileRoute('/signin')({
  component: SignIn,
})

function SignIn() {
  const navigate = useNavigate()

  const handleSignin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string

    await supabase.auth.signInWithPassword({ email, password })
    navigate({ to: '/' })
  }

  return (
    <div>
      <h3>Welcome Signin!</h3>
      <form onSubmit={handleSignin}>
        <input type='email' name='email' />
        <input type='password' name='password' />
        <button className='underline' type='submit'>
          サインイン
        </button>
      </form>
    </div>
  )
}
