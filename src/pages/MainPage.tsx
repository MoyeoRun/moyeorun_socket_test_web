/** @jsxImportSource @emotion/react */
import {
  Box,
  Button,
  Card,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { css } from "@emotion/react";

type Props = {
  url: string;
  subscribes: string[];
  isConnected: boolean;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setSubscribes: React.Dispatch<React.SetStateAction<string[]>>;
  sendFree: (destination: string, data: any) => void;
  onDisconnect: () => void;
};

const MainPage: FC<Props> = ({
  url,
  subscribes,
  isConnected,
  setUrl,
  setSubscribes,
  sendFree,
  onDisconnect,
}) => {
  const [urlInput, setUrlInput] = useState("");
  const [subInput, setSubInput] = useState("");
  const [endpointInput, setEndpointInput] = useState("");
  const [dataInput, setDataInput] = useState("");

  const onSubscribe = () => {
    setSubscribes([...subscribes, subInput]);
    setSubInput("");
    console.log(`구독 추가 완료, ${subscribes}`);
  };

  return (
    <MainLayout>
      <Card sx={{ width: "100%" }} elevation={2}>
        <Box sx={{ padding: "4rem" }}>
          <h3
            css={
              isConnected
                ? css`
                    color: green;
                  `
                : css`
                    color: red;
                  `
            }
          >
            현재 연결중인 url: {url}
          </h3>
          <h4>구독중인 목록</h4>

          {subscribes.map((subscribe) => (
            <Typography key={subscribe}>{subscribe}</Typography>
          ))}
        </Box>
      </Card>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          marginBottom: "5rem",
          marginTop: "2rem",
        }}
      >
        <TextField
          label="url"
          placeholder="wss://2825-203-229-46-79.ngrok.io/api/ws"
          sx={{ flex: 1, marginRight: "1rem" }}
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          autoSave=""
        />

        {isConnected ? (
          <Button
            variant="contained"
            onClick={onDisconnect}
            color="error"
            sx={{ width: "10rem" }}
          >
            연결 끊기
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ width: "10rem" }}
            onClick={() => {
              setUrl(urlInput);
            }}
          >
            연결
          </Button>
        )}
      </Box>

      <Item>
        <Box
          sx={{
            flex: 1,
            marginRight: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>구독을 추가합니다.</Typography>
          <TextField
            size="small"
            value={subInput}
            onChange={(e) => setSubInput(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          onClick={onSubscribe}
          sx={{ width: "10rem" }}
        >
          구독 추가하기
        </Button>
      </Item>

      <Item>
        <Box
          sx={{
            flex: 1,
            marginRight: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>자유롭게 테스트 합니다.</Typography>
          <TextField
            label="endpoint"
            value={endpointInput}
            onChange={(e) => setEndpointInput(e.target.value)}
          />
          <TextField
            label="data"
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            sendFree(endpointInput, dataInput);
          }}
          sx={{ width: "10rem" }}
        >
          발행 테스트
        </Button>
      </Item>
    </MainLayout>
  );
};

export default MainPage;

const Item = styled(Box)(css`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  text-align: right;
`);
