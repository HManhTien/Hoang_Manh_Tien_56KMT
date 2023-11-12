$(document).ready(function () {
   
    var logined = false;
    var admin_login = false;
    const api = '/api.aspx';
    var json_edit;
    trang_chu_lv();
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
    function add_class_not_show() {
        $('.data-trang-chu').addClass("not-show");
        $('.data-hoa-don-dat-hang').addClass("not-show");
        $('.data-lich-su-don-hang').addClass("not-show");
        $('.data-phan-hoi').addClass("not-show");
    }

    $('#nut-logout').click(function () {
        $('#text-xinchao').addClass("not-show");
        $('#nut-logout').addClass("not-show");
        $('#nut-login').removeClass("not-show");
        $('#nut-dangky').removeClass("not-show");
        add_class_not_show();
        admin_login = false;
        logined = false;
    });
    //Xử lý xong rồi

    //////////////////
    //Bấm nút đăng ký 
    $('#nut-dangky').click(function () {
        form_dang_ky();
    });
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
                <label for="create-name">UserName :</label><br>
                <input type="text" id="tao-name" placeholder="Your  user name" required>
            </div>
            <div class="form-group">
                <label for="create-name">Họ và Tên :</label><br>
                <input type="text" id="tao-ten" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="create-pw">Mật khẩu :</label><br>
                <input type="text" id="tao-pw" placeholder="Your password" required>
            </div>                   
             <div class="form-group">
                <label for="create-pw">Số Điện Thoại:</label><br>
                <input type="text" id="tao-SDT" placeholder="nhập số điện thoại" required>
            </div> 
             `

        var dialog_dangky = $.confirm({
            title: 'Đăng ký tài khoản!',
            content: content,
            icon: 'fa fa-key',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_add',
                            User_Name: $('#tao-name').val(),
                            hoten: $('#tao-ten').val(),
                            pw: $('#tao-pw').val(),
                            SDT: $('#tao-SDT').val()
                        }

                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_dangky.close();
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

    ///////////////////
    // bấm nút đăng nhập
    $('#nut-login').click(function () {
        form_dang_nhap();
    });
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
                            json_edit = data;
                           
                            if (json.ok) {
                                if (json.NAME === 'ADMIN') {
                                    alert('vao day ko?')
                                    admin_login = true;
                                } else
                                    dialog_dangnhap.close();
                                logined = true;
                                $('#nut-login').addClass("not-show");
                                $('#nut-dangky').addClass("not-show");
                                $('#text-xinchao').removeClass("not-show");
                                $('#nut-logout').removeClass("not-show");

                                if (admin_login === true) {

                                    $('.btn-xinchao').html("Xin chao <b>ADMIN</b>");
                                } else {
                                    $('.btn-xinchao').html("Xin chào");
                                }
                                
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

    // Bấm nút xin chào 
    $('#text-xinchao').click(function() {
        if (admin_login === true) {
            // Nếu là admin thì hiện danh sách tài khoản mật khẩu;
            list_user();
        } else {
            alert([json_edit]);
            var me = JSON.parse(json_edit).html();
           
            
            //Người bình thường chỉ hiện thông tin cá nhân
            var content =
                `
                    Thông Tin cá nhân:
                   <table> <tbody><tr><td>${me.TEN}</td></tr></tbody> </table>
                 `

                    $.confirm({
                        title: "",
                        columnClass: 'large',
                        content: content,
                        buttons: {

                            cancel: {},
                        },
                    })
        }
 });

    //admin đăng nhập 
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
    function edit_user(id, json) {
        var user;
        for (var item of json.data) {
            if (item.id == id) {
                user = item;
                break;
            }
        }

        var content =
            `     
             <style>
                  input {
                     border: 1px solid #ccc;
                     border-radius: 5px;
                          }       
             </style>
             <div class="form-group">
                <label for="create-name">UserName :</label><br>
                <input type="text" id="tao-name" value="${user.username}"  required>
            </div>
            <div class="form-group">
                <label for="create-name">Họ và Tên :</label><br>
                <input type="text" id="tao-ten" value="${user.hoten}" required>
            </div>                            
             <div class="form-group">
                <label for="create-pw">Số Điện Thoại:</label><br>
                <input type="text" id="tao-SDT" value="${user.SDT}" required>
            </div> 
             `
        var dialog_edit = $.confirm({
            title: 'Đăng ký tài khoản!',
            content: content,
            icon: 'fa fa-key',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_edit',
                            id: id,
                            User_Name: $('#tao-name').val(),
                            hoten: $('#tao-ten').val(),
                            SDT: $('#tao-SDT').val()
                        }

                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                capnhat_list_user();
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


    //khách hàng đăng nhập vào
    $('.btn-trangchu').click(function () {
        add_class_not_show();
        $('.btn-trangchu').removeClass("not-show");

        trang_chu_lv();
    });
    function form_muahang(mabanh, data) {
        var banh;
        var json = JSON.parse(data);
        for (var item of json.data) {
            if (item.MaBanh == mabanh) {
                banh = item;
                break;
            }
        }

        alert([data]);
        var content =
            `     
             <pre>
                Chào Quý Khách hàng

        Chúng tôi xin chân thành cảm ơn sự tin tưởng và lựa chọn của 
        Quý khách hàng tại Bánh kem PEW PEW.

        Chúng tôi xác nhận rằng đơn hàng của bạn đã được nhận và đang được 
        xử lý .Dưới đây là một số thông tin chi tiết về đơn hàng của bạn:

                 Thông Tin Đơn Hàng:

                     Mã Đơn Hàng: #DH20231111
                     Ngày Đặt Hàng: 11/11/2023

                     1. Tên Sản Phẩm : Bánh 
                        Số lượng: 2
                        Giá: [Giá sản phẩm 1]
                        Người Nhận:
                        Địa Chỉ Giao Hàng:

        Chân thành cảm ơn,
        Bánh kem PEW PEW
        Đội Ngũ Hỗ Trợ Khách Hàng
        </pre>
             `


        var dialog_edit = $.confirm({
            title: '<b> Xác Nhận Đơn Hàng </b>',
            content: content,
            columnClass: 'large',

            buttons: {
                formSubmit: {
                    text: 'Đặt hàng',
                    btnClass: 'btn-primary',


                    action: function () {
                        var data_gui_di = {
                            action: 'Muahang',
                            mabanh: mabanh,
                            mahoadon: $('#tao-name').val(),


                        }

                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                capnhat_list_user();
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
    function trang_chu_lv() {
        $.post(api,
            {
                action: 'CH_list_banh'
            },
            function (data) {
                var json = JSON.parse(data);

                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover" > `;
                    noidung +=
                        `
            <thead>
                <tr>
                 
                </tr>
            </thead> <tbody>

            `
                    var stt = 0;
                    for (var banh of json.data) {

                        var muahang = `<button class="btn btn-sm btn-primary nut-mua-ngay" data-cid="${banh.MaBanh}"">Mua ngay</button>`;
                        noidung +=
                            `
            <tr>
                <td>${++stt}</td>     
                <td>${banh.TEN}</td>
                <td> <img src="${banh.ANH}" style="width : 100px;" /></td>
                <td>${banh.GIA}</td>
                <td>${muahang}</td>
            </tr>
           
            `
                    }
                    noidung += " </tbody> </table>";
                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }
                $('.data-table-trang-chu').html(noidung);


                $('.nut-mua-ngay').click(function () {
                    var mabanh = $(this).data('cid');
                    form_muahang(mabanh, data);
                });

            });
    }



    $('.btn-dondathang').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.data-hoa-don-dat-hang').removeClass("not-show");
        $.post(api,
            {
                action: 'CH_list_hoa_don'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " style="width: 70%; margin:auto"> `;
                    noidung +=
                        `
            <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Hóa Đơn</th>
                  <th>Mã Khách Hàng</th>
                  <th>Tổng Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Ngày mua</th>
                  <th>Thay đổi</th>
                </tr>
            </thead> <tbody>

            `
                    var stt = 0;
                    for (var hoadon of json.data) {

                        var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" data-cid="${hoadon.MaHD}">Xem chi tiết </button>`;
                        noidung +=
                            `
            <tr>
                <td>${++stt}</td>
                <td>${hoadon.MaHD}</td>
                <td>${hoadon.MaKH}</td>
                <td>${hoadon.Tien}</td>
                <td>${hoadon.TT}</td>
                 <td>${hoadon.NGAY}</td>
                <td>${thaydoi}</td>
            </tr>
           
            `
                    }
                    noidung += " </tbody> </table>";
                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }
                $('.data-hoa-don-dat-hang').html(noidung);


                $('.nut-thay-doi').click(function () {
                    var mahoadon = $(this).data('cid');
                    chitiethoadon(mahoadon, json);
                });

            });



    });
    function chitiethoadon(mahoadon, json) {
        var content =
            `<pre>
        Chào Quý Khách hàng

          Chúng tôi xin chân thành cảm ơn sự tin tưởng và lựa chọn của 
          Quý khách hàng tại Bánh kem PEW PEW.

          Chúng tôi xác nhận rằng đơn hàng của bạn đã được nhận và đang được 
          xử lý .Dưới đây là một số thông tin chi tiết về đơn hàng của bạn:

         Thông Tin Đơn Hàng:

             Mã Đơn Hàng: #DH20231111
             Ngày Đặt Hàng: 11/11/2023

             1. Tên Sản Phẩm : Bánh 
                Số lượng: 2
                Giá: [Giá sản phẩm 1]
                Người Nhận:
                Địa Chỉ Giao Hàng:

          Chân thành cảm ơn,
          Bánh kem PEW PEW
          Đội Ngũ Hỗ Trợ Khách Hàng
        </pre>`

        var dialog_dangnhap = $.confirm({
            title :"",
            columnClass: 'large',
            content: content,
            buttons: {
                cancel: {},
            },
        });
 
}
      
});