const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function updatePreferences(data: { username: string; darkMode: boolean }) {
  const response = await fetch(`${API_URL}/api/preferences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getHealth() {
  const response = await fetch(`${API_URL}/api/health`);
  return response.json();
}