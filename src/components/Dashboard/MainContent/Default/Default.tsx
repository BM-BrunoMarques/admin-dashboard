import React from "react";
import UserManagement from "./Users/UserManagement";
import PrivateUserRoute from "../PrivateUserRoute/PrivateUserRoute";

const Default: React.FC = () => {
  return (
    <PrivateUserRoute>
      <UserManagement />
    </PrivateUserRoute>
  );
};

export default Default;
