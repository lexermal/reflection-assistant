import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);

    if (!body.text) {
        res.status(400).send('No text provided');
        return;
    }

    const openai = new OpenAI();

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: body.text,
    });

    // Set the appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline');

    // Send the buffer as a stream
    res.send(Buffer.from(await mp3.arrayBuffer()));
}