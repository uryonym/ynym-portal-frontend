export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center h-14 p-2">
        <span className="text-xl/4">uryonote</span>
      </header>
      <main className="flex-1 flex">
        <div className="min-w-32 p-2">
          <ul className="list-disc list-inside">
            <li>
              notes
              <ul className="ps-5 list-disc list-inside">
                <li>sections</li>
                <li>sections</li>
                <li>sections</li>
              </ul>
            </li>
            <li>
              notes
              <ul className="ps-5 list-disc list-inside">
                <li>sections</li>
                <li>sections</li>
                <li>sections</li>
              </ul>
            </li>
            <li>
              notes
              <ul className="ps-5 list-disc list-inside">
                <li>sections</li>
                <li>sections</li>
                <li>sections</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="min-w-32 p-2">
          <ul className="list-disc list-inside">
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col p-2">
          <div className="flex">
            <input
              type="text"
              className="flex-1"
              placeholder="タイトル"
            ></input>
            <button type="button" className="ms-2 p-2 border border-gray-500">
              保存
            </button>
          </div>
          <textarea className="flex-1 mt-2" placeholder="内容"></textarea>
        </div>
      </main>
    </div>
  )
}
