export const tryCatch = async <T>(promise: () => Promise<T>) => {
  try {
    const data = await promise();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
