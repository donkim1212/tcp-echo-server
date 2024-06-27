const handler10 = (data) => {
  // data : Buffer
  const processedData = data.toString().toUpperCase();
  return Buffer.from(processedData);
};

export default handler10;
