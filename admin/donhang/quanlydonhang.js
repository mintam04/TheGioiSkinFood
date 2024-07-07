console.log("Đã kết nối file quanLyDonHang.js thành công");

app.controller("quanLyDonHangCtrl", function ($scope, $http) {
    console.log("Khai báo quanLyDonHangCtrl thành công ");

    // Khai báo biến cần thiết
    $scope.donHangId = null;
    $scope.danhSachDonHang = [];
    $scope.danhSachSanPham = [];
    $scope.tongSoLuong = 0;
    $scope.tongGiaTriDonHang = 0;

    var completedRequests = 0;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/don-hang',
    }).then(function (response) {
        $scope.danhSachDonHang = response.data;
        console.log("Danh sách đơn hàng", $scope.danhSachDonHang);

        var totalRequests = 0;

        $scope.danhSachDonHang.forEach(function (donHang) {
            totalRequests += donHang.sanPham.length; 
            var tongGiaTriDonHang = 0; 

            donHang.sanPham.forEach(function (spDonHang) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/san-pham/' + spDonHang.idSanPham
                }).then(function (response) {
                    var sanPham = response.data;
                    sanPham.soLuong = spDonHang.soLuong;
                    $scope.danhSachSanPham.push({
                        donHangId: donHang.id,
                        sanPham: sanPham
                    });
                    tongGiaTriDonHang += sanPham.soLuong * sanPham.giaBan; 

                    completedRequests++; 

                    if (completedRequests === totalRequests) {
                        console.log("Tổng giá trị của mỗi đơn hàng:");
                        $scope.danhSachDonHang.forEach(function (donHang) {
                            var tongGiaTri = 0;
                            donHang.sanPham.forEach(function (spDonHang) {
                                var sanPham = $scope.danhSachSanPham.find(item => item.donHangId === donHang.id && item.sanPham.id === spDonHang.idSanPham);
                                tongGiaTri += sanPham.sanPham.soLuong * sanPham.sanPham.giaNiemYet;
                            });
                            donHang.tongGiaTri = tongGiaTri;
                            console.log("Đơn hàng ID:", donHang.id, "- Tổng giá trị:", donHang.tongGiaTri);
                        });
                    }
                });
            });
        });
        console.log("Danh sách sản phẩm trong giỏ hàng", $scope.danhSachSanPham);
    });

    $scope.setDonHangId = function (id) {
        $scope.donHangId = id;
    }

    $scope.onClickButtonXacNhanXoa = function () {
        $http({
            method: "DELETE",
            url: "http://localhost:3000/don-hang/" + $scope.donHangId,

        }).then(function (response) {
            alert("Xóa thành công");
            window.location.href = "#!quan-ly-don-hang";
        })

    }// Kết thúc hàm click xóa
});
