console.log("Đã kết nối file chinhSuaDonHang.js thành công");

app.controller("chinhSuaDonHangCtrl", function ($scope, $http, $routeParams) {
    console.log("Khai báo chinhSuaDonHangCtrl thành công ");
    console.log("Giá trị params", $routeParams);

    //Khai báo biến cần thiết
    $scope.chiTietDonHang = {
        id: "",
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
        trangThaiDonHang: ""
    };

    $scope.danhSachTongHopSanPham = []; // Biến để lưu trữ danh sách tổng hợp sản phẩm
    $scope.donHangId = null;

    //Call API để lấy danh sách đơn hàng
    $http({
        method: "GET",
        url: "http://localhost:3000/don-hang/" + $routeParams.id,
    }).then(function (response) {
        console.log("Log giá trị danh sách đơn hàng", response.data);
        $scope.chiTietDonHang = response.data;

        var totalRequests = 0;
        var completedRequests = 0;

        $scope.chiTietDonHang.sanPham.forEach(function (spDonHang) {
            totalRequests++; // Tăng tổng số yêu cầu

            $http({
                method: 'GET',
                url: 'http://localhost:3000/san-pham/' + spDonHang.idSanPham
            }).then(function (response) {
                var sanPham = response.data;
                sanPham.soLuong = spDonHang.soLuong;
                $scope.danhSachTongHopSanPham.push(sanPham);

                completedRequests++; // Đã hoàn thành một yêu cầu

                // Nếu đã hoàn thành tất cả các yêu cầu, log tổng giá trị đơn hàng
                if (completedRequests === totalRequests) {
                    $scope.tongGiaTri = $scope.danhSachTongHopSanPham.reduce(function (total, sp) {
                        return total + (sp.soLuong * sp.giaNiemYet);
                    }, 0);
                    console.log("Tổng giá trị đơn hàng: ", $scope.tongGiaTri);
                }
            });
        });
    });
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
        console.log("Giá trị người dùng nhập: ", $scope.chiTietDonHang);

        //Reset form
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        if ($scope.chiTietDonHang.trangThaiDonHang === "") {
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Trạng thái đơn hàng là trường bắt buộc";
            return;
        }


        //Call api để tạo mới dữ liệu
        $http({
            method: "PUT",
            url: "http://localhost:3000/don-hang/" + $routeParams.id,
            data: $scope.chiTietDonHang
        }).then(function (response) {
            alert("Chỉnh sửa thành công");
            window.location.href = "#!quan-ly-don-hang";

        })

    }//Kết thúc hàm onClick
})