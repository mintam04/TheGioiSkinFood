console.log("Đã kết nối file chiTietSanPham.js thành công");

app.controller("chiTietSanPhamCtrl", function($scope, $http, $routeParams){
    console.log("Khai báo chiTietSanPhamCtrl thành công ");
    console.log("Giá trị params", $routeParams);

    $scope.danhSachDanhMuc = [];
     
    $scope.sanPham = {
        id: "",
        img: "",
        tenSanPham: "",
        giaBan: "",
        giaNiemYet: "",
        thuongHieu: "",
        tenDanhMuc: ""
    }

    //Call api 
    $http({
        method: "GET",
        url: "http://localhost:3000/danh-muc",
    }).then(function(response){
        console.log("Log giá trị danh sách danh mục", response.data);
        $scope.danhSachDanhMuc = response.data;
        if ($scope.danhSachDanhMuc.length > 0) {
            $scope.sanPham.tenDanhMuc = $scope.danhSachDanhMuc[0].tenDanhMuc;
        }

    })
   

    $http({
        method: "GET",
        url: "http://localhost:3000/san-pham/" + $routeParams.id,

    }).then(function(response){
        console.log("Log giá trị danh sách sản phẩm", response.data);
        $scope.sanPham = response.data

    })
    

})