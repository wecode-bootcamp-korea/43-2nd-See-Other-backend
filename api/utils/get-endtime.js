const getEndTime = (startTime, runningTime) => {
  const splitedStartTime = startTime.split(":");
  let result = "";
  const hour = runningTime / 60;
  const minute = runningTime % 60;
  const resultHour = hour + parseInt(splitedStartTime[0]);
  const resultMinute = minute + parseInt(splitedStartTime[1]);
  result = String(resultHour) + " : " + String(resultMinute);

  if (minute + parseInt(splitedStartTime[1]) > 60) {
    const resultHour = hour + parseInt(splitedStartTime[0]) + 1;
    let resultMinute = minute + parseInt(splitedStartTime[1]) - 60;
    if (resultMinute < 10) {
      resultMinute = "0" + String(resultMinute);
    }
    result = String(resultHour) + ":" + String(resultMinute);
  } else {
    const resultHour = hour + parseInt(splitedStartTime[0]);
    let resultMinute = minute + parseInt(splitedStartTime[1]);
    if (resultMinute < 10) {
      resultMinute = "0" + String(resultMinute);
    }
    result = String(resultHour) + ":" + String(resultMinute);
  }
  return result;
};

module.exports = {
  getEndTime,
};
