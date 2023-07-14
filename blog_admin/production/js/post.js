const token = localStorage.getItem("token");
if (!token) {
  location.href = "login.html";
}
const posts = document.getElementById("list-post");
async function init() {
  console.log(1);
  await getPost();
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
                            <a href="#" class="btn btn-primary">View Detail</a>
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
