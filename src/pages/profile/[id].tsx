import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'vm';
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

 
// type objType = [
//   body : string,
//   id : number,
//   title : string, 
//   userId : number,
// ]



export const DataRandring = createContext(undefined);

const Myatom = atom({
  key: "",
  default: ''
})

export default function Page({post}: any) {
    const [valu_data, setvalu_data] = useRecoilState(Myatom);
  // const router = useRouter();
  // const { id } = router.query;
  setvalu_data(post)
  console.log("userdata:", valu_data);
  return (
    <div className='text-white flex justify-center items-center flex-col'>
      {/* <h1>  {post.username}</h1>
      <h1> {post.emai7l} </h1>
      <h1> {post.profile.name.givenName} </h1> */}

    </div>
  )
}



export const getServerSideProps = async (context:any) => {
  try{
    const repo = await axios.get(`http://34.16.168.248:3001/users/${context.query.id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyZXgiLCJzdWIiOiIxMmY5Mzg1MS1lNjM4LTQyMDUtOGRhOS1kMThhZWNmN2E0MGMiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5MzQyMDc2NywiZXhwIjoxNjkzNTA3MTY3fQ.lW0oZoXyyjmTMS6qOvhPelGhqBpEl5hcR8qT-amx2bU',
      }
    },)
    console.log(repo.data)
    return { props:{post: repo.data}}
  }catch(error){
    return {
      props: {
        error: true,
      },
    };
  }

}
