import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function PageModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <Modal opened={opened} onClose={close} title="ページを作成" centered>
        <p>ページ作成フォーム</p>
      </Modal>

      <Button onClick={open}>ページを作成</Button>
    </div>
  )
}
