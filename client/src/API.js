const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    const jsonResp = await response.json();
    return jsonResp;
}

export async function createLogEntry(entry) {
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}
