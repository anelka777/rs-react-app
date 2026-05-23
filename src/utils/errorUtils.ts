export const getErrorMessage = (error: string): string => {
  if (error.includes('404')) {
    return 'Character not found. Try another name!';
  }
  if (error.includes('400')) {
    return 'Invalid search. Please use English letters only!';
  }
  if (/5\d\d/.test(error)) {
    return 'Server error. Please try again later!';
  }
  return 'Unexpected error. Please try again!';
};
