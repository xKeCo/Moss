export const timeOptions = () => {
  const timeOptions = [];
  for (let i = 5; i < 20; i++) {
    let hour = i;
    if (hour > 12) {
      hour -= 12;
    }
    const strHour = hour < 10 ? `0${hour}` : `${hour}`;
    for (let j = 0; j < 4; j++) {
      const strMinute = j === 0 ? '00' : `${j * 15}`;
      const period = i < 12 ? 'AM' : 'PM';
      timeOptions.push(`${strHour}:${strMinute}${period}`);
    }
  }

  return timeOptions;
};
