export const playAudioFromText = async (text: string) => {
    const response = await fetch(`/api/stt?text=${encodeURIComponent(text)}`);
    const arrayBuffer = await response.arrayBuffer();

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
};

export const whisperRequestSTT = async (audioFile: Blob) => {
    const formData = new FormData();
    formData.append('file', audioFile, 'audio.wav');

    return fetch('/api/whisper', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => data.text)
};