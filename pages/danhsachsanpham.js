console.log("Đã kết nối file danhSachSanPham.js thành công");

app.controller("danhSachSanPhamCtrl", function($scope, $http){
    console.log("Khai báo danhSachSanPhamCtrl thành công ");

    $scope.danhSachSanPham = [];
    
    //Call api 
    $http({
        method: "GET",
        url: "http://localhost:3000/san-pham",
        
    }).then(function(response){
        console.log("Log giá trị danh sách sản phẩm", response.data);
        $scope.danhSachSanPham = response.data

    })
    

    
})