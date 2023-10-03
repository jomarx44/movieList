import { useQuery, useMutation, useQueryClient } from "react-query";

import { supabase } from "../service/supabase";

export const useItems = () => {
  const queryClient = useQueryClient();

  const getItems = async () => {
    const { data, error } = await supabase.from("movieDB").select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const { data: items } = useQuery("items", getItems);

  const addItem = useMutation(
    "addItem",
    async (newItem: { title: any; author: any; genre: any }) =>
      supabase.from("movieDB").upsert([newItem]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
      },
      onError: (_error: any, variables: any, context: any) => {
        queryClient.setQueryData("items", context.snapshot);
      },
    },
  );
  const updateItem = useMutation(
    async (updatedData: any) => {
      const { data, error } = await supabase
        .from("movieDB")
        .update([updatedData])
        .eq("id", updatedData.id);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
      },
    },
  );

  const deleteItem = useMutation(
    "deleteItem",
    async (id: number) => supabase.from("movieDB").delete().eq("id", id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries("items");
        const snapshot = queryClient.getQueryData("items");
        queryClient.setQueryData("items", (prev: any) =>
          prev.filter((item: any) => item.id !== id),
        );
        return { snapshot };
      },
      onError: (_error: any, variables: any, context: any) => {
        queryClient.setQueryData("items", context.snapshot);
      },
      onSettled: () => {
        queryClient.invalidateQueries("items");
      },
    },
  );
  return {
    items,
    addItem,
    deleteItem,
    updateItem,
  };
};
