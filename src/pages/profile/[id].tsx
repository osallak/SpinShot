import React from "react";
import ProfilePage from "../../Components/profile/profilePage";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
      <ProfilePage id={id} />
  );
};

export default Profile;
