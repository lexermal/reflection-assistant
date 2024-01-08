import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI();

  if (!req.body.messages) {
    res.status(400).send('No messages provided');
    return;
  }

  openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
  })
    .then(res => res.choices[0].message.content)
    .then((content) => res.json({ role: 'assistant', content }))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
}
