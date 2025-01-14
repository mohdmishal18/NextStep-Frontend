import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Star, MapPin, BookmarkPlus, Globe, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMentorById } from '@/hooks/useMentor';

const MentorDetails = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const { data: mentorResponse, isLoading, error } = useMentorById(id);
  const mentor = mentorResponse?.MentorData;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading mentor details</div>;
  }

  if (!mentor) {
    return <div className="min-h-screen flex items-center justify-center">Mentor not found</div>;
  }

  // Sample reviews data (since it's not in the API response)
  const reviews = [
    {
      id: 1,
      author: "Mike P.",
      rating: 5,
      text: "Great mentor with excellent guidance and support.",
      date: "2 weeks ago"
    }
  ];

  // Plans data (keeping the original plans)
  const plans = {
    lite: {
      price: 49,
      callsPerMonth: 1,
      videoCallsPerMonth: 1,
      spotsLeft: 5,
      features: [
        "1 one-on-one call monthly",
        "1 video call monthly",
        "Unlimited chat Q&A",
        "Basic career guidance"
      ]
    },
    standard: {
      price: 99,
      callsPerMonth: 2,
      videoCallsPerMonth: 2,
      spotsLeft: 3,
      features: [
        "2 one-on-one calls monthly",
        "2 video calls monthly",
        "Unlimited chat Q&A",
        "Resume review",
        "Priority support"
      ]
    },
    pro: {
      price: 199,
      callsPerMonth: 4,
      videoCallsPerMonth: 4,
      spotsLeft: 2,
      features: [
        "4 one-on-one calls monthly",
        "4 video calls monthly",
        "Unlimited chat Q&A",
        "Resume review",
        "Interview preparation",
        "Project code review",
        "24/7 priority support"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with background */}
      <div className="relative">
        <div className="h-80 bg-blue-600"/>
        
        {/* Main content container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-48">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left column */}
              <div className="lg:col-span-2">
                {/* Profile section */}
                <Card className="mb-12">
                  <CardContent className="pt-8 px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <Avatar className="w-48 h-48">
                        <img
                          src={mentor.profilePicture}
                          alt={`${mentor.firstName} ${mentor.lastName}`}
                          className="object-cover"
                        />
                      </Avatar>
                      
                      <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-3">
                          {mentor.firstName} {mentor.lastName}
                        </h1>
                        <p className="text-xl text-gray-600 mb-4">
                          {mentor.jobTitle} at {mentor.company}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {mentor.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill._id} variant="secondary" className="text-lg py-1 px-3">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-6 text-base text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            {mentor.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            {mentor.rating} reviews
                          </div>
                          <Button variant="outline" size="lg" className="flex items-center gap-2">
                            <BookmarkPlus className="w-5 h-5" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bio section */}
                <Card className="mb-12">
                  <CardHeader className="px-8">
                    <CardTitle className="text-2xl">About Me</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8">
                    <p className="text-lg text-gray-600">{mentor.bio}</p>
                  </CardContent>
                </Card>

                {/* Reviews section */}
                <Card className="mb-12">
                  <CardHeader className="px-8">
                    <CardTitle className="text-2xl">Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8">
                    {reviews.map((review) => (
                      <div key={review.id} className="mb-8 last:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-12 h-12">
                            <img src="/api/placeholder/48/48" alt={review.author} />
                          </Avatar>
                          <div>
                            <p className="text-lg font-medium">{review.author}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <span className="text-base text-gray-600">{review.rating}</span>
                            </div>
                          </div>
                          <span className="ml-auto text-base text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-lg text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* All Skills section */}
                <Card className="mb-12">
                  <CardHeader className="px-8">
                    <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8">
                    <div className="flex flex-wrap gap-3">
                      {mentor.skills.map((skill) => (
                        <Badge key={skill._id} variant="secondary" className="text-lg py-1 px-3">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column - Sticky subscription card */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="border-2">
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-3xl font-bold">Mentorship Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue={selectedPlan} onValueChange={setSelectedPlan} className="w-full">
                        <TabsList className="grid grid-cols-3 mb-8">
                          <TabsTrigger value="lite">Lite</TabsTrigger>
                          <TabsTrigger value="standard">Standard</TabsTrigger>
                          <TabsTrigger value="pro">Pro</TabsTrigger>
                        </TabsList>
                        
                        {Object.entries(plans).map(([plan, details]) => (
                          <TabsContent key={plan} value={plan} className="mt-0">
                            <div className="space-y-6">
                              <div className="text-center">
                                <div className="text-4xl font-bold">${details.price}</div>
                                <div className="text-gray-500">per month</div>
                              </div>
                              
                              <div className="space-y-4">
                                {details.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-600">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <Button className="w-full text-lg py-6">Apply Now</Button>
                              
                              <div className="text-center text-sm font-medium text-orange-600">
                                Only {details.spotsLeft} spots left!
                              </div>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;