import './App.css';
import {useState,useEffect} from 'react';
import Axios from 'axios';
function App() {

  const[name,setName] = useState('');
  const[age,setAge] = useState(0);
  const[listoffriends,setListoffriends] = useState([]);

  const addFriend = () =>{
    Axios.post('https://mern-friends-crud.herokuapp.com/addfriend',{name:name,age:age}).then((x)=>{
      setListoffriends([...listoffriends,{_id:x.data._id,name:name,age:age}]);
    });
  }

  const updateFriend = (id)=>{
        const newage = prompt('Enter new age : ');
        Axios.put('https://mern-friends-crud.herokuapp.com/update',{newage:newage,id:id}).then(()=>{
          setListoffriends(listoffriends.map((x)=>{
            return x._id == id ? {_id:id,name:x.name,age:newage} : x;
          }))
        });
  }

  const deleteFriend = (id) =>{
    Axios.delete(`https://mern-friends-crud.herokuapp.com/delete/${id}`).then(()=>{
      setListoffriends(
        listoffriends.filter((res)=>{
        return res._id != id;
      })
      );
    });
  }

  useEffect(()=>{
    Axios.get('https://mern-friends-crud.herokuapp.com/read').then((response)=>{
      setListoffriends(response.data);
    }).catch(()=>{
      console.log('Error');
    })
  },[]);

  return (
    <div className="App">
      <div className='inputs'>
     <input 
     type='text' 
     placeholder='Friend Name' 
     onChange={(event)=>{
       setName(event.target.value)
       }} />
     <input 
     type='number' 
     placeholder='Friend Age'
     onChange={(event)=>{
      setAge(event.target.value)
      }} 
       />
       <button onClick={addFriend}>Add Friend</button>
     </div>

    <div className='listoffriends'>

    {listoffriends.map((x)=>{
          return (
            <div className='friendContainer'>
          <div className='friend'> 
            <h3>Name : {x.name}</h3>
            
            <h3>Age : {x.age} </h3>
          </div>
          <div>
            <button onClick={()=>{
              updateFriend(x._id)
            }}>Update</button>
            <button id='removebtn' onClick={()=>{
              deleteFriend(x._id)
            }}>X</button>

          </div>
          </div>
          );
    })}

    </div>

    </div>
  );
}

export default App;
