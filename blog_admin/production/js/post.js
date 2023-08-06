const token = localStorage.getItem("token");
if (!token) {
  location.href = "login.html";
}
const posts = document.getElementById("list-post");
const selectGroupPost = document.getElementById("selectGroupPost");
const selectImage = document.getElementById("selectImage");

async function init() {
  await getPost();
  await getGroupPost();
  await getImages();
}
init();
function renderPost(data) {
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
                        <div class="card" style="height: 600px; margin: 5px;">
                            <img src="${t.hinhAnh}" style="height:300px;" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${t.tieuDe}</h5>
                            <p class="card-text">${t.noiDung}</p>
                            <a href="#" class="btn btn-danger" onclick="onDelete('${t._id}')">Delete</a>
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
function renderImage(data) {
  return data
    .filter((t) => t.ma != 0)
    .map((t) => `<option value=${t}>${t}</option>`)
    .join();
}
function renderGroupPost(data) {
  return data
    .filter((t) => t.ma != 0)
    .map((t) => `<option value=${t.ma}>${t.ten}</option>`)
    .join();
}
async function getPost() {
  const config = {
    method: "get",
    url: "http://localhost:8081/api/post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios(config)
    .then(function (response) {
      posts.innerHTML = renderPost(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getGroupPost() {
  const config = {
    method: "get",
    url: "http://localhost:8081/api/group-post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios(config)
    .then(function (response) {
      selectGroupPost.innerHTML = renderGroupPost(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getImages() {
  const config = {
    method: "get",
    url: "http://localhost:8081/api/image",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios(config)
    .then(function (response) {
      selectImage.innerHTML = renderImage(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function createPost(data) {
  var config = {
    method: "post",
    url: "http://localhost:8081/api/post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(async function (response) {
      $("#modalwindow").modal("hide").data("bs.modal", null);
      await getPost();
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function onDelete(id) {
  const config = {
    method: "DELETE",
    url: `http://localhost:8081/api/post?id=${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  await axios(config)
    .then(async function (response) {
      await getPost();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//#region Event
async function onSubmit() {
  const tieuDe = document.getElementById("postTitleInput").value;
  const noiDung = document.getElementById("postContentInput").value;
  const groupPost = document.getElementById("selectGroupPost").value;
  const selectImage = document.getElementById("selectImage").value;
  const data = {
    tieuDe: tieuDe,
    noiDung: noiDung,
    hinhAnh: `/images/${selectImage}`,
    idGroupPost: Number(groupPost),
  };
  await createPost(data);
}
//#endregion
