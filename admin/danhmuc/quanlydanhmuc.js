console.log("Đã kết nối file quanlydanhmuc.js thành công");

app.controller("quanLyDanhMucCtrl", function($scope, $http){
    console.log("Khai báo quanLyDanhMucCtrl thành công ");

    //Khai báo biến cần thiết
    $scope.danhSachDanhMuc = [];
    $scope.danhMucId = null;
    
    //Call api 
    $http({
        method: "GET",
        url: "http://localhost:3000/danh-muc",
    }).then(function(response){
        console.log("Log giá trị danh sách danh mục", response.data);
        $scope.danhSachDanhMuc = response.data

    })
    

    $scope.setDanhMucId = function(id){
        $scope.danhMucId = id;
    }
    
    $scope.onClickButtonXacNhanXoa = function(){
        $http({
            method: "DELETE",
            url: "http://localhost:3000/danh-muc/" + $scope.danhMucId,

        }).then(function(response){
            alert("Xóa thành công");
            window.location.href = "#!quan-ly-danh-muc";
        })
        
    }//Kết thúc hàm click xóa

})