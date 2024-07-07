console.log("Đã kết nối file chiTietSanPham.js thành công");

app.controller("chiTietSanPhamCtrl", function($scope, $http, $routeParams, SharedService){
    console.log("Khai báo chiTietSanPhamCtrl thành công ");
    console.log("Giá trị params", $routeParams);
    
    // Lấy giá trị của userId từ URL
    var urlParams = new URLSearchParams(window.location.search);
    $scope.userId = urlParams.get('userId');
    console.log("user id", $scope.userId);


    $scope.sanPham = {
        id: "",
        img: "",
        tenSanPham: "",
        giaBan: "",
        giaNiemYet: "",
        thuongHieu: "",
        tenDanhMuc: ""
    }
    
    $scope.danhSachGioHang = [];

    $http({
        method: "GET",
        url: "http://localhost:3000/san-pham/" + $routeParams.id,
    }).then(function(response){
        console.log("Log giá trị sản phẩm", response.data);
        $scope.sanPham = response.data

    })
    
    $http({
        method: "GET",
        url: "http://localhost:3000/gio-hang/" + $scope.userId,
    }).then(function(response){
        console.log("Log giá trị giỏ hàng", response.data);
        $scope.danhSachGioHang = response.data
    })

    $scope.themVaoGioHang = function() {       
        var timKiemSanPhamGioHang = $scope.danhSachGioHang.sanPham.find(function(item) {
            return item.idSanPham === $routeParams.id;
        });
        
        console.log("Kết quả tìm kiếm sản phẩm trong giỏ hàng:", timKiemSanPhamGioHang);
        if (timKiemSanPhamGioHang) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
            timKiemSanPhamGioHang.soLuong++;
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
            var newCartItem = {
                idSanPham: $scope.sanPham.id,
                soLuong: 1
            };
            $scope.danhSachGioHang.sanPham.push(newCartItem);
            console.log("Sản phẩm đã được thêm vào giỏ hàng.");
        }
    
        // Tính tổng số lượng sản phẩm trong giỏ hàng
        $scope.danhSachGioHang.tongSoLuong = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
            return total + item.soLuong;
        }, 0);
        
        $scope.danhSachGioHang.tongGiaTriDonHang = $scope.danhSachGioHang.sanPham.reduce(function(total, item) {
            return total + (item.soLuong * item.giaNiemYet); 
        }, 0);
    
        // Cập nhật giỏ hàng trong cơ sở dữ liệu
        updateCart();
    };

    function updateCart() {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/gio-hang/' + $scope.userId,
            data: $scope.danhSachGioHang
        }).then(function (response) {
            alert("Thêm vào giỏ hàng thành công!")
        });
    }

    $scope.muaNgay = function() {       
        SharedService.setChiTietSanPham($scope.sanPham);
        // Chuyển hướng sang trang xác nhận đơn hàng
        window.location.href = '#!xac-nhan-don-hang';
    };



})//Kết thúc

