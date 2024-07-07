console.log("Đã kết nối file xacNhanDonHang.js thành công");

app.controller("xacNhanDonHangCtrl", function ($scope, $http, SharedService) {
    console.log("Khai báo xacNhanDonHangCtrl thành công ");
    $scope.chiTietSanPham = SharedService.getChiTietSanPham();
    console.log("Sản phẩm khi bấm mua ngay", $scope.chiTietSanPham);
    console.log( $scope.chiTietSanPham.id);

    $scope.donHang = {
        hoTen: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        phuongThucThanhToan: "",
        sanPham: [
            {
                idSanPham: $scope.chiTietSanPham.id,
                soLuong: 1
            }
        ],
        trangThaiDonHang: "Đang chờ"
    };


    //Cần 1 biến  lưu trạng thái , nội dung validate
    $scope.validateForm = {
        trangThai: true, //true = form hop le
        noiDung: ""
    }

    //Liên kết biến với html
    //Sử dụng ng-model
    //Bắt sự kiện click button submit

    $scope.onClickSubmit = function () {
        console.log("Gọi hàm onClickSubmit() thành công");

        //Reset form
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        if ($scope.donHang.hoTen === "") {
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Họ tên là trường bắt buộc";
            return;
        }
        if ($scope.donHang.email === "") {
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Email là trường bắt buộc";
            return;
        }
        if ($scope.donHang.soDienThoai === "") {
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Số điện thoại là trường bắt buộc";
            return;
        }
        if ($scope.donHang.diaChi === "") {
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Địa chỉ là trường bắt buộc";
            return;
        }
        if ($scope.donHang.phuongThucThanhToan === "") {
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Phương thức thanh toán là trường bắt buộc";
            return;
        }
    
        //Call api để tạo mới dữ liệu
        $http({
            method: "POST",
            url: "http://localhost:3000/don-hang",
            data: $scope.donHang
        }).then(function (response) {
            console.log("Dữ liệu người dùng nhập và thông tin sản phẩm", response.data);

            alert("Đã đặt hàng thành công!");
            window.location.href = "#!/";


        });
    }
})