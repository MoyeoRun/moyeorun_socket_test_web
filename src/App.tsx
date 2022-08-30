import React, { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import * as StompJs from "@stomp/stompjs";
import MainPage from "./pages/MainPage";

let client: StompJs.Client;

const App: FC = () => {
  const [url, setUrl] = useState("wss://2825-203-229-46-79.ngrok.io/api/ws");
  const [isConnected, setIsConnected] = useState(false);
  const [subscribes, setSubscribes] = useState<string[]>([]);
  const navigate = useNavigate();

  const connect = (url: string, subscribes: string[]) => {
    setIsConnected(false);
    client = new StompJs.Client({
      brokerURL: url,
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onStompError = (frame) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    client.onConnect = (frame) => {
      setIsConnected(true);
      subscribes.forEach((subscribe) => {
        client.subscribe(subscribe, (message) => {
          if (message.body) {
            console.log(`${subscribe}: ${message.body}`);
          } else {
            console.log(`${subscribe}: 메시지가 없습니다.`);
          }
        });
      });
    };
    client.activate();
  };

  const sendFree = (destination: string, data: any) => {
    client.publish({
      destination,
      body: JSON.stringify(data),
      headers: { priority: "9" },
    });
  };

  const onDisconnect = () => {
    client.deactivate();
    setIsConnected(false);
  };

  useEffect(() => {
    connect(url, subscribes);

    return () => {
      client.deactivate();
    };
  }, [url, subscribes]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            url={url}
            setUrl={setUrl}
            isConnected={isConnected}
            subscribes={subscribes}
            setSubscribes={setSubscribes}
            sendFree={sendFree}
            onDisconnect={onDisconnect}
          />
        }
      />
    </Routes>
  );
};

export default App;
