'use client';

import ChatEntry from '@/components/ChatEntry';
import InputBar from '@/components/InputBar';
import { getGibbsAssistent, getStoryBuildingAssistent } from '@/lib/AssistantBuilder';
import { playAudioFromText } from '@/lib/VoiceAPI';
import { useChat } from 'ai/react';
import { useEffect } from 'react';

const assistant = getGibbsAssistent();

export default function MyComponent() {
  const { messages, append, isLoading, setMessages } = useChat();
  console.log(messages);
  useEffect(() => {
    setMessages([
      {
        id: 'initial',
        role: 'system',
        content: assistant.botContext,
      },
      {
        id: 'initial_2',
        role: 'assistant',
        content: assistant.initialMessage,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      console.log('last message is: ', messages[messages.length - 1].content);
      playAudioFromText(messages[messages.length - 1].content);
    }
  }, [isLoading]);

  return (
    <div>
      <ul>
        {messages
          .filter((m) => m.role !== 'system')
          .map((m, index) => (
            <ChatEntry
              key={index}
              message={m.content}
              user={m.role === 'user'}
            />
          ))}
      </ul>

      <InputBar
        loading={isLoading}
        onSubmit={(text) => {
          append({ role: 'user', content: text });
        }}
        onReset={() => null}
        setErrorMessage={() => null}
      />
    </div>
  );
}
