/* eslint-disable @typescript-eslint/no-namespace */
import * as Style from './styles';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'langflow-chat': any;
    }
  }
}

export default function ChatWidget() {
  return (
    <Style.ChatWidgetContainer>
      <langflow-chat
        window_title="Izinho Chatbot"
        online_message="Izinho está online e pronto para ajudar!"
        flow_id="5e60c5d6-f0f9-4924-96be-51e098931fd5"
        host_url="https://guiroos-izinho-hmg.hf.space"
        chat_position="top-left"
        height="500px"
        width="400px"
        placeholder="Digite sua mensagem..."
        placeholder_sending="Izinho está pensando..."
        tweaks={{
          'TextInput-3SaR0': {
            input_value: 'guilherme',
          },
        }}
      />
    </Style.ChatWidgetContainer>
  );
}
