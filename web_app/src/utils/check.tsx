export const checkFloat = (value: string): boolean => {
  const floatValue = parseFloat(value);
  return !isNaN(floatValue);
};
