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
    <main className="flex flex-col items-center px-4 sm:px-8 lg:px-24 py-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 w-full max-w-7xl mx-auto">{mapWithSetups.name}</h1>
      <div className="flex flex-col gap-8 w-full max-w-7xl">
        {mapWithSetups.setups.map((setup) => (
          <EditSetupCard key={setup.side} setup={setup} />
        ))}
      </div>
    </main>
  );
}
