import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function ServiceFilters({ onSearch, onFilterChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    verified: null,
    minPrice: "",
    maxPrice: "",
  });

  const resetFilters = () => {
    setFilters({
      category: "",
      verified: null,
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center w-full max-w-xl">
          <Search className="absolute left-4 text-primary text-lg" />
          <input
            type="text"
            placeholder="Search for services…"
            className="input input-bordered w-full pl-12 pr-14 rounded-full bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <SlidersHorizontal
            className="absolute right-4 text-blue-500 text-xl cursor-pointer hover:text-primary"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Service Filters</h3>
              <X
                className="cursor-pointer text-gray-600 hover:text-primary"
                onClick={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Service Category */}
            <div className="border-t pt-5">
              <h4 className="font-medium text-gray-900 mb-3">Service Category</h4>
              <select
                className="select select-bordered w-full"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">All Categories</option>
                <option value="cleaning">Cleaning</option>
                <option value="tailoring">Tailoring</option>
                <option value="repairs">Repairs</option>
                <option value="plumbing">Plumbing</option>
                <option value="barber">Barber</option>
                <option value="laundry">Laundry</option>
                <option value="tutor">Home Tutor</option>
                <option value="moving">Moving Services</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Verified */}
            <div className="border-t pt-5 mt-5">
              <h4 className="font-medium text-gray-900 mb-3">Verified Providers</h4>
              <div className="grid grid-cols-3 gap-3">
                {["Any", "Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        verified:
                          opt === "Any" ? null : opt === "Yes" ? true : false,
                      })
                    }
                    className={`rounded-xl py-3 border text-sm font-medium transition ${
                      (filters.verified === true && opt === "Yes") ||
                      (filters.verified === false && opt === "No") ||
                      (filters.verified === null && opt === "Any")
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="border-t pt-5 mt-5">
              <h4 className="font-medium text-gray-900 mb-3">Price Range (₦)</h4>
              <div className="flex gap-3">
                <input
                  type="number"
                  className="input input-bordered w-1/2"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="input input-bordered w-1/2"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={resetFilters}
                className="py-3 px-5 text-gray-700 font-medium"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="py-3 px-6 bg-black text-white rounded-xl shadow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
