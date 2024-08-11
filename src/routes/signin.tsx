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
    <div className='flex-1 flex flex-col gap-6 justify-center items-center'>
      <p>サインインしてください</p>
      <form onSubmit={handleSignin}>
        <div className='mb-3'>
          <div>
            <label>メールアドレス</label>
          </div>
          <input type='email' name='email' />
        </div>
        <div className='mb-3'>
          <div>
            <label>パスワード</label>
          </div>
          <input type='password' name='password' />
        </div>
        <div>
          <button className='underline' type='submit'>
            サインイン
          </button>
        </div>
      </form>
    </div>
  )
}
