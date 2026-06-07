const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (): void => {
      resolve(reader.result as string);
    };

    reader.onerror = (): void => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

export default imageToBase64;
