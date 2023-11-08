$(document).ready(function () {

    const api = '/api.aspx';

    function form_dang_nhap() {
        var content =
            `     
             <style>
                  input {
                     border: 1px solid #ccc;
                     border-radius: 5px;
                          }       
             </style>
             <div class="form-group">
                <label for="create-name">Name :</label><br>
                <input type="text" id="login-name" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="create-pw">Mật khẩu :</label><br>
                <input type="text" id="login-pw" placeholder="Your password" required>
            </div>                 
             `
        var dialog_dangnhap = $.confirm({
            title: 'Đăng Nhập!',
            content: content,
            buttons: {
                formSubmit: {
                    text: 'Đăng Nhập',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_login',
                            User_Name: $('#login-name').val(),
                            pw: $('#login-pw').val()
                        }

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);                          
                            if (json.ok) {
                                dialog_dangnhap.close();
                                                                                  
                                $('#nut-login').addClass("not-show");
                                $('#nut-dangky').addClass("not-show");
                                $('#text-xinchao').removeClass("not-show");
                                $('#nut-logout').removeClass("not-show");
                                $('.btn-xinchao').html("Xin chao <b>đùa</b>");
                            } else {
                                alert(json.msg)
                            }
                        })

                    }
                },
                cancel: {},
            },
        });
    }

    function form_dang_ky() {
        var content =
            `     
             <style>
                  input {
                     border: 1px solid #ccc;
                     border-radius: 5px;
                          }       
             </style>
             <div class="form-group">
                <label for="create-name">Name :</label><br>
                <input type="text" id="login-name" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="create-pw">Mật khẩu :</label><br>
                <input type="text" id="login-pw" placeholder="Your password" required>
            </div> 
            <div class="form-group">
                <label for="create-pw">Xác nhận mật khẩu:</label><br>
                <input type="text" id="login-pw2" placeholder="Your password" required>
            </div> 
            <div class="form-group">
                <label for="create-pw">Email:</label><br>
                <input type="text" id="login-email" placeholder="Your password" required>
            </div> 
             <div class="form-group">
                <label for="create-pw">Số Điện Thoại:</label><br>
                <input type="text" id="login-SDT" placeholder="Your password" required>
            </div> 
             `

        var dialog_dangnhap = $.confirm({
            title: 'Đăng ký tài khoản!',
            content: content,
            icon: 'fa fa-key',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_login',
                            User_Name : $('#login-name').val(),
                            pw: $('#login-pw').val()
                        }

                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            console.log(data);
                            if (json.ok) {
                                dialog_dangnhap.close();                           
                            } else {
                                alert(json.msg)
                            }
                        })

                    }
                },
                cancel: {},
            },
        });
    };

    function list_user() {
        $.confirm({
            title: "Danh sách tài khoản",
            content: `<div id="danh_sach_user">Loading....</div>`,
            columnClass: 'large',
            onContentReady: function () {
                //khi trang tải xong
                $.post(api,
                    {
                        action: 'US_LIST'
                    },
                    function (data) {
                        var json = JSON.parse(data);
                        var noidung = "";
                        if (json.ok) {
                            noidung += `<table class="table table-hover"> `;
                            noidung += 
                            `
                            <thead>
                                <tr>
                                  <th>STT</th>
                                  <th>ID</th>
                                  <th>US_Name</th>
                                  <th>Họ và Tên</th>
                                  <th>SDT</th>
                                  <th>Sửa/Xóa</th>
                                </tr>
                            </thead> <tbody>

                            `
                            var stt = 0;
                            for (var user of json.data) {
                                var suaxoa =
                                    `
                                        <button class="btn btn-warning">Sửa</button>
                                        <button class="btn btn-danger">Xoa</button>
                                    `;
                                noidung += 
                            `
                            <tr>
                                <td>${++stt}</td>
                                <td>${user.id}</td>
                                <td>${user.username}</td>
                                <td>${user.hoten}</td>
                                <td>${user.SDT}</td>
                                <td>${suaxoa}</td>
                            </tr>
                           
                            `
                            }
                            noidung += " </tbody> </table>";
                        } else
                        {
                            noidung = "Không có dữ liệu nhé !!";
                        }
                        $('#danh_sach_user').html(noidung);

                });
            }
        });
    };
    $('#nut-login').click(function () { 
        form_dang_nhap();
    }); 

    $('#text-xinchao').click(function () {
        list_user();
    });
    $('#nut-dangky').click(function () {
        form_dang_ky();
    });
   

});
