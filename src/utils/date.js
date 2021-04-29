export const formatDate = (utcString) => {
  const date = new Date(utcString);
  const m = date.toLocaleString('default', { month: 'short' });
  const d = date.getDate();
  const y = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return `${m} ${d}${y !== currentYear ? `, ${y}` : ''}`;
};
