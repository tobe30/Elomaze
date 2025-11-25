import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function PropertyFilters({
  categories,
  onSearch,
  onFilterChange,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "Any",
    minPrice: "",
    maxPrice: "",
    verified: false,
  });

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  return (
    <div>
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center w-full max-w-xl">
          <Search className="absolute left-4 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search by title, location..."
            className="input input-bordered w-full pl-10 pr-12 rounded-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <SlidersHorizontal
            className="absolute right-4 text-gray-600 text-xl cursor-pointer hover:text-orange-500"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

      {/* 🧩 Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 md:w-1/3 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Filter Properties
            </h3>

            <div className="space-y-4">
              <div>
                <label className="font-medium">Property Type</label>
                <select
                  className="select select-bordered w-full mt-1"
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                >
                  <option>Any</option>
                  {categories.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  className="input input-bordered w-1/2"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="input input-bordered w-1/2"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={filters.verified}
                  onChange={(e) =>
                    setFilters({ ...filters, verified: e.target.checked })
                  }
                />
                <label>Verified only</label>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-orange-500 text-white hover:bg-orange-600"
                  onClick={handleApply}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
