export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-2 size-full">
      <div className="relative">
        <h1 className="text-[350px] font-bold text-muted">404</h1>
        <p className="absolute inset-0 flex items-center justify-center text-7xl text-red-700 font-bold whitespace-nowrap">
          not found
        </p>
      </div>
    </div>
  );
}
