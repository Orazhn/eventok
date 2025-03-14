export const formatDateTime = (date: string, time: string) => {
  return new Date(`${date}T${time}:00Z`).toISOString();
};
