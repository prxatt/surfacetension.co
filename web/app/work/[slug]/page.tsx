interface Params { params: { slug: string } }

export default function WorkSlugPage({ params }: Params) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-display">Case Study</h1>
        <p className="mt-2 text-white/60">{params.slug}</p>
      </div>
    </main>
  );
}

