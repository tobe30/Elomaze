import { useState } from "react";
import PropertyFilters from "../../components/propertycard/PropertyFilters";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Car, CheckCircle, Dumbbell, Heart, MapPin, Star, Wifi } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "120,0000",
    image: "/home.jpg",
    status: "Sale",
    sponsored: true,
    verified: true,
    type: "Apartment",
  },
  {
    id: 2,
    title: "Spacious 2-Bedroom Flat",
    location: "Victoria Island, Lagos",
    price: "100,000",
    image: "/b-11.jpg",
    status: "Rent",
    sponsored: true,
    verified: false,
    type: "Duplex",
  },
  {
    id: 3,
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: "120,0000",
    image: "/IMG_4430.jpg",
    status: "Fractional Ownership",
    sponsored: true,
    verified: true,
    type: "Penthouse",
  },
];

export default function PropertyListing() {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Mansion",
    "Ranch House",
    "Apartment",
    "Penthouse",
    "Villa",
    "Mobile Home",
    "Duplex",
    "Farmhouse",
    "Townhouse",
  ];

  const applyFilters = (filters) => {
    setFilters(filters);
    filterListings(searchTerm, filters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterListings(term, filters);
  };

  const filterListings = (term, filters) => {
    let filtered = listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.location.toLowerCase().includes(term.toLowerCase());

      const matchesType =
        filters.type === "Any" || !filters.type
          ? true
          : item.type === filters.type;

      const matchesMin =
        !filters.minPrice || parseInt(item.price) >= parseInt(filters.minPrice);
      const matchesMax =
        !filters.maxPrice || parseInt(item.price) <= parseInt(filters.maxPrice);

      const matchesVerified =
        !filters.verified || item.verified === filters.verified;

      return (
        matchesSearch && matchesType && matchesMin && matchesMax && matchesVerified
      );
    });

    setFilteredListings(filtered);
  };

  return (
    <>
    <div className="max-w-7xl mt-5 mx-auto p-4">
      {/* Filter + Search */}
      <PropertyFilters
        categories={categories}
        onSearch={handleSearch}
        onFilterChange={applyFilters}
      />
{/* 🏠 Showing Text */}
<div className="mb-4 text-gray-700 font-medium">
  {filteredListings.length >= 1000
    ? "Over 1,000 homes"
    : `Showing ${filteredListings.length} ${filteredListings.length === 1 ? "property" : "properties"}`}
</div>

      {/* 🏠 Property Grid */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
  {filteredListings.map((listing) => (
    <Link
      key={listing.id}
      to={`/listing/${listing.id}`}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 overflow-hidden group flex flex-col"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {listing.status || "For Rent"}
        </div>
        

        {/* Heart Button */}
      <button
  onClick={(e) => {
    e.preventDefault();   // stop the link from opening
    e.stopPropagation(); // stop the click from bubbling to the card
  }}
  className="absolute top-3 right-3 bg-white/90 backdrop-blur-lg rounded-full p-2 shadow-sm 
             hover:bg-white/60 transition-all duration-300 transform hover:scale-110"
>
  <Heart
    className="w-5 h-5 text-gray-600 transition-colors duration-300 hover:text-red-500"
  />
</button>



      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900">
          {listing.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm gap-1">
          <MapPin className="w-4 h-4 text-primary" />
          {listing.location}
        </div>

        {/* Icons Row */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
          <span className="flex items-center gap-1">
            <Wifi className="w-4 h-4 text-primary" /> Wifi
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-4 h-4 text-primary" /> Parking
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="w-4 h-4 text-primary" /> Gym
          </span>
        </div>

        {/* Price + Rating + Verified */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-[17px] font-bold text-black">
            ₦{listing.price}
            <span className="text-gray-500 font-normal text-sm"> /year</span>
          </p>

         

          {listing.verified && (
            <div className="flex items-center gap-1 text-blue-900 text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              Verified
            </div>
          )}
        </div>
      </div>
    </Link>
  ))}
</div>





      {/* 🧾 Empty State */}
      {filteredListings.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No properties match your search or filters.
        </p>
      )}
    </div>
    </>
  );
}
