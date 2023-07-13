async function onLogin() {
  const userName = document.getElementById("userName").value;
  const passWord = document.getElementById("passWord").value;
  const data = JSON.stringify({
    taiKhoan: userName,
    matKhau: passWord,
  });
  const config = {
    method: "post",
    url: "http://localhost:8081/api/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      localStorage.setItem("token", response.data);
      location.href = "index.html";
    })
    .catch(function (error) {
      alert("Thông tin không hợp lệ vui lòng thử lại!");
    });
}
