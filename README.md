# LTNC-HK232

8/3/2024:
*Nguyễn Đăng Khoa:
- Làm mới lại giao diện đăng nhập bằng JavaScript
- Quản lý thông tin của QTV/SV/GV trên firebase bằng chính ID của họ
- Trang đăng nhập có tính năng ẩn /hiện mật khẩu khi gõ
- Sau khi đăng nhập, hệ thống sẽ tự tìm kiếm thông tin của bạn trên Realtime Database để quyết định xem bạn là QTV/SV/GV
    + Nếu bạn là QTV, bạn có quyền: 
        -> Thêm những QTV khác
        -> Thêm/tìm kiếm/sửa/xóa thông tin của sinh viên hoặc giáo viên bất kì
    + Nếu bạn là SV: (chưa làm)
    + Nếu bạn là GV: (chưa làm)
- Thông tin của 1 QTV bao gồm:
    + ID
    + email
    + password
    + username
- Thông tin của 1 sinh viên/giáo viên gồm:
    + ID
    + email
    + password
    + username
    + address
    + city
    + district

