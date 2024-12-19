import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSubscription,
  createSubscription,
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

// // Fetch a subscription by ID
// export const useSubscriptionById = (id?: string) =>
//   useQuery<Subscription>({
//     queryKey: ["subscription", id],
//     queryFn: () => fetchSubscriptionById(id!),
//     enabled: !!id,
//   });

// Edit a subscription
// export const useEditSubscription = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       id,
//       subscriptionData,
//     }: {
//       id: string;
//       subscriptionData: Partial<Subscription>;
//     }) => {
//       console.log("Mutation Fn - Subscription Data:", subscriptionData);
//       return await editSubscription(id, subscriptionData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
//     },
//     onError: (error) => {
//       console.error("Edit Subscription Mutation Error:", error);
//     },
//   });
// };
