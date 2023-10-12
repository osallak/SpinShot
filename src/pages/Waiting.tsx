import React, { useEffect, useState } from "react";
import axios from "axios";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import { useRouter } from "next/router";


const Waiting = () => {
  const router = useRouter();
  const [codec, setCode] = useState<any>("");
  
  const code = router.query.code;
  const fetchData = async () => {
    console.log("token from continue with intra: ", code);
    if (!code) return;
    try {
      const res = await axios.get(`http://localhost:3001/auth/42?code=${code}`  );
      console.log("response from waiting page: ", res);
      console.log("token from waiting page: ", res?.data?.token);
    } catch (error) {
      console.log("error from waiting page: ", error);
    }
  };
  // if (localStorage.getItem("token")) {
  //   console.log("token: ", localStorage.getItem("token"))
  //   console.log("jwtToke: ", parseJwt(JSON.stringify(localStorage.getItem("token"))))
  // }
  useEffect(() => {
    if (!code) console.log("theire is no code");
    else {
      console.log("tokenized");
      setCode(code);
    }
    fetchData();
  }, [code])
  
  return <div>Waiting</div>;
};

export default Waiting;
