export const getFeesForProtocol = (protocolsArray, protocolId) => {
  let fees = 0.0;
  protocolsArray
    .filter((item) => item.id === protocolId)[0]
    .fees.forEach((dailyFee) => {
      fees += dailyFee.fee;
    });
  return fees;
};
