console.log("Đã kết nối file timKiemSanPham.js thành công");

app.controller("timKiemSanPhamCtrl", function($scope, $http){
    console.log("Khai báo timKiemSanPhamCtrl thành công ");

    // Biến để lưu trữ kết quả tìm kiếm
    $scope.timKiem = [];

    // Hàm tìm kiếm sản phẩm
    $scope.onClickTimKiemSanPham = function() {
        // Kiểm tra nếu ô tìm kiếm trống thì không gửi yêu cầu
        if (!$scope.search || $scope.search.trim() === '') {
            alert("Chưa nhập sản phẩm cần tìm kiếm");
            return;
        }
        console.log("Giá trị nhập:", $scope.search);
        $http({
            method: "GET",
            url: "http://localhost:3000/san-pham",
            params: {
                tenSanPham: $scope.search
            }
        }).then(function(response) {
            // Kiểm tra nếu không có kết quả trả về
            if (response.data && response.data.length === 0) {
                alert('Không tìm thấy sản phẩm nào phù hợp.');
                $scope.timKiem = [];
            } else {
                // Gán kết quả tìm kiếm vào biến
                console.log("Giá trị tìm kiếm: ", response.data);
                $scope.timKiem = response.data;
            }
        }, function(error) {
            console.error('Đã xảy ra lỗi khi tìm kiếm sản phẩm:', error);
        });
    };
    
   
})