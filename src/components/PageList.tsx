import { Select } from '@mantine/core'

export default function PageList() {
  return (
    <div className="p-2">
      <Select
        placeholder="select note..."
        data={['note1', 'note2', 'note3', 'note4']}
      />
      <ul className="list-disc list-inside">
        <li>
          sections
          <ul className="ps-5 list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </li>
        <li>
          sections
          <ul className="ps-5 list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </li>
        <li>
          sections
          <ul className="ps-5 list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </li>
        <li>
          sections
          <ul className="ps-5 list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </li>
        <li>
          sections
          <ul className="ps-5 list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </li>
        <li>
          sections
          <ul className="ps-5 list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
