import { useEffect, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid'; // 1. Importe o gerador de UUID

import * as Style from './styles';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Olá! Sou o Izinho, seu assistente gerencial, como posso lhe ajudar?', sender: 'bot' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const API_URL = 'https://izinho-chatbot-1037177127648.southamerica-east1.run.app/chat';
  const COMPANY_ID = 'ac6adf37-4bfb-4c16-8656-62db0547efca';
  const USER_ID = 'f951038b-5a02-41bc-8c2d-a51e03f6a72d';

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userText = inputValue;
    const newUserMessage = { text: userText, sender: 'user' };

    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          company_id: COMPANY_ID,
          user_id: USER_ID,
          session_id: sessionId,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error(`Erro na API: ${response.status} ${response.statusText}`);

      const data = await response.json();
      const botResponseText = data.answer || data.error || 'Desculpe, ocorreu um erro inesperado.';
      const newBotMessage = { text: botResponseText, sender: 'bot' };
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error: any) {
      console.error('Falha ao se comunicar com o chatbot:', error);
      const errorMessage = { text: `Erro: ${error.message}. Tente novamente.`, sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Style.ChatContainer>
      <Style.ChatWindow>
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return <Style.UserMessage key={uuidv4()}>{msg.text}</Style.UserMessage>;
          }

          return <Style.BotMessage key={uuidv4()}>{msg.text}</Style.BotMessage>;
        })}

        {isLoading && <Style.TypingIndicator>Pensando...</Style.TypingIndicator>}

        <div ref={chatEndRef} />
      </Style.ChatWindow>

      <Style.InputArea>
        <Style.ChatInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Faça uma pergunta..."
          disabled={isLoading}
        />
        <Style.SendButton onClick={handleSendMessage} disabled={isLoading}>
          ➤
        </Style.SendButton>
      </Style.InputArea>
    </Style.ChatContainer>
  );
};

export default Chatbot;
