import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Message } from "../App";
import { getMessageId } from "../utils";

type Props = {
  chatWith: string;
  messages: Message[];
  onMessageSent: (message: Message) => void;
};

const Container = Styled.div`
    width: 75%;
    padding: 20px;
    height: 100%;
    overflow-y: auto;

`;

const TextEditor = Styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    width: 70%;
    bottom: 0;
    margin-bottom: 10px;
    .ant-btn{
        border: 0px;
    }
    .ant-input {
        border-radius: 50px;
    }
    .anticon{
        font-size: 24px;
        color: #455a64;
    }
`;

const ChatBubble = Styled.div<{ backgroundColor: string; position: 'auto' | 'unset' }>`
    display: flex;
    flex-direction: column;
    max-width: 60%;
    margin-bottom: 15px;
    margin-left: ${({ position }) => position};
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding: 15px;
    border-radius: 20px;
    .sent-by {
        font-size: 10px;
        margin-top: 10px;
        color: #808e95;
    }
`;

const Chat = (props: Props) => {
  const [input, setInputState] = useState<string>();

  useEffect(() => {
      setInputState("")
  }, [props.chatWith])

  const sentMessage = () => {
    if (input) {
      props.onMessageSent({
          id: getMessageId(),
        message: input,
        sentBy: localStorage.getItem("currentUser")!,
        recievedBy: props.chatWith,
        date: new Date(),
      });
      setInputState("")
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  return (
    <Container>
      {props.messages.map((m, index) => {
        return (
          <ChatBubble
            key={index}
            backgroundColor={
              m.sentBy === localStorage.getItem("currentUser")
                ? "#fff176"
                : "#b3e5fc"
            }
            position={
              m.sentBy === localStorage.getItem("currentUser")
                ? "auto"
                : "unset"
            }
          >
            {m.message}
            <div className="sent-by">
              {m.sentBy === localStorage.getItem("currentUser")
                ? "You"
                : m.sentBy}
            </div>
          </ChatBubble>
        );
      })}
      <TextEditor>
        <Input value={input} placeholder="Type a message" onChange={onInputChange} />
        <Button onClick={sentMessage}>
          <SendOutlined />
        </Button>
      </TextEditor>
    </Container>
  );
};

export default Chat;
