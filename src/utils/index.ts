export const formatDate = (timestamp: {
  seconds: number;
  nanoseconds: number;
}) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString();
};
