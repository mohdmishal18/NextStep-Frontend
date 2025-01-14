import React, { useState } from "react";
import { Subscription } from "@/Types/SubscriptionTypes";
import { Card, CardHeader, CardBody, Chip, Button } from "@nextui-org/react";
import SubscriptionForm from "./SubscriptionForm";
import { useEditSubscription } from "@/hooks/useSubscription";

const SubscriptionList: React.FC<{ subscriptions: Subscription[] }> = ({ subscriptions = [] }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editSubscription, setEditSubscription] = useState<Subscription | null>(null);
  
  const editMutation = useEditSubscription();

  const handleEdit = (subscription: Subscription) => {
    setEditSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Partial<Subscription>) => {
    if (editSubscription) {
      editMutation.mutate(
        { 
          id: editSubscription._id, 
          data: data 
        },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditSubscription(null);
          },
          onError: (error) => {
            console.error("Failed to update subscription:", error);
          }
        }
      );
    }
  };

  return (
    <div className="space-y-4 p-6">
      {subscriptions.map((sub) => (
        <Card key={sub._id} className="w-full">
          <CardHeader className="flex justify-between items-center bg-blue-50">
            <div>
              <h3 className="text-xl font-bold capitalize">{sub.type} Plan</h3>
              <Chip color="primary" variant="flat" className="mt-2">
                ${sub.price} / {sub.duration} months
              </Chip>
            </div>
            <Button
              color="primary"
              variant="light"
              onPress={() => handleEdit(sub)}
            >
              Edit
            </Button>
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
      {isFormOpen && (
        <SubscriptionForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          defaultValues={editSubscription}
        />
      )}
    </div>
  );
};

export default SubscriptionList;