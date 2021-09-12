import React, { useEffect, useMemo, useState } from "react";

import Styled from "styled-components";

import "antd/dist/antd.css";
import ChatNavigationRow from "./components/ChatNavigationRow";
import Chat from "./components/Chat";

const StyledHeader = Styled.header`
  text-align: center;
  background-color: #611f69;
  color: white;
  font-size: 14px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
`;

const Content = Styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 95%;
`;

const ChatNavigation = Styled.div`
  width: 25%;
  background-color: #F5F5F5;
`;

export type Message = {
  id: string;
  message: string;
  sentBy: string;
  recievedBy: string;
  date: Date;
};

function App() {
  const InitialMessageState = [
    {
      id: "xnyssdsd31",
      message: "Hi - Can i help with your Assignment",
      sentBy: "Alex",
      recievedBy: localStorage.getItem("currentUser") || "Shahzaib Shahid",
      date: new Date(),
    },
    {
      id: "3hsd6%^^ass",
      message: "Hi - I hope you are doing Good",
      sentBy: "Bob",
      recievedBy: localStorage.getItem("currentUser") || "Shahzaib Shahid",
      date: new Date(),
    },
  ];

  const InitialActiveChatState = [
    {
      messageId: "xnyssdsd31",
    },
    {
      messageId: "3hsd6%^^ass",
    },
  ];

  const [messageState, setMessageStateState] = useState<Message[]>([]);
  // Todo: Hard coded - This should be user from first Message object of list
  const [selectedChat, setSelectedChat] = useState<string>("Alex");

  // setActiveChat can be added if we add feature to start new conversation
  const [activeChat] = useState<{ messageId: string }[]>(
    InitialActiveChatState
  );

  useEffect(() => {
    // Mock current Logged in User
    localStorage.setItem("currentUser", "Shahzaib Shahid");

    // Load existing messages
    const messagesHistory = localStorage.getItem("messages");
    if (messagesHistory) {
      setMessageStateState(JSON.parse(messagesHistory));
    } else {
      setMessageStateState(InitialMessageState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messageState));
  }, [messageState]);

  const onChatSelected = (chatWith: string) => {
    setSelectedChat(chatWith);
  };

  const onMessageSent = (message: Message) => {
    setMessageStateState((prevState) => [...prevState, message]);
  };

  const renderChatContainer = useMemo(() => {
    const messages = messageState.filter((m) => {
      return (
        (m.recievedBy === selectedChat &&
          m.sentBy === localStorage.getItem("currentUser")) ||
        (m.recievedBy === localStorage.getItem("currentUser") &&
          m.sentBy === selectedChat)
      );
    });
    return (
      <Chat
        messages={messages}
        chatWith={selectedChat}
        onMessageSent={onMessageSent}
      />
    );
  }, [selectedChat, messageState]);

  return (
    <div className="App">
      <StyledHeader>Messenger App</StyledHeader>
      <Content>
        <ChatNavigation>
          {activeChat.map(({ messageId }) => {
            const message = messageState.find((m) => m.id === messageId);
            if (message) {
              return (
                <ChatNavigationRow
                  key={message?.recievedBy}
                  {...message}
                  onSelected={onChatSelected}
                />
              );
            }
            return null
          })}
        </ChatNavigation>
        {renderChatContainer}
      </Content>
    </div>
  );
}

export default App;
