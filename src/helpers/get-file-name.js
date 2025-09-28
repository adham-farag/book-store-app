const getName = () => {
  const days = new Date();
  const years = new Date().getFullYear();
  const month = new Date().getMonth();
  const hours = days.getHours();
  const mins = days.getMinutes();
  const secs = days.getSeconds();
  const mls = days.getMilliseconds();

  return `${years}${month}${days.getDate()}${hours}${mins}${secs}${mls}${parseInt(
    Math.random() * 100
  )}`;
};

export default getName;
