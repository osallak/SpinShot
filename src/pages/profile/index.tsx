import axios from "axios";

const handlePostData = async (data:any) => {
      try{
        const response = await axios.patch('http://34.16.168.248:3001/users', 
        {
          username: "frex",
          email: "frex2020@email.com",
          password: "null",
          firstName: "issam",
          lastName: "Benmaina",
          country: "Maroc"
        }, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyZXgiLCJzdWIiOiIxMmY5Mzg1MS1lNjM4LTQyMDUtOGRhOS1kMThhZWNmN2E0MGMiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5MzMxOTkzMCwiZXhwIjoxNjkzNDA2MzMwfQ.5ptJ_GG2QxKn6OA5ZCvwMCBd3706LiOY96Fe7ROY6lY',
        },
      })
      console.log("send");
    }
    catch (error){
      console.error(error);
    };
  };



  export default function MyComponent() {
  
    return (
      <button className="bg-red-900 text-white" onClick={() => handlePostData({})}>
        Post Data
      </button>
    );
  }