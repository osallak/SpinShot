import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { statUsername } from '../../../redux_tool/redusProfile/profileSlice';
import Sidebar from '@/Components/ui/Sidebar/sidebar';

// type objType = [
//   body : string,
//   id : number,
//   title : string, 
//   userId : number,
// ]

// export default function Page({post}: any) {
//   const router = useRouter();
//   const { id } = router.query;
//   console.log("userdata:", post);
//   return (
//     <div className='text-white flex justify-center items-center flex-col'>
//       <h1>  {post.username}</h1>
//       <h1> {post.emai7l} </h1>
//       <h1> {post.profile.name.givenName} </h1>

//     </div>
//   )
// }

// const initialState = {
//   todos: [],
//   posts: []
// }

// function myReducer(state = initialState, action:any){
//   console.log(action, state);
// }

// const store = createStore( );

export default function Page({re}: any) {
  // const router = useRouter();
  const user = useSelector((state:any) => state.counter)
  const dispatch = useDispatch();
  const hendel = () => {
    console.log(re)
    dispatch(statUsername(re.username))

  }
  // const { id } = router.query;
  console.log("userdata:", re);
  return (
    <div className='text-white flex justify-center items-center flex-col'>
      <h1>  {re.username}</h1>
      <h1> {re.email} </h1>
      <h1> {re.profile.name.givenName} </h1>
      <h1>user : {user.username}</h1>
      <button onClick={hendel} className='bg-white'> my_button </button>

    </div>
  )
}

// const Page = {todos: 'post'}

// store.dispatch(Page)

// const initialState = {
//   props:[]
// }

// export const reducer = (state = initialState, action:any) => {
//   return state;
// }

export const getServerSideProps = async (context:any) => {

  try{
    const repo = await axios.get(`http://34.16.168.248:3001/users/${context.query.id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyZXgiLCJzdWIiOiIxMmY5Mzg1MS1lNjM4LTQyMDUtOGRhOS1kMThhZWNmN2E0MGMiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5MzY3Nzg3NSwiZXhwIjoxNjkzNzY0Mjc1fQ.Vz5JRoGFKMac5i-8xW9EEZuQOsHOhKfzMJZrPXYep_0',
      }
    },)
    console.log(repo.data)
    return { props:{re: repo.data} }
  }catch(error){
    return {
      props: {
        error: true,
      },
    };
  }
}
