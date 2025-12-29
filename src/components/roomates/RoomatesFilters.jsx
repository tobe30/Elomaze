import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function RoommateFilters({ onSearch, onFilterChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    gender: "Any",
    verified: null,
    minBudget: "",
    maxBudget: "",
    preferences: {
      non_smoker: null,
      pet_friendly: null,
      gaming: null,
      cooking: null,
      quiet: null,
      clean: null,
      social: null,
      night_owl: null,
      early_riser: null,
      drinking: null,
    },
  });

  const resetFilters = () => {
    setFilters({
      role: "",
      gender: "Any",
      verified: null,
      minBudget: "",
      maxBudget: "",
      preferences: Object.fromEntries(
        Object.keys(filters.preferences).map((key) => [key, null])
      ),
    });
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  const togglePreference = (key) => {
    setFilters({
      ...filters,
      preferences: {
        ...filters.preferences,
        [key]: filters.preferences[key] === true ? false : true,
      },
    });
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center w-full max-w-xl">
          <Search className="absolute left-4 text-primary text-lg" />
          <input
            type="text"
            placeholder="Search by name, location..."
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
              <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
              <X
                className="cursor-pointer text-gray-600 hover:text-primary"
                onClick={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Role */}
            <div className="border-t pt-5">
              <h4 className="font-medium text-gray-900 mb-3">Role</h4>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g Student, Professional"
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value })
                }
              />
            </div>

            {/* Gender */}
            <div className="border-t pt-5 mt-5">
              <h4 className="font-medium text-gray-900 mb-3">Gender</h4>
              <div className="grid grid-cols-3 gap-3">
                {["Any", "Male", "Female"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilters({ ...filters, gender: opt })}
                    className={`rounded-xl py-3 border text-sm font-medium transition ${
                      filters.gender === opt
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified */}
            <div className="border-t pt-5 mt-5">
              <h4 className="font-medium text-gray-900 mb-3">Verified</h4>
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

            {/* Budget */}
            <div className="border-t pt-5 mt-5">
              <h4 className="font-medium text-gray-900 mb-3">Budget Range (₦)</h4>
              <div className="flex gap-3">
                <input
                  type="number"
                  className="input input-bordered w-1/2"
                  placeholder="Min"
                  value={filters.minBudget}
                  onChange={(e) =>
                    setFilters({ ...filters, minBudget: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="input input-bordered w-1/2"
                  placeholder="Max"
                  value={filters.maxBudget}
                  onChange={(e) =>
                    setFilters({ ...filters, maxBudget: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Preferences Dropdown */}
            <div className="border-t pt-5 mt-5">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
              >
                <h4 className="font-medium text-gray-900 mb-2">Preferences</h4>
                <span className="text-gray-600 text-sm">
                  {isPreferencesOpen ? "Hide" : "Show"}
                </span>
              </div>

              {isPreferencesOpen && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {Object.keys(filters.preferences).map((key) => (
                    <button
                      key={key}
                      onClick={() => togglePreference(key)}
                      className={`rounded-xl py-3 border text-sm font-medium transition ${
                        filters.preferences[key] === true
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {key.replace("_", " ").toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
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
