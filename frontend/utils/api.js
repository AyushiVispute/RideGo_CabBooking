export async function apiPost(url, data) {
  console.log("API Request:", url, data);

  // Simulate real API wait time
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Demo response",
  };
}
