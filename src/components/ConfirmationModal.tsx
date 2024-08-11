interface ConfirmationModalProps {
  show: boolean
  onExec: () => void
  onClose: () => void
}

export default function ConfirmationModal({ show, onExec, onClose }: ConfirmationModalProps) {
  if (show) {
    return (
      <>
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded max-w-xs w-full'>
            <h2 className='text-2xl font-bold mb-2'>確認</h2>
            <p>本当に削除してもよろしいですか？</p>
            <div className='flex justify-between'>
              <button className='px-4 py-2 underline' type='button' onClick={onExec}>
                はい
              </button>
              <button className='px-4 py-2 underline' type='button' onClick={onClose}>
                いいえ
              </button>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return
  }
}
