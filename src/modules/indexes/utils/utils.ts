const formatToExponential = (value: number): string => {
  if (value === 0) return '0';

  const str = value.toString();
  if (str.includes('e')) return str;

  if (Math.abs(value) >= 1e6 || (value !== 0 && Math.abs(value) < 1e-3)) {
    const [lead, power] = value.toExponential().split('e');
    return `${lead}e${power}`;
  }

  return str.includes('.') ? str.replace(/\.?0+$/, '') : str;
};

export { formatToExponential };
