import React from "react";
import Avatar from "react-avatar";
import { useAppSelector } from "../../../../../app/hooks";

interface props {
  name?: string;
}

const UserAvatar: React.FC<props> = ({ name }) => {
  const authUser = useAppSelector((state) => state.auth.user.info.name);
  const authUserName = `${authUser.firstName} ${authUser.lastName}`;
  return <Avatar name={name || authUserName} size="40" round={true} />;
};

export default UserAvatar;
