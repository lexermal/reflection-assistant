import fs from "fs";
import path from "path";
import OpenAI from "openai";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const openai = new OpenAI();

    const text = req.query.text;
    console.log(text);

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text as string,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Set the appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline');

    // Send the buffer as a stream
    res.send(buffer);
}