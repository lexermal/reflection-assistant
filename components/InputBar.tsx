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
      <div className='container'>
        <div className='content-center' style={{ height: 200 }}>
          Loading....
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='content-center' style={{ height: 200 }}>
        <form onSubmit={handleInputSubmit} style={{ display: 'flex' }}>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
          >
            Send
          </button>
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
          <button
            onClick={() => props.onReset()}
            title="Start Over"
          >
            Refresh(Restart bot)
          </button>
        </div>
      </div>
    </div>
  );
}
