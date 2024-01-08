export default function PageEditor() {
  return (
    <div className="flex-1 flex flex-col p-2">
      <div className="flex">
        <input type="text" className="flex-1" placeholder="title"></input>
        <button type="button" className="ms-2 p-2 border border-gray-500">
          Save
        </button>
      </div>
      <textarea className="flex-1 mt-2" placeholder="content"></textarea>
    </div>
  )
}
