import { getMapWithSetups } from "@/db/queries";
import EditSetupCard from "@/components/EditSetupCard";

export default async function MapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mapWithSetups = await getMapWithSetups(slug);
  if (!mapWithSetups) return <div>Map not found.</div>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{mapWithSetups.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mapWithSetups.setups.map((setup) => (
          <EditSetupCard key={setup.side} setup={setup} />
        ))}
      </div>
    </main>
  );
}
