export interface Subscription {
  _id?: number;
  mentorId: string
  type: "lite" | "standard" | "pro";
  price: number;
  duration: number;
  features: {
    audioCalls: {
      callsPerMonth: number;
      callDuration: number;
    };
    videoCalls: {
      callsPerMonth: number;
      callDuration: number;
    };
    chatAccess: boolean;
    chatResponseTime: string;
    blogAccess: boolean;
  };
    createdAt: Date;
    updatedAt:Date;
}


export interface SubscriptionFormProps {
    initialData?: Partial<Subscription>;
    onSubmit?: (data: any) => void;
}
  