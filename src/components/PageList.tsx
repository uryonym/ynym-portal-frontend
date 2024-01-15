export default function PageList() {
  return (
    <>
      <ul className="list-disc list-inside">
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
      </ul>
    </>
  )
}

function Section() {
  return (
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
  )
}
