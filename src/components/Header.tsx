import { Link } from '@tanstack/react-router'
import { supabase } from '../libs/supabase'

export default function Header() {
  return (
    <div className='flex justify-between p-2 border-b-2'>
      <span>ynym-portal</span>
      <ul className='flex gap-2'>
        <li>
          <Link className='underline' to='/'>
            ホーム
          </Link>
        </li>
        <li>
          <Link className='underline' to='/task'>
            タスク
          </Link>
        </li>
        <li>
          <Link className='underline' onClick={() => supabase.auth.signOut()}>
            サインアウト
          </Link>
        </li>
      </ul>
    </div>
  )
}
