export const gptRequest = async (messagesArray: any[]) => {
    return fetch('/api/chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesArray })
    })
        .then((res) => res.json())
        .then((data) => data.content)
        .catch((err) => {
            console.log('error in gptRequest fn', err);
        });
};