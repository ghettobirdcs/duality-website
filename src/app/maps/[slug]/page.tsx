import { getMapWithSetups } from "@/db/queries";
import EditSetupCard from "@/components/EditSetupCard";

export default async function MapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mapWithSetups = await getMapWithSetups(slug);

  const mapData = mapWithSetups ?? {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    setups: [],
  };

  return (
    <main className="flex flex-col items-center px-4 sm:px-8 lg:px-24 py-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 w-full max-w-7xl mx-auto maps__header">{mapData.name}</h1>
      <div className="flex flex-col w-full max-w-7xl">
        {mapData.setups.map((setup) => (
          <EditSetupCard key={setup.side} setup={setup} />
        ))}
      </div>
    </main>
  );
}
