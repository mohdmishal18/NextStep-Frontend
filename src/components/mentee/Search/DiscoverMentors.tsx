import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useMentors } from "@/hooks/useSearch";
import { SearchFilters } from "@/Types/mentorTypes";
import useDebounce from "@/hooks/useDebounce";
import { FilterX, Star } from "lucide-react";

interface Skill {
  id: string;
  name: string;
}

interface Subscription {
  type: string;
  price: number;
}

interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  location: string;
  skills: Skill[];
  profilePicture: string;
  subscriptions: Subscription[];
}

interface MentorsResponse {
  mentors: Mentor[];
  total: number;
}

const DiscoverMentors = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialFilters = (): SearchFilters => {
    return {
      search: searchParams.get("search") || "",
      skills: searchParams.get("skills")?.split(",").filter(Boolean) || [],
      jobTitle: searchParams.get("jobTitle") || "",
      company: searchParams.get("company") || "",
      minPrice: Number(searchParams.get("minPrice")) || 100,
      maxPrice: Number(searchParams.get("maxPrice")) || 10000,
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 5,
    };
  };

  const getDefaultFilters = (): SearchFilters => ({
    search: "",
    skills: [],
    jobTitle: "",
    company: "",
    minPrice: 100,
    maxPrice: 10000,
    page: 1,
    limit: 5,
  });

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<SearchFilters>(getInitialFilters);

  const handleClearFilters = () => {
    setFilters(getDefaultFilters());
  };

  // Update filters when searchParams change
  useEffect(() => {
    setFilters(getInitialFilters());
  }, [searchParams]);

  // Apply debounce to the filters with a 500ms delay
  const debouncedFilters = useDebounce(filters, 500);

  // Use the debounced filters in the API call
  const { data, isLoading, isError, error } = useMentors(debouncedFilters);
  const mentors = data?.mentors || [];
  console.log(mentors, "mentors");

  const handlePriceChange = (values: number[]) => {
    if (values.length === 2) {
      setFilters((prev) => ({
        ...prev,
        minPrice: values[0],
        maxPrice: values[1],
      }));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const handleSkillChange = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills?.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...(prev.skills || []), skill],
    }));
  };

  const handleJobTitleChange = (title: string) => {
    setFilters((prev) => ({
      ...prev,
      jobTitle: title,
    }));
  };

  const handleCompanyChange = (company: string) => {
    setFilters((prev) => ({
      ...prev,
      company: company,
    }));
  };

  // Update the URL whenever the filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.set("search", filters.search);
    if (filters.skills.length) {
      newSearchParams.set("skills", filters.skills.join(","));
    }
    newSearchParams.set("jobTitle", filters.jobTitle);
    newSearchParams.set("company", filters.company);
    newSearchParams.set("minPrice", filters.minPrice.toString());
    newSearchParams.set("maxPrice", filters.maxPrice.toString());
    newSearchParams.set("page", filters.page.toString());
    newSearchParams.set("limit", filters.limit.toString());

    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const skillOptions = ["React", "Node.js", "Data Science", "UI/UX"];
  const jobTitleOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Product Manager",
  ];
  const companyOptions = ["Google", "Meta", "Amazon", "Microsoft"];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <aside className="w-full lg:w-1/4 space-y-6 bg-white p-6 rounded-md shadow-md">
        {/* Search Box */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Search</h3>
            <Input
              placeholder="Search by name, company, or job title"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleClearFilters}
          >
            <FilterX className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>

        {/* Skill Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="space-y-2">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={skill}
                  checked={filters.skills?.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                  className="checkbox"
                />
                <label htmlFor={skill} className="text-sm">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Job Title Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Job Title</h3>
          <div className="space-y-2">
            {jobTitleOptions.map((job) => (
              <div key={job} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="jobTitle"
                  id={job}
                  checked={filters.jobTitle === job}
                  onChange={() => handleJobTitleChange(job)}
                  className="radio"
                />
                <label htmlFor={job} className="text-sm">
                  {job}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <Slider
            defaultValue={[filters.minPrice, filters.maxPrice]}
            min={100}
            max={10000}
            step={100}
            minStepsBetweenThumbs={1}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>

        {/* Company Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <div className="space-y-2">
            {companyOptions.map((company) => (
              <div key={company} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="company"
                  id={company}
                  checked={filters.company === company}
                  onChange={() => handleCompanyChange(company)}
                  className="radio"
                />
                <label htmlFor={company} className="text-sm">
                  {company}
                </label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 space-y-6">
        {isLoading ? (
          <div className="text-center py-8">Loading mentors...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error loading mentors:{" "}
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-8">
            No mentors found matching your criteria
          </div>
        ) : (
          mentors.map((mentor: Mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row p-4 gap-6">
                {/* Left Section - Large Profile Picture */}
                <div className="md:w-64 flex-shrink-0">
                  <img
                    src={mentor.profilePicture}
                    alt={`${mentor.firstName} ${mentor.lastName}`}
                    className="w-full h-72 object-cover rounded-lg shadow-sm"
                  />
                </div>

                {/* Right Section - Content */}
                <div className="flex-1">
                  <div className="space-y-4">
                    {/* Header Section */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {mentor.firstName} {mentor.lastName}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {mentor.jobTitle} at {mentor.company}
                      </p>

                      {/* Rating Bar */}
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          (5.0)
                        </span>
                      </div>
                    </div>

                    {/* Bio Section */}
                    <p className="text-gray-600 line-clamp-3">{mentor.bio}</p>

                    {/* Skills Section */}
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {mentor.skills.map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="secondary"
                            className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section - Price and Action */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${mentor.subscriptions[0]?.price}
                          <span className="text-base text-gray-500 font-normal">
                            /month
                          </span>
                        </p>
                      </div>
                      <Button asChild className="px-6" size="lg">
                        <Link to={`/mentee/mentor/${mentor.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default DiscoverMentors;
