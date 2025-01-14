import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, Select, SelectItem, Checkbox } from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubscriptionFormProps } from "@/Types/SubscriptionTypes";

const validationSchema = yup.object({
  type: yup.string().oneOf(["lite", "standard", "pro"]).required("Subscription Type is required"),
  price: yup.number().positive("Price must be greater than 0").required("Price is required"),
  duration: yup.number().min(1, "Duration must be at least 1 month").required("Duration is required"),
  features: yup.object({
    audioCalls: yup.object({
      callsPerMonth: yup.number().min(1).required("Audio Calls Per Month is required"),
      callDuration: yup.number().min(1).required("Audio Call Duration is required"),
    }),
    videoCalls: yup.object({
      callsPerMonth: yup.number().min(1).required("Video Calls Per Month is required"),
      callDuration: yup.number().min(1).required("Video Call Duration is required"),
    }),
    chatAccess: yup.boolean(),
    blogAccess: yup.boolean(),
    chatResponseTime: yup.string(),
  })
});

interface SubscriptionFormComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<SubscriptionFormProps>) => void;
  defaultValues?: Partial<SubscriptionFormProps>;
}

const SubscriptionForm: React.FC<SubscriptionFormComponentProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      type: '',
      price: 0,
      duration: 1,
      features: {
        audioCalls: { callsPerMonth: 0, callDuration: 0 },
        videoCalls: { callsPerMonth: 0, callDuration: 0 },
        chatAccess: false,
        blogAccess: false,
        chatResponseTime: '24 hours'
      }
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler: SubmitHandler<SubscriptionFormProps> = (data) => {
    const cleanedData = JSON.parse(JSON.stringify(data));
    onSubmit(cleanedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          <h3>{defaultValues ? "Edit Subscription" : "Create Subscription"}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Subscription Type"
                  errorMessage={errors.type?.message}
                  isInvalid={!!errors.type}
                >
                  <SelectItem key="lite" value="lite">Lite</SelectItem>
                  <SelectItem key="standard" value="standard">Standard</SelectItem>
                  <SelectItem key="pro" value="pro">Pro</SelectItem>
                </Select>
              )}
            />
            
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Price"
                  errorMessage={errors.price?.message}
                  isInvalid={!!errors.price}
                />
              )}
            />

            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Duration (Months)"
                  errorMessage={errors.duration?.message}
                  isInvalid={!!errors.duration}
                />
              )}
            />

            <Controller
              name="features.chatResponseTime"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Chat Response Time"
                >
                  <SelectItem key="24 hours" value="24 hours">24 hours</SelectItem>
                  <SelectItem key="6 hours" value="6 hours">6 hours</SelectItem>
                  <SelectItem key="2 hours" value="2 hours">2 hours</SelectItem>
                </Select>
              )}
            />

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Audio Calls</h4>
                <Controller
                  name="features.audioCalls.callsPerMonth"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Calls Per Month"
                      errorMessage={errors.features?.audioCalls?.callsPerMonth?.message}
                      isInvalid={!!errors.features?.audioCalls?.callsPerMonth}
                    />
                  )}
                />
                <Controller
                  name="features.audioCalls.callDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Call Duration (Minutes)"
                      errorMessage={errors.features?.audioCalls?.callDuration?.message}
                      isInvalid={!!errors.features?.audioCalls?.callDuration}
                    />
                  )}
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Video Calls</h4>
                <Controller
                  name="features.videoCalls.callsPerMonth"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Calls Per Month"
                      errorMessage={errors.features?.videoCalls?.callsPerMonth?.message}
                      isInvalid={!!errors.features?.videoCalls?.callsPerMonth}
                    />
                  )}
                />
                <Controller
                  name="features.videoCalls.callDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Call Duration (Minutes)"
                      errorMessage={errors.features?.videoCalls?.callDuration?.message}
                      isInvalid={!!errors.features?.videoCalls?.callDuration}
                    />
                  )}
                />
              </div>
            </div>

            <div className="col-span-2 flex space-x-4">
              <Controller
                name="features.chatAccess"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    isSelected={value}
                    onValueChange={onChange}
                  >
                    Chat Access
                  </Checkbox>
                )}
              />

              <Controller
                name="features.blogAccess"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    isSelected={value}
                    onValueChange={onChange}
                  >
                    Blog Access
                  </Checkbox>
                )}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit(onSubmitHandler)}>
            {defaultValues ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionForm;