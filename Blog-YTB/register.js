const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");
const urlApi = "http://localhost:8081";

//#region event
async function onSubmit() {
  try {
    await axios.post(`${urlApi}/api/user`, {
      taiKhoan: username.value,
      matKhau: password.value,
      hoTen: password.value,
      email: email.value,
    });
    window.location.href = "/Blog-YTB/login.html";
  } catch (error) {
    alert("Lỗi từ sever");
  }
}
//#endregion
