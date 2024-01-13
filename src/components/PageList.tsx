import { Button, Select, Stack } from '@mantine/core'
import NoteModal from './NoteModal'
import SectionModal from './SectionModal'
import PageModal from './PageModal'

export default function PageList() {
  return (
    <Stack>
      <NoteModal />
      <Select
        placeholder="select note..."
        data={['note1', 'note2', 'note3', 'note4']}
      />
      <SectionModal />
      <ul className="list-disc list-inside">
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
      </ul>
    </Stack>
  )
}

function Section() {
  return (
    <li>
      sections
      <PageModal />
      <ul className="ps-5 list-disc list-inside">
        <li>pages</li>
        <li>pages</li>
        <li>pages</li>
        <li>pages</li>
        <li>pages</li>
      </ul>
    </li>
  )
}
