# **Cách chạy dự án**
<p>Bước 1: Pull code về xong chạy **npm i** để tải các file trong package.json</p>
<p>Bước 2: Tạo file **.env**. Copy toàn bộ nội dung bên .env.example qua </p>
<p>Bước 3: Chạy file secret.js: **node secret.js**, sau đó copy kết quả dán vào JWT_SECRET trong .env </p>
<p>Bước 4: Khởi động XAMPP, tạo database với tên tùy ý, sau đó lưu tên database vào DB_NAME trong .env </p>
<p>Bước 5: Thay đổi **PORT, DB_USER, DB_PASSWORD** tùy vào mỗi người, có thể là **PORT=3000, DB_USER=root, DB_PASSWORD=** (để trống) </p>
<p>Bước 6: Chạy **npm start** sau đó truy cập vào localhost:PORT (thay PORT bằng PORT mà gán trong .env), ví dụ localhost:3000 </p>
