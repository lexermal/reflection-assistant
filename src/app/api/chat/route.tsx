import { convertToCoreMessages, streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { env } from '@/utils/env';
import { createLogger } from '@/utils/logger';
import ToolBuilder from '@/backend/ToolBuilder';
import { Entry } from '@/app/reflection/components/analyseDate';

const logger = createLogger("POST /api/chat");

export async function POST(req: Request) {
  let { messages, entries } = await req.json();
  messages = [getInstructionMessage(entries), ...messages];

  const anthropic = createAnthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages: convertToCoreMessages(messages),
    tools: toolBuilder.getTools(),

  }).catch((error) => {
    logger.error("Error generating story response:", { error });
    throw new Error("Failed to generate story response");
  });

  return result.toDataStreamResponse();
}

function getInstructionMessage(entries: Entry[]) {
  const instructions = `
Act like a reflection assistant.
Here is a list of the user's reflections for the last week:
'''
${entries.map((entry) => {
    return entry.reflection.map((reflection) => `Date: ${entry.date}, Mood: ${entry.mood}, Reflection: ${reflection}`);
  }).flat().join("\n")}
  '''

First group the topic that are closely related and then let the user reflect on the majour topics. Go through each.
`;

  console.log(instructions);

  return { role: "system", content: instructions };
}


const toolBuilder = new ToolBuilder();

// toolBuilder.addClientTool('getLocation', 'Get the user location. Always ask for confirmation before using this tool.')
//   .addParameter('city', 'string', 'The city to get the weather information for.')
//   .build();

// toolBuilder.addUserInteractionTool('askForConfirmation', 'Ask the user for confirmation.')
//   .addParameter('message', 'string', 'The message to ask for confirmation.')
//   .build();

// toolBuilder.addServerTool('getWeatherInformation', 'Show the weather in a given city to the user.')
//   .addParameter('city', 'string', 'The city to get the weather information for.')
//   .build<{ city: string }, string>(async ({ city }) => {
//     console.log('server action getWeatherInformation', city);
//     const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
//     return weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
//   });

// toolBuilder.addUserInteractionTool("askForChapterDecision", "Ask the user how the story should continue. The response is a string with the users choice and correctness of their answer.")
//   .addParameter("question", "string", "Ask with an open ended question how the story should continue")
//   .addParameter("possibility1", "string", "The first possibility how the story could continue")
//   .addParameter("possibility2", "string", "The second possibility how the story could continue")
//   .addParameter("possibility3", "string", "The third possibility how the story could continue")
//   .build();

// toolBuilder.addClientTool("storyEnded", "End the story. The user has reached the end of the story.")
//   .build();

toolBuilder.getTools();

