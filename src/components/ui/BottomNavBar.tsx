import { FC, ReactNode } from 'react'

type BottomNavBarProps = {
  children: ReactNode
}

const BottomNavBar: FC<BottomNavBarProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 h-14 w-full bg-white">
      <div className="flex justify-between items-center h-full px-4">
        {children}
      </div>
    </div>
  )
}

export default BottomNavBar
