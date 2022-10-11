import React, { useEffect, useState } from 'react'
import { getDatabase,set, ref, onValue,push,remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import {Alert} from '@mui/material'
const FriendRequest = () => {
    const db = getDatabase();
    const auth = getAuth();
    let [friendRequest,setFriendRequest] = useState([])
    let [dlt,setDlt] = useState(true)
    

    useEffect(()=>{
        let friendRequestArr = []
        const friendRquestRef = ref(db, 'friendrequest/');
        onValue(friendRquestRef, (snapshot) => {
            snapshot.forEach((item)=>{
                console.log("random id",item.key)
             if(item.val().receiverid == auth.currentUser.uid){
                friendRequestArr.push({
                    id: item.key,
                    sendername: item.val().sendername,
                    senderid: item.val().senderid,
                    receiverid: item.val().receiverid,
                    receivername: item.val().receivername,
                })
             }
                
                
            })
            setFriendRequest(friendRequestArr)
        });
    },[dlt])

    let handleAcceptFriend = (friend)=>{
        console.log(friend)
        set(push(ref(db, 'friends')), {
                id: friend.id,
                sendername: friend.sendername,
                senderid: friend.senderid,
                receiverid: friend.receiverid,
                receivername: friend.receivername,
                date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
          }).then(()=>{
            remove(ref(db, 'friendrequest/'+friend.id)).then(()=>{
                setDlt(!dlt)
            })

          })
    }

  return (
    <div className='grouplist'>
        <h2>Friend  Request</h2>
        {friendRequest.map(item=>(
           
            <div className='box'>
                <div className='img'>
                    <img src='assets/images/friendrequest.png'/>
                </div>
                <div className='name'>
                    <h1>{item.sendername}</h1>
                    <h4>Hi Guys, Wassup!</h4>
                </div>
                <div className='button'>
                    <button onClick={()=>handleAcceptFriend(item)}>Accept</button>
                </div>
            </div>
           
        ))}   
        {friendRequest.length==0&&
            <Alert style={{marginTop: "50px"}} severity="info">No Friend Request Here</Alert>
        }  
    </div>
  )
}

export default FriendRequest