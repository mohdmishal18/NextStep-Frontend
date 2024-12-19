import React, { useState, useEffect } from 'react';
import { 
  Avatar, 
  Card, 
  CardBody, 
  Button, 
  Chip,
  Input,
  Select,
  SelectItem,
  Slider
} from "@nextui-org/react";
import { Filter, Globe, Linkedin, MapPin, Search, Star } from "lucide-react";
import { getApprovedMentors } from '@/api/admin';
import { MentorData } from '@/Types/mentorTypes';

const DiscoverMentors: React.FC = () => {
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await getApprovedMentors();
      console.log("response for fetch mentors", response)
      setMentors(response.data.approvedMentors || []);
    } catch (error) {
      console.error('Failed to fetch mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-[40px] w-11/12 ml-10">
      <div className="flex space-x-8">
        {/* Filters Section */}
        <div className="flex-none w-1/4 mb-6 space-y-6">
          {/* Search Input */}
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search mentors by name, skill, or expertise"
              startContent={<Search className="text-zinc-400" />}
              className="flex-grow"
            />
            <Button 
              isIconOnly 
              variant="flat" 
              color="primary"
            >
              <Filter />
            </Button>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 gap-4">
            {/* Price Range Filter */}
            <div>
              <p className="text-zinc-300 mb-2">Hourly Rate</p>
              <Slider
                step={10}
                minValue={0}
                maxValue={200}
                label="Price Range"
                formatOptions={{style: "currency", currency: "USD"}}
              />
            </div>

            {/* Rating Filter */}
            <div>
              <p className="text-zinc-300 mb-2">Minimum Rating</p>
              <div className="flex items-center space-x-2">
                <Slider
                  step={0.5}
                  minValue={0}
                  maxValue={5}
                  label="Rating"
                />
                <Star className="text-yellow-500" fill="currentColor" />
              </div>
            </div>

            {/* Skills Filter */}
            <Select
              label="Skills"
              placeholder="Select skills"
              selectionMode="multiple"
            >
              {[
                'Web Development', 
                'Machine Learning', 
                'Data Science', 
                'Mobile Development', 
                'Cloud Computing', 
                'Cybersecurity'
              ].map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </Select>

            {/* Experience Level Filter */}
            <Select
              label="Experience Level"
              placeholder="Select experience"
            >
              <SelectItem key="entry">Entry Level</SelectItem>
              <SelectItem key="mid">Mid Level</SelectItem>
              <SelectItem key="senior">Senior Level</SelectItem>
              <SelectItem key="expert">Expert Level</SelectItem>
            </Select>
          </div>

          {/* Reset Filters */}
          <div className="flex justify-start">
            <Button color="danger" variant="flat">
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor._id} shadow="sm" className="bg-zinc-700">
              <CardBody className="flex flex-col items-center">
                <Avatar 
                  src={mentor.profilePicture} 
                  className="w-24 h-24 mb-4"
                />
                
                <h3 className="text-lg font-bold text-white">
                  {mentor.firstName} {mentor.lastName}
                </h3>
                
                <p className="text-zinc-300 mb-2">
                  {mentor.jobTitle} at {mentor.company}
                </p>
                
                <div className="flex items-center text-zinc-400 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span>{mentor.location}</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {mentor.skills.slice(0, 3).map((skill) => (
                    <Chip 
                      key={skill.name} 
                      size="sm" 
                      variant="flat" 
                      color="default"
                    >
                      {skill.name}
                    </Chip>
                  ))}
                </div>
                
                <div className="flex space-x-2 mb-4">
                  {mentor.linkedInUrl && (
                    <Button 
                      isIconOnly 
                      variant="flat" 
                      color="default" 
                      onClick={() => window.open(mentor.linkedInUrl, '_blank')}
                    >
                      <Linkedin size={20} />
                    </Button>
                  )}
                  
                  {mentor.personalWebsiteUrl && (
                    <Button 
                      isIconOnly 
                      variant="flat" 
                      color="default" 
                      onClick={() => window.open(mentor.personalWebsiteUrl, '_blank')}
                    >
                      <Globe size={20} />
                    </Button>
                  )}
                </div>
                
                <Button 
                  color="primary" 
                  variant="solid" 
                  className="w-full"
                  onClick={() => window.location.href = `/mentor/${mentor._id}`}
                >
                  View Profile
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-zinc-400 py-10">
          Loading mentors...
        </div>
      )}

      {/* No Mentors State */}
      {!loading && mentors.length === 0 && (
        <div className="text-center text-zinc-400 py-10">
          No mentors found.
        </div>
      )}
    </div>
  );
};

export default DiscoverMentors;
