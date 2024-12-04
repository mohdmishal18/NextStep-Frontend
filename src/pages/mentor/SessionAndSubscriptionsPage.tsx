// SessionAndSubscriptionsPage.tsx
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import SubscriptionForm from '../../components/mentor/SessionAndSubscription/SubscriptionForm';
import SubscriptionList from '../../components/mentor/SessionAndSubscription/SubscriptionList';
import { SubscriptionFormData } from '../../Types/SubscriptionTypes';

const SessionAndSubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionFormData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSubscription, setEditSubscription] = useState<SubscriptionFormData | null>(null);

  const handleAddOrUpdate = (newSubscription: SubscriptionFormData) => {
    if (editSubscription) {
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === editSubscription.id ? newSubscription : sub))
      );
    } else {
      setSubscriptions((prev) => [...prev, { ...newSubscription, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditSubscription(null);
  };

  const handleDelete = (id: number) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const openModal = () => {
    setIsModalOpen(true);
    setEditSubscription(null);
  };

  const openEditModal = (subscription: SubscriptionFormData) => {
    setIsModalOpen(true);
    setEditSubscription(subscription);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Session and Subscriptions</h1>
      <div>
        <Button onPress={openModal}>Create Subscription</Button>
        <SubscriptionList
          subscriptions={subscriptions}
          setEditSubscription={openEditModal}
          handleDelete={handleDelete}
        />
        <SubscriptionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editSubscription={editSubscription}
          handleAddOrUpdate={handleAddOrUpdate}
        />
      </div>
    </div>
  );
};

export default SessionAndSubscriptionsPage;