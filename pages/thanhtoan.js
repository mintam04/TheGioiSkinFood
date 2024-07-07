console.log("Đã kết nối file thanhToan.js thành công");

app.controller("thanhToanCtrl", function($scope, $http, $routeParams){
    console.log("Khai báo thanhToanCtrl thành công ");
    console.log("Id user giỏ hàng", $routeParams);

    $scope.danhSachGioHang = [];
    $scope.danhSachSanPham = [];
    $scope.tongSoLuong = 0;
    $scope.tongGiaTriDonHang = 0;

    var completedRequests = 0;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/gio-hang/' + $routeParams.id,
    }).then(function (response) {
        $scope.danhSachGioHang = response.data;
        console.log("Danh sách giỏ hàng", $scope.danhSachGioHang);

        var danhSachSanPhamGioHang = [];
        $scope.danhSachGioHang.sanPham.forEach(function (spGioHang) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/san-pham/' + spGioHang.idSanPham
            }).then(function (response) {
                var sanPham = response.data;
                sanPham.soLuong = spGioHang.soLuong;
                danhSachSanPhamGioHang.push(sanPham);
                $scope.tongGiaTriDonHang += spGioHang.soLuong * sanPham.giaNiemYet;

                completedRequests++;

                // Kiểm tra xem tất cả các yêu cầu đã hoàn thành chưa
                if (completedRequests === $scope.danhSachGioHang.sanPham.length) {
                    console.log("Tổng giá trị đơn hàng: ", $scope.tongGiaTriDonHang);
                    $scope.danhSachGioHang.tongGiaTriDonHang = $scope.tongGiaTriDonHang;
                }
            });
            $scope.tongSoLuong += spGioHang.soLuong;
            $scope.danhSachGioHang.tongSoLuong = $scope.tongSoLuong;
        });

        console.log("Danh sách sản phẩm giỏ hàng", danhSachSanPhamGioHang);
        $scope.danhSachSanPham = danhSachSanPhamGioHang;
        console.log("Tổng số lượng đơn hàng:", $scope.danhSachGioHang.tongSoLuong);
        console.log("Danh sách giỏ hàng", $scope.danhSachGioHang);
    });


    //PosT don hang
    $scope.donHang = {
        hoTen: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        phuongThucThanhToan: "",
        sanPham: [
            {
                idSanPham: "",
                soLuong: ""
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
    var newGioHang = {
        id: $routeParams.id,
        sanPham: [],
        tongSoLuong: 0,
        tongGiaTriDonHang: 0 

    }
    $scope.onClickSubmit = function(){
        console.log("Gọi hàm onClickSubmit() thành công");
        console.log("Giá trị người dùng nhập: ", $scope.chiTietDonHang);

        //Reset form
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        if($scope.donHang.hoTen === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Họ tên là trường bắt buộc";
            return;
        }
        if($scope.donHang.email === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Email là trường bắt buộc";
            return;
        }
        if($scope.donHang.soDienThoai === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Số điện thoại là trường bắt buộc";
            return;
        }
        if($scope.donHang.diaChi === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Địa chỉ là trường bắt buộc";
            return;
        }
        if($scope.donHang.phuongThucThanhToan === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Phương thức thanh toán là trường bắt buộc";
            return;
        }
        $scope.donHang.sanPham = [];
        $scope.danhSachGioHang.sanPham.forEach(function (spGioHang) {
            $scope.donHang.sanPham.push({
                idSanPham: spGioHang.idSanPham,
                soLuong: spGioHang.soLuong
            });
        });

       
        //Call api để tạo mới dữ liệu
        $http({
            method: "POST",
            url: "http://localhost:3000/don-hang",
            data: $scope.donHang
        }).then(function (response) {
            console.log("Dữ liệu người dùng nhập và thông tin sản phẩm", response.data);
            $http({
                method: "PUT",
                url: "http://localhost:3000/gio-hang/" + $routeParams.id,
                data: newGioHang
            }).then(function (response) {
                console.log("Đã xóa giỏ hàng sau khi đặt hàng thành công");
                
                alert("Đã đặt hàng thành công!");
                window.location.href = "#!/";
            });
           
        });

    }//Kết thúc hàm onClick



})//Kết thúc controller