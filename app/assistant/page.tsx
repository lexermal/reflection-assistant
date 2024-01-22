'use client';

import ChatEntry from '@/components/ChatEntry';
import InputBar from '@/components/InputBar';
import {
  getGibbsAssistent,
  getStoryBuildingAssistent,
} from '@/lib/AssistantBuilder';
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
    <div className="container mx-auto p-5">
      <h1 className="text-6xl font-bold m-10 text-center text-gray-100 shadow-inner">
        Reflection Assistant
      </h1>
      <div className=" bg-white bg-opacity-50 rounded-lg mx-auto p-4">
        <ul>
          {messages
            .filter((m) => m.role !== 'system')
            .map((m, index) => (
              <li key={index} className="bg-yellow-50  mb-3 text-lg rounded-lg">
                <ChatEntry message={m.content} user={m.role === 'user'} />
              </li>
            ))}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-28 bg-gray-700 mx-auto">
        <InputBar
          loading={false}
          onSubmit={(text) => {
            append({ role: 'user', content: text });
          }}
          onReset={() => null}
          setErrorMessage={() => null}
        />
      </div>
    </div>
  );
}
