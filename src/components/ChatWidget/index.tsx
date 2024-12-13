/* eslint-disable @typescript-eslint/no-namespace */
import { useAuthContext } from '@contexts/Auth/UseAuthContext';

import { theme } from '@styles/theme';
import * as Style from './styles';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'langflow-chat': any;
    }
  }
}

export default function ChatWidget() {
  const { user } = useAuthContext();

  const chatTweaks = {
    'TextInput-ATTke': {
      input_value: user?.id,
    },
  };

  return (
    <Style.ChatWidgetContainer>
      <langflow-chat
        window_title="Izinho Chatbot"
        online_message="Izinho está online e pronto para ajudar!"
        flow_id="ad64085d-4388-4d80-87f2-99d24350ff74"
        host_url="https://guiroos-izinho-chatbot.hf.space"
        chat_position="top-left"
        height="500px"
        width="400px"
        placeholder="Digite sua mensagem..."
        placeholder_sending="Izinho está pensando..."
        tweaks={JSON.stringify(chatTweaks)}
        chat_trigger_style={JSON.stringify({ background: theme.color.primary })}
        send_icon_style={JSON.stringify({
          color: theme.color.primary,
          stroke: theme.color.primary,
        })}
        bot_message_style={JSON.stringify({ color: 'white', background: theme.color.primary })}
        user_message_style={JSON.stringify({ color: 'white', background: theme.color.gray4 })}
      />
    </Style.ChatWidgetContainer>
  );
}
