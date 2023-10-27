import React from "react";
import { useRouter } from "next/router";
import ProfilePage from "../../Components/profile/profilePage";

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  return <ProfilePage id={id} />;
};

export default Profile;
