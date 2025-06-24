import Link from "next/link";
import { getMapWithSetups } from "@/db/queries";
import EditSetupCard from "@/components/EditSetupCard";

export default async function MapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mapWithSetups = await getMapWithSetups(slug);

  const sides = ["T", "CT"] as const;
  const setups = sides.map(
    (side) =>
      mapWithSetups?.setups?.find((s: any) => s.side === side) ?? {
        id: undefined, // id is undefined for new setups, updateSetup can handle this
        mapId: mapWithSetups?.id,
        side,
        description: "",
        imageUrl: "",
      },
  );

  return (
    <main className="flex flex-col items-center px-4 sm:px-8 lg:px-24 py-6 min-h-screen">
      <div className="maps__back-button">
        <Link href="/dashboard" className="dashboard__container--item">
          ← Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 w-full max-w-7xl mx-auto maps__header">
        {mapWithSetups?.name ??
          slug.charAt(0).toUpperCase() + slug.slice(1)}
      </h1>
      <div className="flex flex-col w-full max-w-7xl gap-6">
        {setups.map((setup) => (
          <EditSetupCard key={setup.side} setup={setup} />
        ))}
      </div>
    </main>
  );
}
