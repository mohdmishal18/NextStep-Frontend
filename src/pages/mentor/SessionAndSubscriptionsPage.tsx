import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Subscription } from "@/Types/SubscriptionTypes";
import SubscriptionForm from "../../components/mentor/SessionAndSubscription/SubscriptionForm";
import SubscriptionList from "../../components/mentor/SessionAndSubscription/SubscriptionList";
import { useSubscriptions, useCreateSubscription, useEditSubscription } from "@/hooks/useSubscription";

const SessionAndSubscriptionsPage: React.FC = () => {
  const { data, isLoading } = useSubscriptions();
  const subscriptions = data?.data;
  const createSubscriptionMutation = useCreateSubscription();
  const updateSubscriptionMutation = useEditSubscription();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const handleCreate = (data: any) => {
    createSubscriptionMutation.mutate(data);
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    if (editingSubscription) {
      updateSubscriptionMutation.mutate({ ...editingSubscription, ...data });
    }
    setIsModalOpen(false);
    setEditingSubscription(null);
  };

  const openEditModal = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Session and Subscriptions</h1>
      <Button onPress={() => setIsModalOpen(true)}>Create Subscription</Button>
      <SubscriptionList subscriptions={subscriptions} onEdit={openEditModal} />
      <SubscriptionForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingSubscription ? handleEdit : handleCreate}
        defaultValues={editingSubscription || undefined}
      />
    </div>
  );
};

export default SessionAndSubscriptionsPage;