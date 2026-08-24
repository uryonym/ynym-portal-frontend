// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center">
        <p>ynym portal site.</p>
      </main>
    </>
  )
}
