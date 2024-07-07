console.log("Đã kết nối file taoMoiSanPham.js thành công");

app.controller("taoMoiSanPhamCtrl", function($scope, $http){
    console.log("Khai báo taoMoiSanPhamCtrl thành công ");

    //Khai báo biến cần thiết
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
        console.log("Giá trị người dùng nhập: ", $scope.sanPham);

        //Reset form
        $scope.validateForm.trangThai = true;
        $scope.validateForm.noiDung = "";

        //Validate dữ liệu nhập
        if($scope.sanPham.id === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "ID là trường bắt buộc";
            return;
        }
        if($scope.sanPham.img === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Ảnh là trường bắt buộc";
            return;
        }
        if($scope.sanPham.tenSanPham === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Tên sản phẩm là trường bắt buộc";
            return;
        }
        if($scope.sanPham.giaBan === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Giá là trường bắt buộc";
            return;
        }
        if($scope.sanPham.giaNiemYet === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Giá khuyến mãi là trường bắt buộc";
            return;
        }
        if($scope.sanPham.thuongHieu === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Thương hiệu là trường bắt buộc";
            return;
        }
        if($scope.sanPham.tenDanhMuc === ""){
            $scope.validateForm.trangThai = false;
            $scope.validateForm.noiDung = "Tên danh mục là trường bắt buộc";
            return;
        }

       
        //Call api để tạo mới dữ liệu
        $http ({
            method: "POST",
            url: "http://localhost:3000/san-pham",
            data: $scope.sanPham
        }).then(function(response){
            alert("Tạo mới thành công");
            window.location.href = "#!quan-ly-san-pham";
            
        })

    }//Kết thúc hàm onClick
})