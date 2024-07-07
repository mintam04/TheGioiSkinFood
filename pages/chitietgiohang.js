console.log("Đã kết nối file chiTietGioHang.js thành công");

app.controller("chiTietGioHangCtrl", function ($scope, $http, $routeParams) {
    console.log("Khai báo chiTietGioHangCtrl thành công ");
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

    $scope.tangSoLuong = function (productId) {
        var cartItem = $scope.danhSachGioHang.sanPham.find(function (item) {
            return item.idSanPham === productId;
            
        });

        if (cartItem) {
            cartItem.soLuong++;
            $scope.danhSachGioHang.tongSoLuong = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
                return total + item.soLuong;
            }, 0);
            
            $scope.danhSachGioHang.tongGiaTriDonHang = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
                return total + (item.soLuong * item.giaNiemYet); // Giả sử mỗi sản phẩm có trường 'gia'
            }, 0);

            $http({
                method: 'PUT',
                url: 'http://localhost:3000/gio-hang/' + $routeParams.id,
                data: $scope.danhSachGioHang
            }).then(function (response) {
                alert("Tăng số lượng sản phẩm thành công!");
            }).catch(function (error) {
                console.error("Đã xảy ra lỗi khi cập nhật giỏ hàng:", error);
            });
        } else {
            console.error("Không tìm thấy sản phẩm trong giỏ hàng");
        }
    };


    $scope.giamSoLuong = function (productId) {
        var cartItem = $scope.danhSachGioHang.sanPham.find(function (item) {
            return item.idSanPham === productId;
        });

        if (cartItem && cartItem.soLuong > 1) {
            cartItem.soLuong--;
            $scope.danhSachGioHang.tongSoLuong = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
                return total + item.soLuong;
            }, 0);
            
            $scope.danhSachGioHang.tongGiaTriDonHang = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
                return total + (item.soLuong * item.giaNiemYet); 
            }, 0);
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/gio-hang/' + $routeParams.id,
                data: $scope.danhSachGioHang
            }).then(function (response) {
                alert("Giảm số lượng sản phẩm thành công!");
            }).catch(function (error) {
                console.error("Đã xảy ra lỗi khi cập nhật giỏ hàng:", error);
            });
        } else {
            alert("Không thể giảm số lượng sản phẩm nữa!!!");
        }
    };

    $scope.sanPhamId = null;
    $scope.setSanPhamId = function(idSanPham){
        $scope.sanPhamId = idSanPham;
    }
    $scope.onClickButtonXacNhanXoa = function () {
        var cartItemIndex = $scope.danhSachGioHang.sanPham.findIndex(function (item) {
            return item.idSanPham === $scope.sanPhamId;
        });
    
        if (cartItemIndex !== -1) {
            // Xóa sản phẩm khỏi danh sách giỏ hàng
            $scope.danhSachGioHang.sanPham.splice(cartItemIndex, 1);
            $scope.danhSachGioHang.tongSoLuong = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
                return total + item.soLuong;
            }, 0);
            
            $scope.danhSachGioHang.tongGiaTriDonHang = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
                return total + (item.soLuong * item.giaNiemYet); 
            }, 0);
    
            $http({
                method: 'PUT',
                url: 'http://localhost:3000/gio-hang/' + $routeParams.id,
                data: $scope.danhSachGioHang
            }).then(function (response) {
                alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
            }).catch(function (error) {
                console.error("Đã xảy ra lỗi khi cập nhật giỏ hàng:", error);
            });
        } else {
            alert("Không tìm thấy sản phẩm trong giỏ hàng!");
        }
    };
    
   


});
