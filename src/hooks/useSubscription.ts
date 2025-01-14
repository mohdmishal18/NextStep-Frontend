import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSubscription,
  createSubscription,
  editSubscription,
  deleteSubscription
} from "@/api/subscription";
import {
  Subscription,
  SubscriptionFormProps,
} from "@/Types/SubscriptionTypes";

// Fetch all subscriptions
export const useSubscriptions = () =>
  useQuery<Subscription[]>({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscription,
  });

// Create a new subscription
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation<Subscription, Error, SubscriptionFormProps>({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

// Edit an existing subscription
// Edit an existing subscription
export const useEditSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SubscriptionFormProps> }) => {
      return editSubscription(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
    onError: (error) => {
      console.error("Edit Subscription Mutation Error:", error);
    },
  });
};

// Delete a subscription
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting subscription with ID:", id);
      return await deleteSubscription(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
    onError: (error) => {
      console.error("Delete Subscription Mutation Error:", error);
    },
  });
};