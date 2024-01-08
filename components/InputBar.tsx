import { Container, Center, Input, Button, Loader } from '@mantine/core';
import { IconRefresh } from '@tabler/icons';
import { FormEvent, useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { whisperRequestSTT } from '../lib/VoiceAPI';

export type ROLE = 'user' | 'system' | 'assistant';
export interface ChatEntryInterface {
  role: ROLE;
  content: string;
}

export default function InputBar(props: {
  loading: boolean;
  onReset: () => void;
  onSubmit: (newMessage: string) => void;
  setErrorMessage: (message?: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      props.onSubmit(inputValue);
      setInputValue('');
    }
  };

  if (props.loading) {
    return (
      <Container size="sm">
        <Center style={{ height: 200 }}>
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  return (
    <Container size="sm">
      <Center style={{ height: 200 }}>
        <form onSubmit={handleInputSubmit} style={{ display: 'flex' }}>
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Type your message..."
          />
          <Button
            variant="gradient"
            radius={100}
            m={3}
            gradient={{ from: 'indigo', to: 'cyan' }}
            type="submit"
          >
            Send
          </Button>
        </form>
        <div style={{ alignItems: 'start', display: 'contents' }}>
          <AudioRecorder
            onRecordingComplete={async (audio: Blob) => {
              props.setErrorMessage();
              whisperRequestSTT(audio)
                .then((data: string) => {
                  props.onSubmit(data);
                })
                .catch((err) => {
                  props.setErrorMessage(err.message);
                  console.log('Error:', err);
                });
            }}
          />
          <Button
            variant="gradient"
            radius={100}
            w={40}
            m={20}
            p={0}
            gradient={{ from: 'indigo', to: 'cyan' }}
            onClick={() => props.onReset()}
            title="Start Over"
          >
            <IconRefresh size={25} />
          </Button>
        </div>
      </Center>
    </Container>
  );
}
