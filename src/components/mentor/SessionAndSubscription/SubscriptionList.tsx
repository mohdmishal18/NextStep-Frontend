// SubscriptionList.tsx
import React from 'react';
import { Card, Button, CardFooter, CardBody, CardHeader } from '@nextui-org/react';
import { SubscriptionFormData } from '../../../Types/SubscriptionTypes';

interface SubscriptionListProps {
  subscriptions: SubscriptionFormData[];
  setEditSubscription: React.Dispatch<React.SetStateAction<SubscriptionFormData | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: number) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  setEditSubscription,
  setShowModal,
  handleDelete,
}) => {
  return (
    <div>
      {subscriptions.map((sub) => (
        <Card key={sub.id}>
          <CardHeader>
            <h3>{sub.type} Plan</h3>
          </CardHeader>
          <CardBody>
            <p>Price: {sub.price}</p>
            <p>{sub.description}</p>
            <p>Calls per month: {sub.callsPerMonth}</p>
            <p>Response time: {sub.responseTime}</p>
            <p>Video Call: {sub.videoCall ? 'Yes' : 'No'}</p>
            <p>Audio Call Duration: {sub.audioCallDuration}</p>
            <p>Video Call Duration: {sub.videoCallDuration}</p>
          </CardBody>
          <CardFooter>
            <Button
              onPress={() => {
                setEditSubscription(sub);
                setShowModal(true);
              }}
            >
              Edit
            </Button>
            <Button color="warning" onPress={() => handleDelete(sub.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionList;
