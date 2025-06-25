
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '../types';
import { BRAND_CONFIG } from '../constants';
import Button from './common/Button';
import Input from './common/Input';
import { startChatSession, sendChatMessageStream } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    // Initialize chat session when component mounts or API key becomes available
    // This assumes API_KEY might not be ready on initial load in some setups.
    // In this specific setup, API_KEY is expected at load time.
    // if (process.env.API_KEY) { // Ensure API key is present. This check is implicitly handled by startChatSession
        const chatInstance = startChatSession();
        setChat(chatInstance);
        
        const initialMessageText = process.env.API_KEY 
            ? `Hello! I'm Caramel, your AI HR assistant from ${BRAND_CONFIG.brand.organizationShortName}. How can I help you with your career path today?`
            : `Chatbot is in mock mode as API key is not configured. Responses will be simulated.`;
        
        const initialSender = process.env.API_KEY ? 'bot' : 'system';

        setMessages([
        { 
            id: 'initial-greeting', 
            sender: initialSender, 
            text: initialMessageText, 
            timestamp: new Date(),
            avatar: initialSender === 'bot' ? BRAND_CONFIG.brand.chatbot.avatar : undefined
        }
        ]);
    // } 
    // else { // This block is simplified into the above logic.
    //     setMessages([
    //     { 
    //         id: 'initial-greeting-no-api', 
    //         sender: 'system', 
    //         text: `Chatbot functionality is limited as the API key is not configured.`, 
    //         timestamp: new Date(),
    //     }
    //     ]);
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '' || isLoading || !chat) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const botMessageId = `bot-${Date.now()}`;
    // Add a placeholder for bot's response immediately for better UX
    setMessages(prev => [
      ...prev,
      {
        id: botMessageId,
        sender: 'bot',
        text: '...', // Placeholder for streaming
        timestamp: new Date(),
        avatar: BRAND_CONFIG.brand.chatbot.avatar,
      },
    ]);
    
    let fullBotResponse = "";
    try {
      for await (const chunk of sendChatMessageStream(chat, userMessage.text)) {
        fullBotResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: fullBotResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error("Chatbot stream error:", error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: "Sorry, I couldn't process that. Please try again." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, chat]);

  // The chat state should always be initialized by useEffect, either to a real or mock chat.
  // So, an explicit check for !process.env.API_KEY && !chat is less likely to be the primary gate.
  // The functionality of the chat (real or mock) is determined by startChatSession.

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-secondary-dark p-3 rounded-full shadow-xl hover:bg-yellow-500 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <img src={BRAND_CONFIG.brand.chatbot.face} alt="Chatbot Face" className="w-8 h-8 rounded-full object-cover" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full max-w-sm h-[70vh] max-h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 z-40">
          <header className="bg-secondary text-neutral-light p-4 flex items-center space-x-3">
            <img src={BRAND_CONFIG.brand.chatbot.avatar} alt="Caramel Avatar" className="w-10 h-10 rounded-full border-2 border-primary" />
            <div>
              <h3 className="font-semibold text-lg">Caramel</h3>
              <p className="text-xs text-primary">{BRAND_CONFIG.brand.organizationShortName} Assistant</p>
            </div>
          </header>

          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end max-w-[80%] space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.sender === 'bot' && msg.avatar && (
                    <img src={msg.avatar} alt="Bot Avatar" className="w-8 h-8 rounded-full self-start" />
                  )}
                   {msg.sender === 'user' && ( // Placeholder for user avatar if needed
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-secondary-dark font-semibold text-sm self-start">
                      {/* You can replace this with user initials or an icon */}
                      U
                    </div>
                  )}
                  <div className={`px-4 py-2 rounded-xl ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-secondary-dark rounded-br-none' 
                        : (msg.sender === 'system' 
                            ? 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 w-full text-sm text-center italic' 
                            : 'bg-gray-200 dark:bg-gray-700 text-secondary-dark dark:text-neutral-light rounded-bl-none')
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-yellow-700' : 'text-gray-500 dark:text-gray-400'} ${msg.sender === 'system' ? 'hidden' : ''}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatMessagesEndRef} />
          </div>

          <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-neutral-light dark:bg-gray-800">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-grow !mb-0" // Override mb-4 from Input component
                disabled={isLoading || !chat}
              />
              <Button onClick={handleSendMessage} isLoading={isLoading} disabled={isLoading || !chat || inputValue.trim() === ''} aria-label="Send Message">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </Button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Chatbot;
