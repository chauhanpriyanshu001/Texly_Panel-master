export const percentIncDec = {
  increaseDecCal: (todayLength, yesLength) => {
    const increament = Math.abs(yesLength - todayLength);
    if (yesLength === 0) {
      return "N/A";
    } else {
      const caclVal1 = (increament * 100) / yesLength;
      const caclVal = caclVal1.toFixed(1);

      return caclVal;
    }
  },
};
