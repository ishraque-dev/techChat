import React, { useEffect, useState } from 'react'
import { getDatabase,set , ref, onValue,push} from "firebase/database";
import { getAuth } from "firebase/auth";
import { BsCheck } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
const UserList = () => {
    const auth = getAuth();
    const db = getDatabase();
    // console.log(auth.currentUser)
    
let [userlist,setUserlist] = useState([])
let [friendRequest,setFriendRequest] = useState([])
let [friend,setFriend] = useState([])
let [change,setChange] = useState(false)

useEffect(()=>{
        let userArr = []
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {

            
            snapshot.forEach((item)=>{
                userArr.push({
                    username: item.val().username,
                    email: item.val().email,
                    id: item.key
                })
                
            })
            setUserlist(userArr)
        });
    },[])

    useEffect(()=>{
        let friendRequestArr = []
        // let friendRequestArr2 = []
        const friendRquestRef = ref(db, 'friendrequest/');
        onValue(friendRquestRef, (snapshot) => {
            snapshot.forEach((item)=>{       
                friendRequestArr.push(item.val().receiverid+item.val().senderid)
             })
            setFriendRequest(friendRequestArr)
        
        });
    },[change])

    useEffect(()=>{
        let friendArr = []
        // let friendRequestArr2 = []
        const friendRef = ref(db, 'friends/');
        onValue(friendRef, (snapshot) => {
            snapshot.forEach((item)=>{       
                friendArr.push(item.val().receiverid+item.val().senderid)
             })
            setFriend(friendArr)
        
        });
    },[])

    let handleFriendRequest = (info)=>{
        set(push(ref(db, 'friendrequest')), {
            sendername: auth.currentUser.displayName,
            senderid: auth.currentUser.uid,
            receiverid: info.id,
            receivername: info.username
        });
        setChange(!change)
    }

  return (
    <div className='grouplist friendlist userlist'>
        <h2>User List</h2>

        {userlist.map(item=>(
            auth.currentUser.uid !== item.id &&
            <div className='box'>
                <div className='img'>
                    <img src='assets/images/groupimg.png'/>
                </div>
                <div className='name'>
                    <h1>{item.username}</h1>
                    <h4>{item.email}</h4>
                </div>

                {friend.includes(item.id+auth.currentUser.uid) || friend.includes(auth.currentUser.uid+item.id)  
                ?
                <div className='button'>
                    <button><FaUserFriends/></button>
                </div>
                :
                friendRequest.includes(item.id+auth.currentUser.uid) || friendRequest.includes(auth.currentUser.uid+item.id)  ?
                <div className='button'>
                    <button><BsCheck/></button>
                </div>
                :
                <div className='button'>
                    <button onClick={()=>handleFriendRequest(item)}>+</button>
                </div>
            
                }
                
            </div>
        ))}
        
        
        
    </div>
  )
}

export default UserList