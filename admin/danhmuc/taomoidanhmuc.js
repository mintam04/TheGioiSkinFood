console.log("Đã kết nối file taoMoiDanhMuc.js thành công");

app.controller("taoMoiDanhMucCtrl", function($scope, $http){
    console.log("Khai báo taoMoiDanhMucCtrl thành công ");

    $scope.danhMuc = {
        id: "",
        tenDanhMuc: "",
    }
    //Cần 1 biến  lưu trạng thái , nội dung validate
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
            method: "POST",
            url: "http://localhost:3000/danh-muc",
            data: $scope.danhMuc
        }).then(function(response){
            alert("Tạo mới thành công");
            window.location.href = "#!quan-ly-danh-muc";
            
        })

    }//Kết thúc hàm onClick
})