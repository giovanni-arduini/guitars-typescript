type AvailabilityInfo = {
  style: string;
  message: string;
};

export function useAvailability(available: boolean): AvailabilityInfo {
  return {
    style: available ? "text-green-600" : "text-red-600",
    message: available ? "Available" : "Currently out of stock",
  };
}
