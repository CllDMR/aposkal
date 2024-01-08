export const tryCatch = async (promise) => {
  try {
    let data = await promise();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
