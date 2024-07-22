import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '../libs/supabase'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
      <button type='button' onClick={async () => console.log(await supabase.auth.getSession())}>
        サインイン状態の確認
      </button>
    </div>
  )
}
