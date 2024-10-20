import { Link } from '@tanstack/react-router'
import { FaBars } from 'react-icons/fa'
import { supabase } from '../libs/supabase'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='flex justify-between bg-yellow-200 p-3'>
        <div className='flex items-center gap-3'>
          <FaBars onClick={() => setOpen(true)} />
          <span>ynym-portal</span>
        </div>
      </div>
      {open ? (
        <div className='absolute top-0 left-0 h-screen w-screen bg-slate-600/50'>
          <div className='h-screen bg-white p-4 max-w-sm'>
            <div className='text-right'>
              <button className='underline' type='button' onClick={() => setOpen(false)}>
                閉じる
              </button>
            </div>
            <ul>
              <li className='pb-2'>
                <Link className='underline' to='/' onClick={() => setOpen(false)}>
                  ホーム
                </Link>
              </li>
              <li className='pb-2'>
                <Link className='underline' to='/task' onClick={() => setOpen(false)}>
                  タスク
                </Link>
              </li>
              <li className='pb-2'>
                <Link className='underline' to='/refueling' onClick={() => setOpen(false)}>
                  燃費記録
                </Link>
              </li>
              <li className='pb-2'>
                <Link className='underline' to='/note' onClick={() => setOpen(false)}>
                  ノート
                </Link>
              </li>
              <li className='pb-2'>
                <Link className='underline' onClick={() => supabase.auth.signOut()}>
                  サインアウト
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
