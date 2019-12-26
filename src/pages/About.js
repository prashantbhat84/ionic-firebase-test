import React from "react";
import Firebase from "../config/config";

export const About = () => {
  console.log(Firebase.database());
  return (
    <div>
      <h2>This is the about page</h2>
    </div>
  );
};
export default About;
