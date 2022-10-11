import React, { useEffect, useState } from "react";
import { TiMessages } from "react-icons/ti";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { activeChat } from "../slice/activeChatSlice";

const JoinGroupList = () => {
  const dispatch = useDispatch();
  const db = getDatabase();
  const auth = getAuth();
  const [grouplist, setGrouptaglist] = useState([]);
  useEffect(() => {
    let arr = [];
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        let groupinfo = {
          adminid: item.val().adminid,
          adminname: item.val().adminname,
          groupname: item.val().groupname,
          grouptagline: item.val().grouptagline,
          key: item.key,
        };
        arr.push(groupinfo);
      });
      setGrouptaglist(arr);
    });
  }, []);

  let handleActiveChat = (item) => {
    let userInfo = {
      status: "group",
      name: item.groupname,
      groupid: item.key,
      groupadminid: item.adminid,
    };

    dispatch(activeChat(userInfo));
  };

  return (
    <div className="grouplist">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Groups List</h2>
      </div>

      {grouplist.map((item) => (
        <div className="box" onClick={() => handleActiveChat(item)}>
          <div className="img">
            <img src="assets/images/groupimg.png" />
          </div>
          <div className="name">
            <h1>{item.groupname}</h1>
            <h4>
              {item.grouptagline}{" "}
              {item.adminid != auth.currentUser.uid ? "" : "(Admin)"}
            </h4>
            {/* <h4>Admin: {item.key}</h4> */}
          </div>
          <div className="button">
            <button>
              <TiMessages />
            </button>
          </div>
        </div>
      ))}
      {/* 
      <div className="box">
        <div className="img">
          <img src="assets/images/groupimg.png" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a MERN STAR</h4>
        </div>
        <div className="button">
          <button>
            <TiMessages />
          </button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/groupimg.png" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a MERN STAR</h4>
        </div>
        <div className="button">
          <button>
            <TiMessages />
          </button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/groupimg.png" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a MERN STAR</h4>
        </div>
        <div className="button">
          <button>
            <TiMessages />
          </button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/groupimg.png" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a MERN STAR</h4>
        </div>
        <div className="button">
          <button>
            <TiMessages />
          </button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/groupimg.png" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a MERN STAR</h4>
        </div>
        <div className="button">
          <button>
            <TiMessages />
          </button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/groupimg.png" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a MERN STAR</h4>
        </div>
        <div className="button">
          <button>
            <TiMessages />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default JoinGroupList;
