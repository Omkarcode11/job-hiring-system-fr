import React from "react";

function Error() {
  let code = localStorage.getItem("jobError");

  return (
    <div className="text-center">
      <img className="w-50" src="./11104.jpg" alt="Error-img" />
      <h1 >Error Code:{code}</h1>
    </div>
  );
}

export default Error;
