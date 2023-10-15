import React from "react";
import ProfilePage from "../../Components/profile/profilePage";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <div>
      <ProfilePage id={id} />
    </div>
  );
};

export default Profile;
