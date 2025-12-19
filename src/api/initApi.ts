export async function fetchInitialData() {
  return new Promise((resolve, reject) => {
    const flag = false; // flag to check API success or failure
    if (flag) {
      resolve("Initial data fetched successfully");
      return;
    }else{
      reject(new Error("Initial API failed"));
    }
  });
}
