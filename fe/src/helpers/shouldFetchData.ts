interface shouldFetchDataProps {
  date: Date | number | null;
  timeToAdd: {
    minutes?: number;
    hours?: number;
  };
}
export const shouldFetchData = ({
  date,
  timeToAdd,
}: shouldFetchDataProps): boolean => {
  if (!date) {
    return true;
  }

  if (!Object.keys(timeToAdd).length) {
    return true;
  }

  const dateCheck = date instanceof Date ? date : new Date(date);

  if (timeToAdd && timeToAdd.minutes) {
    dateCheck.setMinutes(dateCheck.getMinutes() + timeToAdd.minutes);
  }

  if (timeToAdd && timeToAdd.hours) {
    dateCheck.setHours(dateCheck.getHours() + timeToAdd.hours);
  }

  return dateCheck.getTime() < Date.now();
};
