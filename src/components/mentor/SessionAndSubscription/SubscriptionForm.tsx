// SubscriptionForm.tsx
import React, { useState, useEffect } from 'react';
import { SubscriptionFormData } from '../../../Types/SubscriptionTypes';
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from '@nextui-org/react';

interface SubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  editSubscription: SubscriptionFormData | null;
  handleAddOrUpdate: (newSubscription: SubscriptionFormData) => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  isOpen,
  onClose,
  editSubscription,
  handleAddOrUpdate,
}) => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    id: 0,
    type: 'Lite',
    price: '',
    description: '',
    callsPerMonth: 2,
    responseTime: '2 days',
    videoCall: false,
    audioCallDuration: '30 min',
    videoCallDuration: '30 min',
  });

  // Reset form when modal opens or edit subscription changes
  useEffect(() => {
    if (isOpen) {
      setFormData(editSubscription ? { ...editSubscription } : {
        id: 0,
        type: 'Lite',
        price: '',
        description: '',
        callsPerMonth: 2,
        responseTime: '2 days',
        videoCall: false,
        audioCallDuration: '30 min',
        videoCallDuration: '30 min',
      });
    }
  }, [isOpen, editSubscription]);

  const handleChange = (field: keyof SubscriptionFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    handleAddOrUpdate(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3>{editSubscription ? 'Edit' : 'Create'} Subscription</h3>
        </ModalHeader>
        <ModalBody>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Lite">Lite</option>
            <option value="Standard">Standard</option>
            <option value="Pro">Pro</option>
          </select>
          <Input
            label="Price"
            type="text"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <Input
            label="Calls Per Month"
            type="number"
            value={formData.callsPerMonth.toString()}
            onChange={(e) => handleChange('callsPerMonth', Number(e.target.value))}
          />
          <Input
            label="Response Time"
            type="text"
            value={formData.responseTime}
            onChange={(e) => handleChange('responseTime', e.target.value)}
          />
          <label className="block mb-2">Video Call</label>
          <select
            value={formData.videoCall ? 'Yes' : 'No'}
            onChange={(e) => handleChange('videoCall', e.target.value === 'Yes')}
            className="w-full p-2 border rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <Input
            label="Audio Call Duration"
            type="text"
            value={formData.audioCallDuration}
            onChange={(e) => handleChange('audioCallDuration', e.target.value)}
          />
          <Input
            label="Video Call Duration"
            type="text"
            value={formData.videoCallDuration}
            onChange={(e) => handleChange('videoCallDuration', e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={handleSubmit}>Save</Button>
          <Button onPress={onClose} color="warning">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionForm;