import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const openai = new OpenAI();

    if (!req.query.text) {
        res.status(400).send('No text provided');
        return;
    }

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: req.query.text as string,
    });

    // Set the appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline');

    // Send the buffer as a stream
    res.send(Buffer.from(await mp3.arrayBuffer()));
}