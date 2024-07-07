console.log("Đã kết nối file quanLySanPham.js thành công");

app.controller("quanLySanPhamCtrl", function($scope, $http){
    console.log("Khai báo quanLySanPhamCtrl thành công ");

    $scope.danhSachSanPham = [];
    $scope.sanPhamId = null;
    
    //Call api 
    $http({
        method: "GET",
        url: "http://localhost:3000/san-pham",
    }).then(function(response){
        console.log("Log giá trị danh sách sản phẩm", response.data);
        $scope.danhSachSanPham = response.data

    })
    

    $scope.setSanPhamId = function(id){
        $scope.sanPhamId = id;
    }
    
    $scope.onClickButtonXacNhanXoa = function(){
        $http({
            method: "DELETE",
            url: "http://localhost:3000/san-pham/" + $scope.sanPhamId,

        }).then(function(response){
            alert("Xóa thành công");
            window.location.href = "#!quan-ly-san-pham";
        })
        
    }//Kết thúc hàm click xóa
})