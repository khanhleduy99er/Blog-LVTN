async function onLogin() {
  const userName = document.getElementById("userName").value;
  const passWord = document.getElementById("passWord").value;
  const data = {
    taiKhoan: userName,
    matKhau: passWord,
  };

  await axios
    .post("http://localhost:8081/api/login", data)
    .then(function (response) {
      localStorage.setItem("token", response.data);
      location.href = "index.html";
    })
    .catch(function (error) {
      alert("Thông tin không hợp lệ vui lòng thử lại!");
    });
}
