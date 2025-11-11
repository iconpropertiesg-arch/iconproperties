export default function PropertiesLoading() {
  return (
    <div className="space-y-6">
      {/* Results Header Skeleton */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
        <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="h-10 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      </div>

      {/* Properties Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
            {/* Image Skeleton */}
            <div className="h-64 bg-gray-200" />
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
              
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
