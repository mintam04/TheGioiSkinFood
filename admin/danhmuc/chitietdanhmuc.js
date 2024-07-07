console.log("Đã kết nối file chiTietDanhMuc.js thành công");

app.controller("chiTietDanhMucCtrl", function($scope, $http, $routeParams){
    console.log("Khai báo chiTietDanhMucCtrl thành công ");
    console.log("Giá trị params", $routeParams);

    $scope.danhMuc = {
        id: "",
        tenDanhMuc: "",
    }
    
    //Call api 
    $http({
        method: "GET",
        url: "http://localhost:3000/danh-muc/" + $routeParams.id,
    }).then(function(response){
        console.log("Log giá trị danh sách danh mục", response.data);
        $scope.danhMuc = response.data

    })
})