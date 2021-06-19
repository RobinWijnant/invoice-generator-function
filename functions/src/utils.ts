export const getDateWithoutTime = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};
