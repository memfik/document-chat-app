"use client";

import { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const websocket = new WebSocket("wss://ws.ifelse.io");

    websocket.onopen = () => {
      console.log("ws подключено");
      setConnectionStatus("connected");
    };

    websocket.onmessage = (event) => {
      const assistantMessage: Message = {
        id: Date.now(),
        text: event.data,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    };

    websocket.onerror = (error) => {
      console.error("ощибка при подкл", error);
      setConnectionStatus("disconnected");
    };

    websocket.onclose = () => {
      console.log("вс отключ");
      setConnectionStatus("disconnected");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!inputValue.trim() || !ws || connectionStatus !== "connected") return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    ws.send(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-8 mb-8 px-4">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Чат с ассистентом</h1>
        <p className="text-base text-gray-600">
          Общайтесь с AI-ассистентом в реальном времени
        </p>
        {connectionStatus === "connecting" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            Подключение к серверу...
          </div>
        )}
        {connectionStatus === "disconnected" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            Соединение потеряно. Попробуйте обновить страницу.
          </div>
        )}
      </div>
      <div className="h-[60vh] flex flex-col shadow-lg rounded-lg bg-white">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full text-gray-500">
              <p className="text-base">Начните диалог, отправив сообщение</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 w-full",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "assistant" && (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                  <SmartToyIcon />
                </div>
              )}
              <div
                className={cn(
                  "p-4 max-w-[70%] rounded-lg",
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                )}
              >
                <p className="text-base wrap-break-word">{message.text}</p>
                <span className="block mt-1 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
                  <PersonIcon />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 p-4 border-t border-gray-200">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Введите сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={connectionStatus !== "connected"}
          />
          <button
            className={cn(
              "px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors",
              !inputValue.trim() || connectionStatus !== "connected"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
            onClick={handleSend}
            disabled={!inputValue.trim() || connectionStatus !== "connected"}
          >
            Отправить
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
