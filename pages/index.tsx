import Head from 'next/head';
import { useState } from 'react';
import { Alert, Box, Center, Container, Text } from '@mantine/core';
import { IconAlertCircle, IconCat } from '@tabler/icons';
import InputBar, { ChatEntryInterface, ROLE } from '@/components/InputBar';
import { gptRequest } from '@/lib/TextAPI';
import ChatEntry from '@/components/ChatEntry';
import { playAudioFromText } from '@/lib/VoiceAPI';

let role =
  'You are gathering information for a story for kids in middle school. The kids will give you details, and you need to ask them only one question every time to continue the story. Please keep your response in a format where the summary and question are separated.';
let personality =
  'You are quirky with a sense of humor. You crack jokes frequently in your responses.';
let brevity = 'Your responses are always 1 to 2 sentences.';

// gibbs cycle bot
role="You are an expert about the  Gibb's Reflective Cycle. You want to go through each of the steps of the cycle with the user. You want to ask the user questions that will help them reflect on their experience. You want to help the user understand the importance of reflection and how it can help them in the future."
personality="You are a friendly and helpful person."
brevity = 'Your responses are always 1 to 2 sentences. You end them with a question to how the go through the cycle. When the cycle is complete, you give the following json response: {"summary": "summary of the reflection", "question": "question to ask the user"}';

// FULL BOT CONTEXT
const botContext = `${role} ${personality} ${brevity}`;

const initialMessage =
  "Hey there! Let's the reflection together. Tell me what was going on the last 3 weeks and we select one situation to reflect on.";

export default function Home() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [messagesArray, setMessagesArray] = useState([
    { role: 'system', content: botContext },
    { role: 'assistant', content: initialMessage },
  ] as ChatEntryInterface[]);

  const appendMessage = (content: string, role: ROLE) => {
    setMessagesArray((prevState) => [...prevState, { role, content }]);
  };

  const callGPT = (text: string) => {
    const newMessage = { role: 'user', content: text };
    setLoading(true);
    appendMessage(text, 'user');

    gptRequest([...messagesArray, newMessage])
      .then((gptResponse) => {
        appendMessage(gptResponse, 'assistant');
        setLoading(false);
        if (true) {
          //play audio?
          playAudioFromText(gptResponse);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        title="Bummer!"
        color="red"
        variant="outline"
      >
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Head>
        <title>ReflectBuddy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="sm" mt={25}>
        <Center>
          <IconCat size={30} color="teal" />
          <Text
            size={30}
            weight={300}
            pl={5}
            variant="gradient"
            gradient={{ from: 'blue', to: 'yellow' }}
          >
            ReflectBuddy
          </Text>
        </Center>

        <Box fz="l" maw={520} mx="auto">
          {messagesArray
            .filter((message) => message.role !== 'system')
            .map((message, index) => (
              <ChatEntry
                key={index}
                message={message.content}
                user={message.role === 'user'}
              />
            ))}
        </Box>
      </Container>
      <InputBar
        loading={loading}
        onSubmit={(newMessage: string) => callGPT(newMessage)}
        setErrorMessage={(message?: string) => setError(message)}
        onReset={() => setMessagesArray(messagesArray.slice(0, 2))}
      />
    </>
  );
}
