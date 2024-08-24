import React, { useState } from "react";
import { useAuth } from "../../context/auth-context/AuthContext";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

const ConversationWindow = () => {
  const {
    currentConversation,
    currentUser,
    sendMessage,
    currentConversationReceiver,
  } = useAuth();

  // Mesaj gönderme durumunda mesaj yazma kutusunu güncellemek için
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    sendMessage(currentConversationReceiver, newMessage);
    setNewMessage("");
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        padding: "16px",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "scroll", padding: 2 }}>
        {Array.isArray(currentConversation) &&
        currentConversation.length > 0 ? (
          currentConversation.map((message, index) => {
            const isCurrentUser = message.sender === currentUser.username;
            return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: isCurrentUser ? "#DCF8C6" : "#FFFFFF",
                      maxWidth: "60%",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">{message.message}</Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", textAlign: "right", mt: 1 }}
                    >
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </Box>
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary">
            Henüz mesaj yok.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #ccc",
          bgcolor: "#ffffff",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Mesajınızı yazın..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ ml: 2 }}
        >
          Gönder
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationWindow;
