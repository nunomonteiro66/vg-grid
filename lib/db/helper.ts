export const getOnlyDate = (date: Date) => {
  const nDate = date ?? new Date();
  nDate.setHours(0, 0, 0, 0);
  return nDate;
};
