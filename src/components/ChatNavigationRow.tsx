import React from "react";
import Styled from "styled-components";
import { Avatar } from "antd";
import { Message } from "../App";

type Props = {
  onSelected: (id: string) => void;
} & Message;

const Row = Styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
    &:hover {
        background-color: #EBEBEB;
    }
    .ant-avatar {
        width: 50px;
        height: 50px;
        line-height: 50px;
        color: #f56a00;
        background-color: #fde3cf;
    }
`;

const Title = Styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    margin-left: 15px;
    .user {
        font-size: 16px;
        font-weight: 600;
        color: #102027;
    }
    .message {
        color: #808e95;
    }
`;

const ChatNavigationRow = (props: Props) => {
    const getChatWith = () => {
        const currentUser = localStorage.getItem("currentUser")
        return props.sentBy !== currentUser && props.recievedBy === currentUser ? props.sentBy : props.recievedBy
    }
  return (
    <Row onClick={() => props.onSelected(getChatWith())}>
      <Avatar>{getChatWith()[0]}</Avatar>
      <Title>
        <div className="user"> {getChatWith()} </div>
        <div className="message"> {props.message.substring(0, 100)} </div>
      </Title>
    </Row>
  );
};

export default ChatNavigationRow;
