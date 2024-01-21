export const gptRequest = async (messages: any[]) => {
    return fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
    })
        .then((res) => res.json())
        .then((data) => data.content)
        .catch((err) => {
            console.log('error in gptRequest fn', err);
        });
};