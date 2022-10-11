import React from "react";
import { Alert, Grid } from "@mui/material";
import Leftbar from "../components/Leftbar";
import Search from "../components/Search";
import GroupList from "../components/GroupList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import BlockUser from "../components/BlockUser";
import JoinGroupList from "../components/JoinGroupList";
import Chat from "../components/Chat";

const Message = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Leftbar active="msg" />
      </Grid>
      <Grid item xs={4}>
        <Search></Search>
        <JoinGroupList />
        <Friends item="button" />
      </Grid>
      <Grid item xs={6}>
        <Chat />
      </Grid>
    </Grid>
  );
};

export default Message;
