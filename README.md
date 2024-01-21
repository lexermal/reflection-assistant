# StoryBuddy
Simple ChatGPT based story assistant.

## Features

- Voice input.
- Voice output.
- Text input.
- Text output.
- Just like ChatGPT, it remembers your conversation
- Button to reset the story plot.

## Getting Started

Create a file called `.env.local` at the root level of this project, and set the following environment variable: `OPENAI_API_KEY={your OpenAI API key}`

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Todo
* Replace audio recorder with https://github.com/DeltaCircuit/react-media-recorder
* Add a switch to toggle voice output.
* Replace UI components with tailwindcss.
* Check out functions and data https://github.com/vercel/ai/blob/main/examples/next-openai/app/api/chat-with-tools/route.ts


## Query
Aria we are going to create a selfreflection converifing the most important events about my past week. I'll give you my calendar entries and short summaries what I did. Based on this you ask me questions about the most important/significant events to which I will give you answers. In the end when I have nothing to add anymore you are going to group the events, give them headlines and summarize the highlights. Ready or do you need additional information?

Get the calendar entries with https://www.npmjs.com/package/webdav

Get diary entries with https://www.npmjs.com/package/imapflow