import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function NoteModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <Modal opened={opened} onClose={close} title="ノートを作成" centered>
        <p>ノート作成フォーム</p>
      </Modal>

      <Button onClick={open}>ノートを作成</Button>
    </div>
  )
}
