export const isLocationOpen = (
  open_at: string,
  closing_at: string,
): boolean => {
  const now = new Date();

  const openDate = new Date(open_at);
  const closeDate = new Date(closing_at);

  return now >= openDate && now <= closeDate;
};
