import Head from 'next/head';
import { useState } from 'react';
import { Alert, Box, Center, Container, Text } from '@mantine/core';
import { IconAlertCircle, IconCat } from '@tabler/icons';
import InputBar, { ChatEntryInterface, ROLE } from '@/components/InputBar';
import { gptRequest } from '@/lib/TextAPI';
import ChatEntry from '@/components/ChatEntry';
import { playAudioFromText } from '@/lib/VoiceAPI';

const role =
  'You are gathering information for a story for kids in middle school. The kids will give you details, and you need to ask them only one question every time to continue the story. Please keep your response in a format where the summary and question are separated.';
const personality =
  'You are quirky with a sense of humor. You crack jokes frequently in your responses.';
const brevity = 'Your responses are always 1 to 2 sentences.';

// FULL BOT CONTEXT
const botContext = `${role} ${personality} ${brevity}`;

const initialMessage =
  "Hey there! Let's start our amazing story together. Why don't you say something into the microphone or click on one of the ideas below to kick things off?";

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
        <title>StoryBuddy</title>
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
            StoryBuddy
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
