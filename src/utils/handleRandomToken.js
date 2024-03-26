const handleRandomToken = () => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  const multipliedTimestamp = currentTimestamp * 247;
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
  const finalToken = `${randomSixDigitNumber}${multipliedTimestamp}`;

  return finalToken;
};

export default handleRandomToken;
