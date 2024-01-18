'use client'

const Notes = () => {
  const notes = [
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
  ]

  return (
    <main className="flex-1 overflow-y-auto py-4">
      {notes.map((note, index) => (
        <div className="py-3 text-center">
          <p key={index}>{note.name}</p>
        </div>
      ))}
    </main>
  )
}

export default Notes
