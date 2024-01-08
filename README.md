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