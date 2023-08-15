//
const token = localStorage.getItem("token");
if (!token) {
  location.href = "login.html";
}
const feedback = document.getElementById("list-feedback");
init();

async function init() {
  console.log(1);
  await getReviews();
}
function renderReviews(data) {
  console.log(data);
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
                        <div style="margin-bottom: 5px">
                          <div class="card" margin: 5px;">
                              <div class="card-body">
                              <h5 class="card-title">${t.ten}</h5>
                              <p class="card-text">Email: ${t.email}</p>
                              <p class="card-text">Số điện thoại: ${
                                t.soDienThoai
                              }</p>
                              <p class="card-text">Nội dung: ${t.noiDung}</p>
                              <p class="card-text">Ngày tạo: ${moment(
                                t.ngayTao ?? new Date()
                              ).format("DD-MM-YYYY")}</p>
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

// get review for Db
async function getReviews() {
  const config = {
    method: "get",
    url: "http://localhost:8081/api/review-us",
  };

  // render User of blog
  await axios(config)
    .then(function (response) {
      feedback.innerHTML = renderReviews(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
