import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import SubscriptionForm from "../../components/mentor/SessionAndSubscription/SubscriptionForm";
import SubscriptionList from "../../components/mentor/SessionAndSubscription/SubscriptionList";
import { useSubscriptions, useCreateSubscription } from "@/hooks/useSubscription";

const SessionAndSubscriptionsPage: React.FC = () => {
  const { data, isLoading } = useSubscriptions();
  const subscriptions = data?.data;
  const createSubscriptionMutation = useCreateSubscription();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (data: any) => {
    createSubscriptionMutation.mutate(data);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Session and Subscriptions</h1>
      <Button onPress={() => setIsModalOpen(true)}>Create Subscription</Button>
      <SubscriptionList subscriptions={subscriptions} />
      <SubscriptionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default SessionAndSubscriptionsPage;