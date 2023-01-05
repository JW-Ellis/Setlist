const createPlaylist = async ({ zip }, date) => {
  //const location = await getLocation(zip);
  const response = await fetch("http://localhost:8000/playlist", {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      data: "yooooo",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body data type must match "Content-Type" header
  });

  console.log("ZIP: ", response);
};

export default createPlaylist;
