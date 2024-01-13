import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function SectionModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <Modal opened={opened} onClose={close} title="セクションを作成" centered>
        <p>セクション作成フォーム</p>
      </Modal>

      <Button onClick={open}>セクションを作成</Button>
    </div>
  )
}
