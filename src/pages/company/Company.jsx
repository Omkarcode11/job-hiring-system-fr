import React from "react";

function Company() {
  let name = localStorage.getItem("jobUserType");
  let type = localStorage.getItem("jobUserName");
  return (
    <h1>
      Welcome {name} as a {type}
    </h1>
  );
}

export default Company;
