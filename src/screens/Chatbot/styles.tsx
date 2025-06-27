import styled from 'styled-components';

// O container principal do chat, agora ocupando mais espaço
export const ChatContainer = styled.div`
  width: 80%;
  height: 90%;

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);

  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  overflow: hidden;
`;

// A janela onde as mensagens aparecem
export const ChatWindow = styled.div`
  flex-grow: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Customizando a barra de rolagem */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bcc0c4;
    border-radius: 4px;
  }
`;

// Estilo base para todas as mensagens
const MessageBase = styled.div`
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 75%;
  line-height: 1.5;
  word-wrap: break-word;
`;

// Mensagem do usuário, alinhada à direita
export const UserMessage = styled(MessageBase)`
  background-color: #0084ff;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
`;

// Mensagem do bot, alinhada à esquerda
export const BotMessage = styled(MessageBase)`
  background-color: #e4e6eb;
  color: #050505;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
`;

// Indicador "Digitando..."
export const TypingIndicator = styled(BotMessage)`
  color: #65676b;
  font-style: italic;
`;

// Área de input e botão
export const InputArea = styled.div`
  padding: 16px;
  border-top: 1px solid #dddfe2;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
`;

// O campo de texto para digitar
export const ChatInput = styled.input`
  flex-grow: 1;
  border: none;
  background-color: #f0f2f5;
  border-radius: 20px;
  padding: 12px 18px;
  font-size: 16px;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 2px #0084ff;
  }
`;

// O botão de enviar
export const SendButton = styled.button`
  flex-shrink: 0;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0073e0;
  }
  &:disabled {
    background-color: #a0c2e0;
    cursor: not-allowed;
  }
`;
