function HttpClient() {
  return {
    get: async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (err) {
        throw err;
      }
    },
  }
}

export const client = HttpClient();
export default HttpClient;
