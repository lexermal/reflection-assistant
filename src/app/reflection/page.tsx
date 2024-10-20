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
            <h1 className='text-3xl text-center mt-5'>Reflection Assistant</h1>
            {fileContent.length === 0 && <FileUpload setFileContent={setFileContent} />}
            {fileContent.length > 0 && <Chat entries={fileContent} />}
        </div>
    );
};

export function Chat({ entries }: { entries: Entry[] }) {
    return (
        <div className="flex flex-col w-3/4 mb-5 mx-auto stretch">
            <Assistentv2
                autoStartConversation={{
                    userMessage: "Hi"
                }}
                onComplete={(args) => console.log(args)}
                avatarImageUrl='https://www.gravatar.com/avatar/'
                voiceId={VoiceId.VISIONARY}
                endpoint='/api/chat'
                body={{ entries }}
            />
        </div>
    );
}

export default ReflectionPage;