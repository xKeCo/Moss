import { timeOptions } from '../timeOptions';

export const filteredTimeOptions = (startTime: string) => {
  const startTimePeriod = startTime?.slice(-2);
  const startTimeHour = parseInt(startTime?.slice(0, 2));
  const startTimeMinute = parseInt(startTime?.slice(3, 5));

  return timeOptions().filter((time) =>
    filterTimeOptionsHelper(time, startTimePeriod, startTimeHour, startTimeMinute)
  );
};

function filterTimeOptionsHelper(
  time: string,
  startTimePeriod: string,
  startTimeHour: number,
  startTimeMinute: number
) {
  const timePeriod = time.slice(-2);
  const timeHour = parseInt(time.slice(0, 2));
  const timeMinute = parseInt(time.slice(3, 5));

  if (startTimePeriod === 'AM' && timePeriod === 'AM') {
    return timeHour > startTimeHour || (timeHour === startTimeHour && timeMinute > startTimeMinute);
  }

  if (startTimePeriod === 'PM' && timePeriod === 'PM') {
    return handlePMTimeOptions(timeHour, timeMinute, startTimeHour, startTimeMinute, timePeriod);
  }

  if (startTimePeriod === 'AM' && timePeriod === 'PM') {
    return true;
  }

  return false;
}

function handlePMTimeOptions(
  timeHour: number,
  timeMinute: number,
  startTimeHour: number,
  startTimeMinute: number,
  timePeriod: string
) {
  if (startTimeHour === 12) {
    if (timePeriod === 'PM') {
      const twelvesOption =
        timeHour > startTimeHour || (timeHour === startTimeHour && timeMinute > startTimeMinute);

      const restOptions = timeHour >= 1 && timeHour !== 12;

      return [twelvesOption, restOptions].some(Boolean);
    }
  } else {
    return (
      (timeHour !== 12 && timeHour > startTimeHour) ||
      (timeHour === startTimeHour && timeMinute > startTimeMinute)
    );
  }
}

export const validateEndTime = (startTime: string, endTime: string) => {
  const startTimePeriod = startTime?.slice(-2);
  const endTimePeriod = endTime?.slice(-2);

  const startTimeHour = parseInt(startTime?.slice(0, 2));
  const endTimeHour = parseInt(endTime?.slice(0, 2));

  const startTimeMinute = parseInt(startTime?.slice(3, 5));
  const endTimeMinute = parseInt(endTime?.slice(3, 5));

  if (startTimePeriod === 'AM' && endTimePeriod === 'PM') {
    return true;
  }

  if (startTimePeriod === 'PM' && endTimePeriod === 'AM') {
    return false;
  }

  if (startTimePeriod === 'AM' && endTimePeriod === 'AM') {
    return (
      endTimeHour < startTimeHour ||
      (endTimeHour === startTimeHour && endTimeMinute <= startTimeMinute)
    );
  }

  if (startTimePeriod === 'PM' && endTimePeriod === 'PM') {
    return (
      endTimeHour < startTimeHour ||
      (endTimeHour === startTimeHour && endTimeMinute <= startTimeMinute)
    );
  }

  return false;
};
