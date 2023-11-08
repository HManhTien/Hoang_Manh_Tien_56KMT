﻿$(document).ready(function () {

    var logined = false;
    const api = '/api.aspx';
    //Xử lý xong rồi
    function list_user() {
        $.confirm({
            title: "Danh sách tài khoản",
            content: `<div id="danh_sach_user">Loading....</div>`,
            columnClass: 'large',
            onContentReady: function () {
                //khi trang tải xong
                capnhat_list_user();
            }
        });
    };
    function capnhat_list_user() {
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
                        var suaxoa = `<button class="btn btn-sm btn-warning nut-sua-xoa" data-cid="${user.id}" data-action="US_edit">Sửa</button>`;
                        suaxoa += ` <button class="btn btn-sm btn-danger nut-sua-xoa" data-cid="${user.id}" data-action="US_Xoa">Xóa</button>`;
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
                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }
                $('#danh_sach_user').html(noidung);


                $('.nut-sua-xoa').click(function () {
                    var action = $(this).data('action');
                    var id = $(this).data('cid');
                    if (action == 'US_Xoa') {
                        //cần xác nhận xóa 
                        del_user(id, json);
                    } else if (action == 'US_edit') {
                        edit_user(id, json);
                    } else {
                        alert('Lỗi đâu rồi');
                    }

                });

            });
    };
    function del_user(id, json) {
        var user;
        for (var item of json.data) {
            if (item.id == id) {
                user = item;
                break;
            }
        }

        var dialog_xoauser = $.confirm({
            title: `Xác nhận xóa  ${user.hoten}`,
            content: `Xác nhận xóa nhé????`,
            buttons: {
                YES: {
                    action: function () {
                        var data_gui_di = {
                            action: 'US_Xoa',
                            id: id, //gửi đi id của cty cần xóa: api, sp sẽ làm phần còn lại
                        }
                        $.post(api, data_gui_di, function (data) {
                            //đợi data là json string text gửi về
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_xoauser.close();
                                capnhat_list_user();  //vẽ lại kq mới
                            } else {
                                alert(json.msg) // lỗi gì ở trên lo, ta cứ show ra thôi
                            }
                        })
                    }
                },
                NO: {

                }
            }
        })
    };
 function checkdangnhap() {
        if (!logined) {
            $.confirm({
                animateFromElement: false,
                typeAnimated: false,
                icon: 'fa fa-clipboard-check',
                title: 'Bạn chưa đăng nhập',
                content: 'Hãy đăng nhập để điều khiển',
                type: 'red',
                closeIcon: true,
                closeIconClass: 'fa fa-close',
                columnClass: 's',
                escapeKey: 'cancel',
                buttons: {
                    ok: {
                        text: '<i class="fa fa-circle-check"></i> Đăng nhập luôn',
                        btnClass: 'btn-blue',
                        keys: ['enter', 'n'],
                        action: function () {
                            form_dang_nhap(); 
                        }
                    },
                    cancel: {
                        text: '<i class="fa fa-circle-xmark"></i> Cancel',
                        keys: ['esc', 'c', 'C'],
                        btnClass: 'btn-red',
                    }
                }
            });
            return true;
        }
        return false;
    };





    
   
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
                                logined = true;
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
                            User_Name: $('#login-name').val(),
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


 




    $('#nut-login').click(function () {
        form_dang_nhap();
    });
    $('#text-xinchao').click(function () {
        list_user();
    });
    $('#nut-dangky').click(function () {
        form_dang_ky();
    });
    $('#nut-logout').click(function () {
        $('#text-xinchao').addClass("not-show");
        $('#nut-logout').addClass("not-show");
        $('#nut-login').removeClass("not-show");
        $('#nut-dangky').removeClass("not-show");
    });

    $('#nut-timkiem').click(function () {
        if (checkdangnhap()) return;
        
        
    });


});
