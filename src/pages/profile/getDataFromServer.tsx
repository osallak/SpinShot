import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { statUsername } from '../../../redux_tool/redusProfile/reduse';

interface objType {
  body: string;
  id: number;
  title: string;
  userId: number;
}


const GetDataFromServer = () => {
  
  const [response, setResponse] = useState<any>([]);

  const fetchaxios = async () => {
  const respo = await axios.get(`http://34.16.168.248:3001/users/ibenmain`, {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyZXgiLCJzdWIiOiIxMmY5Mzg1MS1lNjM4LTQyMDUtOGRhOS1kMThhZWNmN2E0MGMiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5Mzc2ODY5MCwiZXhwIjoxNjkzODU1MDkwfQ.zw2T5gKme6PUurS9MqqOoDdQFw2lqn3Zv1sjbilPN7g`,
    }
  },)
  setResponse(respo.data);
};
  useEffect(() => {
    fetchaxios();
  }, []);
  console.log("user name :",response);
  // const user = useSelector((state:any) => state.counter)
  const dispatch = useDispatch();
  dispatch(statUsername(response.username))
  return ( <></> )
}

export default GetDataFromServer;