export const getDateWithoutTime = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};
