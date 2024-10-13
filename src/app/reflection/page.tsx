"use client";

import React, { useState } from 'react';
import { Entry } from './components/analyseDate';
import { FileUpload } from './components/FileUpload';
import Assistentv2 from '@/components/Assistentv2';
import { VoiceId } from '@/components/EmbeddedAssistent/Voice/TTS';

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

export function Chat({ entries }: { entries: Entry[] }) {
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <Assistentv2
                firstMessage='My first message'
                instructions='Be funny'
                onComplete={(args) => console.log(args)}
                avatarImageUrl='https://www.gravatar.com/avatar/'
                voiceId={VoiceId.VISIONARY}
            />
        </div>
    );
}

export default ReflectionPage;