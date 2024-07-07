console.log("Đã kết nối file chinhSuaDanhMuc.js thành công");

app.controller("chinhSuaDanhMucCtrl", function($scope, $http, $routeParams){
    console.log("Khai báo chinhSuaDanhMucCtrl thành công ");
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

    $scope.validateForm = {
        trangThai: true, //true = form hop le
        noiDung: ""
    }

    //Liên kết biến với html
    //Sử dụng ng-model
    //Bắt sự kiện click button submit
    $scope.onClickSubmit = function(){
        console.log("Gọi hàm onClickSubmit() thành công");
        console.log("Giá trị người dùng nhập: ", $scope.danhMuc);

        //Reset form
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        if($scope.danhMuc.id === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "ID là trường bắt buộc";
            return;
        }
        if($scope.danhMuc.tenDanhMuc === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Tên Danh Mục là trường bắt buộc";
            return;
        }

       
        //Call api để tạo mới dữ liệu
        $http ({
            method: "PUT",
            url: "http://localhost:3000/danh-muc/" + $routeParams.id,
            data: $scope.danhMuc
        }).then(function(response){
            alert("Chỉnh sửa thành công");
            window.location.href = "#!quan-ly-danh-muc";
            
        })

    }//Kết thúc hàm onClick



})