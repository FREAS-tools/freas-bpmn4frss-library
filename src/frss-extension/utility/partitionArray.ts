export type PartitionedArray<T> = {
  desired: T[],
  rest: T[],
};

export type PartitionFunction<T> = <T,>(element: T) => boolean;

/**
 * Partition array into a chunk of desired elements and the rest.
 * 
 * @param input input array of elements we want to partition 
 * @param partitionFunction partition filter function
 * @returns partitioned arrays in an object
 */
export const partitionArray = <T,>(
  input: T[],
  partitionFunction: PartitionFunction<T>
): PartitionedArray<T> => {
  const desired = input.filter(partitionFunction);
  const rest = input.filter((element) => !partitionFunction(element));

  return {
    desired,
    rest,
  };
}