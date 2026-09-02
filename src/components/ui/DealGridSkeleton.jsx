export default function DealGridSkeleton({ count = 8, columns = 4 }) {
  const gridCols = columns === 3 ? "..." : "...";
  return (
    <div className={`w-full grid ${gridCols} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-line rounded-[10px] overflow-hidden bg-white"
        >
          <div className="skeleton h-[150px] w-full rounded-none" />
          <div className="p-3 flex flex-col gap-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-6 w-1/2 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
