const copyClipboard = async (text: string) => await navigator.clipboard.writeText(text);

const formatDateСharts = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short', day: 'numeric' });
};

export { copyClipboard, formatDateСharts };
