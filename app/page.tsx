import Header from './components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6">
        <p>ynym portal site.</p>
      </main>
    </div>
  );
}
