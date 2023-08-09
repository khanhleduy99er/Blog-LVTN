//
const token = localStorage.getItem("token");
if (!token) {
  location.href = "login.html";
}
const users = document.getElementById("list-user");
init();

async function init() {
  await getUser();
}
function renderUser(data) {
  return `
      <div class="row">
          <div class="x_panel">
               <div class="x_content">
                    <div class="col-md-12 col-sm-12 text-center">
                      <ul class="pagination pagination-split">
                        <li>
                          "Tạo post và thêm nội dung post để hiển thị trên website..."
                        </li>
                      </ul>
                    </div>
                    ${data
                      .map((t) => {
                        return `
                        <div class="col-md-4 col-sm-4" ">
                          <div class="card" style="height: 220px; margin: 5px;">
                              <div class="card-body">
                              <h5 class="card-title">${t.hoTen}</h5>
                              <p class="card-text">Email: ${t.email}</p>
                              <p class="card-text">Tài khoản: ${t.taiKhoan}</p>
                              <p class="card-text">Ngày tạo: ${moment(
                                t.ngayTao ?? new Date()
                              ).format("DD-MM-YYYY")}</p>

                              <a href="#" class="btn btn-danger" onclick="onDelete('${
                                t._id
                              }')">Delete</a>
                              </div>
                          </div>
                        </div>`;
                      })
                      .join("")}
              </div>
           </div>
      </div>
    `;
}

// get user for Db
async function getUser() {
  const config = {
    method: "get",
    url: "http://localhost:8081/api/user",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // render User of blog
  await axios(config)
    .then(function (response) {
      users.innerHTML = renderUser(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// delete user for Db
async function onDelete(id) {
  const config = {
    method: "delete",
    url: `http://localhost:8081/api/user?id=${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // render User of blog
  await axios(config)
    .then(async function () {
      await getUser();
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createUser(data) {
  var config = {
    method: "post",
    url: "http://localhost:8081/api/user",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(async function (response) {
      $("#modalwindow").modal("hide").data("bs.modal", null);
      await getUser();
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function onSubmit() {
  const fullName = document.getElementById("fullName").value;
  const userName = document.getElementById("userName").value;
  const passWord = document.getElementById("passWord").value;
  const email = document.getElementById("email").value;
  const data = {
    taiKhoan: userName,
    matKhau: passWord,
    hoTen: fullName,
    email: email,
  };
  await createUser(data);
}
