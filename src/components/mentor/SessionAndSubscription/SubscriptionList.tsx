import React from "react";
import { Subscription } from "@/Types/SubscriptionTypes";
import { Card, CardHeader, CardBody, CardFooter, Chip } from "@nextui-org/react";

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions = [] }) => {
  return (
    <div className="space-y-4 p-6">
      {subscriptions.map((sub) => (
        <Card key={sub._id} className="w-full">
          <CardHeader className="flex justify-between items-center bg-blue-50">
            <div>
              <h3 className="text-xl font-bold capitalize">
                {sub.type} Plan
              </h3>
              <Chip 
                color="primary" 
                variant="flat" 
                className="mt-2"
              >
                ${sub.price} / {sub.duration} months
              </Chip>
            </div>
          </CardHeader>
          
          <CardBody>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Audio Calls</h4>
                <p>
                  {sub.features.audioCalls.callsPerMonth} calls per month
                  <br />
                  {sub.features.audioCalls.callDuration} minutes per call
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Video Calls</h4>
                <p>
                  {sub.features.videoCalls.callsPerMonth} calls per month
                  <br />
                  {sub.features.videoCalls.callDuration} minutes per call
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Additional Features</h4>
                <ul className="space-y-1">
                  <li>
                    Chat Access: 
                    <Chip 
                      size="sm" 
                      color={sub.features.chatAccess ? "success" : "default"} 
                      variant="flat" 
                      className="ml-2"
                    >
                      {sub.features.chatAccess ? "Enabled" : "Disabled"}
                    </Chip>
                  </li>
                  <li>
                    Blog Access: 
                    <Chip 
                      size="sm" 
                      color={sub.features.blogAccess ? "success" : "default"} 
                      variant="flat" 
                      className="ml-2"
                    >
                      {sub.features.blogAccess ? "Available" : "Unavailable"}
                    </Chip>
                  </li>
                  <li>Chat Response Time: {sub.features.chatResponseTime}</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionList;