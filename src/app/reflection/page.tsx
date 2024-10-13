"use client";

import { useChat } from 'ai/react';
import React, { useState } from 'react';
import { Entry } from './components/analyseDate';
import { FileUpload } from './components/FileUpload';

const ReflectionPage: React.FC = () => {
    const [fileContent, setFileContent] = useState<Entry[]>([]);

    console.log(fileContent);

    return (
        <div>
            <h1 className='text-3xl'>Reflection Assistent</h1>
            <FileUpload setFileContent={setFileContent} />
            <div>
                <ul>
                    {fileContent.map((line, index) => (
                        <li key={index}>{
                            `Date: ${line.date}, Mood: ${line.mood}, Reflection: ${line.reflection}`
                        }</li>
                    ))}
                </ul>
            </div>
            <Chat entries={fileContent} />
        </div>
    );
};

export function Chat({entries}: {entries: Entry[]}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    
    body: { entries },
  });
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default ReflectionPage;