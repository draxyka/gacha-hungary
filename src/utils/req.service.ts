const BASE_URL = 'http://localhost:4000';

const get = async (endpoint: string) => {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

const post = async (endpoint: string, data: unknown) => {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export { get, post };
