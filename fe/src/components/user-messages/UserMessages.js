import * as React from "react";
import { useAuth } from "../../context/auth-context/AuthContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar, Divider, Typography, Box } from "@mui/material";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ConversationWindow from "../conversation-window/ConversationWindow";

const UserMessages = () => {
  const { conversationHistory, getConversation } = useAuth();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", padding: "50px 10rem" }}
    >
      <Box sx={{ width: "40%" }}>
        <Typography
          id="ellipsis-list-demo"
          variant="body2"
          textTransform="uppercase"
          sx={{ letterSpacing: "0.15rem" }}
        >
          Mesajlar
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {conversationHistory.map((conversationUser, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="center"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  getConversation(conversationUser);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <LocalPostOfficeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={conversationUser}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Box sx={{ width: "60%" }}>
        <ConversationWindow />
      </Box>
    </Box>
  );
};

export default UserMessages;
