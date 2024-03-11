# LTNC-HK232

8/3/2024:
*Nguyễn Đăng Khoa:
- Làm mới lại giao diện đăng nhập bằng JavaScript
- Quản lý thông tin của QTV/SV/GV trên firebase bằng chính ID của họ
- Trang đăng nhập có tính năng ẩn /hiện mật khẩu khi gõ
- Sau khi đăng nhập, hệ thống sẽ tự tìm kiếm thông tin của bạn trên Realtime Database để quyết định xem bạn là QTV/SV/GV
    + Nếu bạn là QTV, bạn có quyền: 
        -> Thêm những QTV khác
        -> Thêm/tìm kiếm/sửa/xóa thông tin của sinh viên hoặc giảng viên bất kì
    + Nếu bạn là SV: (chưa làm)
    + Nếu bạn là GV: (chưa làm)
- Thông tin của 1 QTV bao gồm:
    + ID
    + email
    + password
    + username
- Thông tin của 1 sinh viên/giảng viên gồm những thuộc tính chung:
    + ID
    + email
    + password
    + username
    + address
- Thuộc tính riêng của sinh viên
    + Learning lưu trữ những môn sẽ học ở kì này (do sinh viên đăng kí ở kì này)
    + Learned lưu trữ những môn đã học ở những kì trước, bao gồm các thuộc tính:
        -> Điểm trung bình học kì (điểm số và điểm chữ)
        -> Học ở học kì nào
    + Điểm trung bình tích lũy
- Thuộc tính riêng của giảng viên
    + Teach: lưu trữ những môn giảng viên này có thể dạy

- Những thuộc tính của đối tượng "MonHoc":
    + Mã số môn học (danh định)
    + Có các "TrangThongTin" ứng với từng lớp học

- Những thuộc tính của đối tượng "TrangThongTin":
    + Lưu trữ từng bộ (Môn học, Giảng Viên, các Sinh viên)
    + Tài liệu (làm follow theo ý tưởng của zathink):
        -> Mô tả môn học
        -> Tài liệu giảng dạy
        -> Video

- Một số lưu ý:
    + Theo cách đặt cho id của từng user thì id đó sẽ là danh định, k ai giống ai
    + Quy ước cách đặt tên mail trường sẽ làm cho mail của người dùng cũng là danh định, k ai giống ai


*****************************Cách lưu dữ liệu ở database*****************************
- Thông tin các môn học sẽ có sẵn ở csdl của trường (QTV có quyền chỉnh sửa các thuộc tính của môn học)
- Khi đăng kí môn việc sắp xếp lớp học sẽ giả sử bỏ qua việc giảng viên bận không dạy được ca được sắp xếp (không hỗ trợ đổi giờ dạy cho giảng viên (hoặc có thể sẽ đổi nếu có thời gian làm phần này))
- Đầu mỗi kì, sinh viên sẽ đăng kí môn học, khi đó:
    +  Mục "learning" lưu trữ những môn đăng kí ở kì này (lưu trữ ở dạng mã số môn học như C02123)
    +  Mã số môn học sẽ tham chiếu đến những môn học lưu trữ ở csdl "MonHoc"

