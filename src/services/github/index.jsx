export function GithubService() {
  const BASE_URL = "https://api.github.com";

  async function getUserData(username) {
    const response = await fetch(`${BASE_URL}/users/${username}`);

    const data = await response.json();

    return { data };
  }

  return {
    getUserData,
  };
}
