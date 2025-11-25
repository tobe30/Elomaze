import { useRef, useState, useEffect } from "react";
import { Heart, CheckCircle, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const roommates = [
  {
    id: 1,
    name: "Sarah Chen",
    school: "MIT Engineering",
    location: "Cambridge, MA",
    bio: "Looking for a neat female roommate near school gate 🏡",
    budget: "₦150k - ₦200k",
    preference: "male",
    image: "/student-profile.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Jones",
    school: "Harvard Business",
    location: "Boston, MA",
    bio: "Easygoing and clean — prefer someone tidy and social.",
    budget: "₦150k - ₦200k",
    preference: "female",
    image: "/roommate2.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Priya Patel",
    school: "BU Computer Science",
    location: "Boston, MA",
    bio: "Quiet, respectful, and loves cooking together.",
    budget: "₦150k - ₦200k",
    preference: "female",
    image: "/roommate3.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Priya Patel",
    school: "BU Computer Science",
    location: "Boston, MA",
    bio: "Quiet, respectful, and loves cooking together.",
    budget: "₦150k - ₦200k",
    preference: "female",
    image: "/roommate3.jpg",
    verified: true,
  },
];

const FindRoommates = () => {
  const containerRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Pointer (mouse + touch) handlers
    const onPointerDown = (e) => {
      isDownRef.current = true;
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      scrollLeftRef.current = el.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (!isDownRef.current) return;
      // prevent selecting text while dragging
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startXRef.current) * 1.2; // scroll speed
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const onPointerUp = (e) => {
      isDownRef.current = false;
      setIsDragging(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section className="px-4 md:px-12 py-12 bg-[#fafafa]">
      {/* inline css to hide native scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black">
            Roommates That Match Your Lifestyle
          </h3>
          <p className="text-gray-500 mt-1 text-[15px]">
            Find someone who fits your vibe by interests, location, or budget
          </p>
        </div>

        <Link
          to="/listings"
          className="flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all duration-300"
        >
          <span>View all</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Horizontal Scroll Section */}
      <div
        ref={containerRef}
  className={`flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scroll-smooth select-none ${
    isDragging ? "cursor-grabbing" : "cursor-grab"
  }`}
  style={{
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch", // adds iOS smoothness
  }}
      >
        {roommates.map((person) => (
          <div
            key={person.id}
            className="min-w-[300px] sm:min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col snap-start"
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
                  <CheckCircle className="w-5 h-5 text-primary absolute -top-2 -right-2 bg-white rounded-full p-[2px]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-semibold text-gray-900">{person.name}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />
                    <span className="truncate">{person.school}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="truncate">{person.location}</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-gray-100 my-3"></div>

            {/* Budget */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-gray-900">{person.budget}</span>
              <span className="text-sm text-gray-500">/budget</span>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm mb-5 flex-grow">{person.bio}</p>

            {/* Button */}
            <button className="btn w-full rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 border-0 mt-auto">
              Connect
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FindRoommates;
