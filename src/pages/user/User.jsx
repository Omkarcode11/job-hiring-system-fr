import React from "react";

function User() {
let type = localStorage.getItem("jobUserType");
let name = localStorage.getItem("jobUserName");
return <h1>Welcome {name} as a {type}</h1>;
}

export default User;
