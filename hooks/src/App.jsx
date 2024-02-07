import { useReducer, useRef, useState } from 'react';
import './App.css';
import NewPost from './components/NewPost';

export const ACTION_TYPE = {
  ADD_POST:"add-post",
  TOGGLE: "toggle",
}
function App() {
  function newPost(name){
    return {id:Date.now(), name:name, toggle:true}
  }
  function reducer(posts,action){
    switch(action.type){
      case ACTION_TYPE.ADD_POST:
        return [...posts, newPost(action.payload.name)]

      case ACTION_TYPE.TOGGLE:
        return posts.map(post=>{
          if(post.id===action.payload.id){
            return {...post, toggle:!post.toggle}
          }
          else{
            return post
          }
        })
    }
  }
  const [posts, dispatch] = useReducer(reducer,[]);
  const [name, setName] = useState(" ");
  const inputRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    dispatch({type:ACTION_TYPE.ADD_POST, payload:{name:name}});
    setName(" ");
  }
  function focus(){
    inputRef.current.focus();
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" value={name} onChange={e=>setName(e.target.value)}></input>
      </form>
      {
        posts.map(post=>{
          return <NewPost key={post.id} post={post} dispatch={dispatch}/>
        })
      }
      <button onClick={focus}>Get back writing</button>
    </div>
  )
}
export default App;