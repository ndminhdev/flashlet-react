export const formatDate = (utcString) => {
  const date = new Date(utcString);
  return (
    date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate()
  );
};
