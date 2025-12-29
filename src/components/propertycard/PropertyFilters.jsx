import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function PropertyFilters({ categories, onSearch, onFilterChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "Any",
    status: "Any",
    minPrice: "",
    maxPrice: "",
    verified: false,
    bedrooms: "Any",
    propertyType: "Any",
    amenities: [],
  });

  const resetFilters = () => {
    setFilters({
      type: "Any",
      status: "Any",
      minPrice: "",
      maxPrice: "",
      verified: false,
      bedrooms: "Any",
      propertyType: "Any",
      amenities: [],
    });
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center w-full max-w-xl">
          <Search className="absolute left-4 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search by title, location..."
            className="input input-bordered w-full pl-12 pr-14 rounded-full bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <SlidersHorizontal
            className="absolute right-4 text-gray-700 text-xl cursor-pointer hover:text-primary"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

     {isFilterOpen && (
  <div
    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setIsFilterOpen(false)}   // <-- closes when clicking outside
  >
    <div
      className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-fadeIn"
      onClick={(e) => e.stopPropagation()}   // <-- prevents closing when clicking inside
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
        <X
          className="cursor-pointer text-gray-600 hover:text-primary"
          onClick={() => setIsFilterOpen(false)}
        />
      </div>

      {/* Recommended */}
      <div className="mb-6">
        <h4 className="text-gray-800 font-medium mb-3">Recommended for you</h4>
        <div className="grid grid-cols-4 gap-3">
          {["TV", "Kitchen", "Washer", "Guest favorite"].map((item) => (
            <button key={item} className="border rounded-xl p-3 hover:border-black transition text-center text-sm">
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Type of place */}
      <div className="border-t pt-5">
        <h4 className="font-medium text-gray-900 mb-3">Type of place</h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Any type", value: "Any" },
            { label: "Room", value: "Room" },
            { label: "Entire home", value: "Entire" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilters({ ...filters, type: opt.value })}
              className={`rounded-xl py-3 border text-sm font-medium transition ${
                filters.type === opt.value
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="border-t pt-5 mt-5">
        <h4 className="font-medium text-gray-900 mb-3">Bedrooms</h4>
        <div className="grid grid-cols-4 gap-3">
          {["Any", 1, 2, 3, 4, 5].map((bed) => (
            <button
              key={bed}
              onClick={() => setFilters({ ...filters, bedrooms: bed })}
              className={`rounded-xl py-3 border text-sm font-medium transition ${
                filters.bedrooms === bed
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {bed === "Any" ? "Any" : `${bed}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="border-t pt-5 mt-5">
        <h4 className="font-medium text-gray-900 mb-3">Property Type</h4>
        <div className="grid grid-cols-3 gap-3">
          {["Any", "Apartment", "House", "Duplex", "Bungalow", "Studio"].map((pt) => (
            <button
              key={pt}
              onClick={() => setFilters({ ...filters, propertyType: pt })}
              className={`rounded-xl py-3 border text-sm font-medium transition ${
                filters.propertyType === pt
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {pt}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-t pt-5 mt-5">
        <h4 className="font-medium text-gray-900 mb-3">Price Range (₦)</h4>
        <div className="flex gap-3">
          <input
            type="number"
            className="input input-bordered w-1/2"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
          <input
            type="number"
            className="input input-bordered w-1/2"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Verified */}
      <div className="border-t pt-5 mt-5 flex items-center gap-3">
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={filters.verified}
          onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
        />
        <span className="text-gray-700 font-medium">Verified only</span>
      </div>

      {/* Amenities --- Dropdown */}
      <div className="border-t pt-5 mt-5">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
        >
          <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
          <span className="text-gray-600 text-sm">
            {isAmenitiesOpen ? "Hide" : "Show"}
          </span>
        </div>

        {isAmenitiesOpen && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {["Wifi", "Parking", "Pool", "AC", "Gym", "Security", "Water", "Balcony", "Pet Friendly"].map(
              (amen) => (
                <button
                  key={amen}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      amenities: filters.amenities.includes(amen)
                        ? filters.amenities.filter((a) => a !== amen)
                        : [...filters.amenities, amen],
                    })
                  }
                  className={`rounded-xl py-3 border text-sm font-medium transition ${
                    filters.amenities.includes(amen)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {amen}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-between items-center">
        <button className="text-gray-700 underline" onClick={resetFilters}>
          Clear all
        </button>
        <button
          className="btn bg-black text-white rounded-full px-6 py-2 text-lg hover:bg-gray-900"
          onClick={handleApply}
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
