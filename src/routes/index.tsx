import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='flex-1 flex flex-col gap-6 justify-center items-center'>
      <h3>トップページ</h3>
      <p>メニューから見たいコンテンツを選択してください</p>
    </div>
  )
}
