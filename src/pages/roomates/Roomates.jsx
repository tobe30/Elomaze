import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoommateFilters from '../../components/roomates/RoomatesFilters';
import { CheckCircle, MapPin, GraduationCap, Heart, BadgeCheck, Wallet, MessageCircle, Briefcase } from "lucide-react";

const roommates = [
  {
    id: 1,
    name: "Sarah Chen",
    school: "MIT Engineering",
    location: "Cambridge, MA",
    bio: "Looking for a neat female roommate near school gate 🏡",
    budget: 150000,
    image: "/student-profile.jpg",
    verified: true,
    gender: "female",
  },
  {
    id: 2,
    name: "Marcus Jones",
    school: "Harvard Business",
    location: "Boston, MA",
    bio: "Easygoing and clean — prefer someone tidy and social.",
    budget: 180000,
    image: "/roommate2.jpg",
    verified: true,
    gender: "male",
  },
  {
    id: 3,
    name: "Priya Patel",
    school: "BU Computer Science",
    location: "Boston, MA",
    bio: "Quiet, respectful, and loves cooking together.",
    budget: 200000,
    image: "/roommate3.jpg",
    verified: false,
    gender: "female",
  },
];

const Roomates = () => {
  const [filteredRoommates, setFilteredRoommates] = useState(roommates);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const applyFilters = (filters) => {
    setFilters(filters);
    filterRoommates(searchTerm, filters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterRoommates(term, filters);
  };

  const filterRoommates = (term, filters) => {
    const filtered = roommates.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(term.toLowerCase()) ||
        r.school.toLowerCase().includes(term.toLowerCase()) ||
        r.location.toLowerCase().includes(term.toLowerCase());

      const matchesGender = !filters.gender || filters.gender === "Any"
        ? true
        : r.gender === filters.gender;

      const matchesMinBudget = !filters.minBudget || r.budget >= parseInt(filters.minBudget);
      const matchesMaxBudget = !filters.maxBudget || r.budget <= parseInt(filters.maxBudget);
      const matchesVerified = !filters.verified || r.verified === filters.verified;

      return matchesSearch && matchesGender && matchesMinBudget && matchesMaxBudget && matchesVerified;
    });

    setFilteredRoommates(filtered);
  };

  return (
    <>

      <div className="max-w-7xl mt-5 mx-auto p-4">
        {/* Filters */}
        <RoommateFilters onSearch={handleSearch} onFilterChange={applyFilters} />

        {/* Showing text */}
        <div className="mb-4 text-gray-700 font-medium">
          {filteredRoommates.length === 0
            ? "No roommates found"
            : `Showing ${filteredRoommates.length} roommate${filteredRoommates.length > 1 ? "s" : ""}`}
        </div>

        {/* Roommate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.map((person) => (
            <Link
              key={person.id}
              to={`/roommates/${person.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col"
            >
              {/* Top section */}
              <div className="flex items-start gap-4 mb-4 relative">
                <div className="relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  {person.verified && (
                    <BadgeCheck className="w-5 h-5 text-white absolute -top-2 -right-2 bg-blue-500 rounded-full p-[2px]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-semibold text-gray-900">{person.name}</span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">{person.school}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="truncate">{person.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => e.stopPropagation()} // stops navigation
                  className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-gray-100 my-3"></div>

              {/* Budget */}
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                 <Wallet className="w-4 h-4 text-primary" />
                 <span className="text-sm text-muted-foreground">Budget:</span>
                <span className="font-semibold text-gray-900">₦{person.budget.toLocaleString()}</span>
                <span className="text-sm text-gray-500">/year</span>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm mb-5 flex-grow">{person.bio}</p>

              {/* Connect Button */}
              <button
                onClick={(e) => e.stopPropagation()} // stops navigation
                className="btn w-full rounded-xl bg-primary text-white hover:bg-blue-500 transition-all duration-300 border-0 mt-auto flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Message
              </button>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredRoommates.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No roommates match your search or filters.
          </p>
        )}
      </div>
    </>
  );
};

export default Roomates;
