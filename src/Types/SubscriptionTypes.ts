export interface SubscriptionFormData {
    id: number;
    type: 'Lite' | 'Standard' | 'Pro';
    price: string;
    description: string;
    callsPerMonth: number;
    responseTime: string;
    videoCall: boolean;
    audioCallDuration: string;
    videoCallDuration: string;
}