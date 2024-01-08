import FormData from 'form-data';
import { createReadStream } from 'fs';
import { withFileUpload } from 'next-multiparty';

export const config = { api: { bodyParser: false } };

export default withFileUpload(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded');
    return;
  }

  const formData = new FormData();
  formData.append('file', createReadStream(file.filepath), 'audio.wav');
  formData.append('model', 'whisper-1');

  await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: formData as unknown as BodyInit,
  })
    .then((res) => res.json())
    .then((data) => res.status(200).json({ text: data.text }))
    .catch((err) => {
      console.log('error in whisperRequestSTT fn', err);
      res.status(500).json(err.message)
    });
});
