﻿$(document).ready(function () {
    const api = '/api.aspx';

    var KH_ID;
    var KH_USER_NAME;
    var KH_HO_DEM;
    var KH_TEN;
    var KH_DIA_CHI;
    var KH_SDT;

    var logined = false;
    var admin_login = false;
    var check_dung_chat = false;
    var action_bandau = {
        action: 'CH_LIST_BANH'
    }

    login_ck();
    Neu_khachhang_dang_nhap();
    trang_chu_lv(action_bandau);

    function getdate() {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        var year = currentDate.getFullYear();

        return ('' + day + '/' + month + '/' + year);
    }

     
    function login_ck() {
        var data_gui_di = {
            action: 'US_login_ck',
        }
        var id = get_store('id');
        var ck = get_store('ck');
        if (id != null && ck != null) {
            $.post(api, data_gui_di, function (data) {
                login(data);
            });
        } else {
            return;
        }
    };
    function login(data) {
        var json = JSON.parse(data);
        if (json.ok == 1) {


            for (var user of json.data) {

                noi_dung_nut_xin_chao = `Xin Chào<b> ${user.TEN} </b>`
                setCookie('id', user.ID, 365);
                setCookie('ck', user.COOKIE, 365);

                if (user.NAME === 'ADMIN') {
                    admin_login = true;
                    $('.btn-xinchao').html("Xin chao <b>ADMIN</b>");
                    Neu_admin_dang_nhap();
                } else {
                    KH_ID = user.ID;
                    KH_USER_NAME = user.USERNAME;
                    KH_HO_DEM = user.HODEM;
                    KH_TEN = user.TEN;
                    KH_DIA_CHI = user.DIACHI;
                    KH_SDT = user.SDT
                    $('.btn-xinchao').html(noi_dung_nut_xin_chao);
                    Neu_khachhang_dang_nhap();
                }
            }

            logined = true;
            $('#nut-login').addClass("not-show");
            $('#nut-dangky').addClass("not-show");
            $('#text-xinchao').removeClass("not-show");
            $('#nut-logout').removeClass("not-show");


        } else {
            alert(json.msg)
        }
    }
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
        $('.du-lieu-lam-viec').addClass("not-show");
        $('.du-lieu-lam-viec2').addClass("not-show");
        $('.nut-in-doanh-thu').addClass("not-show");

    }
    function Neu_khachhang_dang_nhap() {
        $('.btn-nguyenlieu').addClass("not-show");
        $('.btn-dondathang-admin').addClass("not-show");
        $('.btn-doanhthu').addClass("not-show");
        $('.btn-bieudo').addClass("not-show");

        $('.btn-trangchu').removeClass("not-show");
        $('.btn-dondathang').removeClass("not-show");
        $('.btn-lichsumua').removeClass("not-show");
        $('.btn-phanhoi').removeClass("not-show");
    }
    function Neu_admin_dang_nhap() {
        $('.btn-trangchu').addClass("not-show");
        $('.btn-dondathang').addClass("not-show");
        $('.btn-lichsumua').addClass("not-show");
        $('.btn-phanhoi').addClass("not-show");

        $('.btn-nguyenlieu').removeClass("not-show");
        $('.btn-dondathang-admin').removeClass("not-show");
        $('.btn-doanhthu').removeClass("not-show");
        $('.btn-bieudo').removeClass("not-show");
        add_class_not_show();
    }

    $('#nut-logout').click(function () {
        $('#text-xinchao').addClass("not-show");
        $('#nut-logout').addClass("not-show");
        $('#nut-login').removeClass("not-show");
        $('#nut-dangky').removeClass("not-show");
        add_class_not_show();
        admin_login = false;
        logined = false;
        $('.du-lieu-lam-viec').removeClass("not-show");
        trang_chu_lv(action_bandau);
        setCookie('ck_login', null, 365);
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
             
    <pre>
    USER NAME  : <input type="text" id="tao-name" placeholder="nhập user name" required>    
    HỌ ĐỆM     : <input type="text" id="tao-hodem" placeholder="nhập họ đệm" required>
    TÊN        : <input type="text" id="tao-ten" placeholder="nhập tên " required>
    PW         : <input type="text" id="tao-pw" placeholder=" nhập mật khẩu " required>
    XÁC NHẬN PW: <input type="text" id="tao-pw2" placeholder=" xác nhận mật khẩu " required>
    ĐỊA CHỈ    : <input type="text" id="tao-diachi" placeholder=" nhập địa chỉ " required>
    SDT        : <input type="text" id="tao-sdt" placeholder=" nhập số điện thoại " required>
    </pre>
             `

        var dialog_dangky = $.confirm({
            title: 'Đăng ký tài khoản!',
            content: content,
            columnClass: 'medium',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_add',
                            User_Name: $('#tao-name').val(),
                            hodem: $('#tao-hodem').val(),
                            ten: $('#tao-ten').val(),
                            pw: $('#tao-pw').val(),
                            pw2: $('#tao-pw').val(),
                            diachi: $('#tao-diachi').val(),
                            SDT: $('#tao-sdt').val()
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
                   .form-group{
                       margin:auto inherit;
                   }
             </style>
             <div class="form-group">
                <label for="create-name">Name :</label><br>
                <input type="text"  id="login-name" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="create-pw">Mật khẩu :</label><br>
                <input type="password" id="login-pw" placeholder="Your password" required>   
                <b> <p id="message11"></p></b>
            </div>                 
             `

        $.confirm({
            title: 'Đăng Nhập!',
            content: content,
            buttons: {
                formSubmit: {
                    text: 'Đăng Nhập',
                    btnClass: 'btn-primary',
                    keys: ['enter', 'enter'],
                    action: function () {
                        var data_gui_di = {
                            action: 'US_login',
                            User_Name: $('#login-name').val(),
                            pw: $('#login-pw').val()
                        }
                        data_luu_giu = {
                            action: 'US_login',
                            User_Name: $('#login-name').val(),
                            pw: $('#login-pw').val()
                        }
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data)
                            if (json.ok == 1) {
                                login(data);
                            } else {
                                $('#message11').html('Sai thông  tin đăng nhập');
                                return false;
                            }

                        })
                    }
                },
                cancel: {},

            },
        });
    };


    $('#text-xinchao').click(function () {
        if (admin_login === true) {
            // Nếu là admin thì hiện danh sách tài khoản mật khẩu;
            list_user();
        } else {
            $.confirm({
                title: "Thông tin cá nhân",
                content: `<div id="danh_sach_user">Loading....</div>`,
                columnClass: 'small',
                buttons: {
                    formSubmit: {
                        text: 'Change PW',
                        btnClass: 'btn-primary',
                        action: function () {
                            do_change_pw();
                        }
                    },
                    EDIT: {
                        text: 'EDIT',
                        btnClass: 'btn-warning',
                        action: function () {
                            edit_thong_tin_ca_nhan();
                        }
                    },
                    CANCEL: {},
                },
                onContentReady: function () {
                    thong_tin_ca_nhan();

                }
            });
        }
    });
    function thong_tin_ca_nhan() {
        var noidung =
            `<pre>
         USER NAME : ${KH_USER_NAME}
         TÊN       : ${KH_HO_DEM + " " + KH_TEN}
         ĐỊA CHỈ   : ${KH_DIA_CHI}
         SDT       : ${KH_SDT}
         </pre>`

        $('#danh_sach_user').html(noidung);

    }
    function do_change_pw() {
        $.confirm({
            title: 'ĐỔI MẬT KHẨU CÁC CHẾ ƠI !!!',
            content:
                `
                <pre>
            1. Mật khẩu Cũ:
                <input type="password"  id="pw" placeholder="Vui lòng nhập" required>
            2. Mật khẩu Mới:
                <input type="password"  id="pw_new" placeholder="Vui lòng nhập" required>               
            3. Xác Nhận Mật khẩu:
                <input type="password"  id="pw_newxn" placeholder="Vui lòng nhập" required>
            <b> <p id="message"></p></b>
                </pre>
                `,
            buttons: {
                SAVE: {
                    btnClass: 'btn-warning',

                    action: function () {
                        var newpw = $('#pw_new').val();
                        var newpwxn = $('#pw_newxn').val();
                        var pw = $('#pw').val();
                        if (newpw == newpwxn) {
                            $.post(api, {
                                action: 'US_DOIPW',
                                id: KH_ID,
                                pw: pw,
                                new_pw: newpw
                            }, function (data) {
                                var json = JSON.parse(data);
                                if (json.ok == 1) {

                                } else {
                                    $('#message').html('Sai Mật khẩu cũ ');
                                    return false;

                                }
                            })
                        } else {
                            $('#message').html('vui lòng nhập lại giá trị');
                            return false;
                        }



                    }
                },
                EXIT: {},
            }

        })
    }
    function edit_thong_tin_ca_nhan() {
        var content =
            `     
     <style>
          input {
             border: 1px solid #ccc;
             border-radius: 5px;
                  }       
     </style>
    <pre>
    USER NAME : <input type="text" id="tao-name" value="${KH_USER_NAME}" required> <br />

    HỌ ĐỆM    :  <input type="text" id="tao-hodem" value="${KH_HO_DEM}" required>   <br />

    TÊN       :  <input type="text" id="tao-ten" value="${KH_TEN}" required>     <br />

    ĐỊA CHỈ   :  <input type="text" id="tao-diachi" value="${KH_DIA_CHI}" required>   <br />

    SDT       :  <input type="text" id="tao-SDT" value="${KH_SDT}" required>     <br />
    </pre>
     `
        var dialog_edit = $.confirm({
            title: `SỬA ĐỔI THÔNG TIN - ${KH_HO_DEM}!`,
            content: content,
            icon: 'fa fa-key',
            columnClass: 'medium',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_edit',
                            id: KH_ID,
                            User_Name: $('#tao-name').val(),
                            hodem: $('#tao-hodem').val(),
                            ten: $('#tao-ten').val(),
                            diachi: $('#tao-diachi').val(),
                            SDT: $('#tao-SDT').val()
                        }

                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                thong_tin_ca_nhan();
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
                  <th>Tên</th>
                  <th>Địa chỉ</th>
                   <th>SDT</th>              
                  <th>Sửa/Xóa</th>
                </tr>
            </thead> <tbody>

            `
                    var stt = 0;
                    for (var user of json.data) {
                        var suaxoa = `<button class="btn btn-sm btn-warning nut-sua-xoa" data-cid="${user.ID}" data-action="US_edit">Sửa</button>`;
                        suaxoa += ` <button class="btn btn-sm btn-danger nut-sua-xoa" data-cid="${user.ID}" data-action="US_Xoa">Xóa <ion-icon name="trash-outline"></ion-icon></button>`;
                        noidung +=
                            `
            <tr>
                <td>${++stt}</td>
                <td>${user.ID}</td>
                <td>${user.USERNAME}</td>
                <td>${user.TEN}</td>
                <td>${user.DIACHI}</td>
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
                    console.log(action, id);
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
            if (item.ID == id) {
                user = item;
                break;
            }
        }

        var dialog_xoauser = $.confirm({
            title: ` xóa  ${user.TEN} nhé `,
            content: ``,
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
            if (item.ID == id) {
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
            <pre>
            USER NAME : <input type="text" id="tao-name" value="${user.USERNAME}" required> <br />

            HỌ ĐỆM    :  <input type="text" id="tao-hodem" value="${user.HODEM}" required>   <br />

            TÊN       :  <input type="text" id="tao-ten" value="${user.TEN}" required>     <br />

            ĐỊA CHỈ   :  <input type="text" id="tao-diachi" value="${user.DIACHI}" required>   <br />

            SDT       :  <input type="text" id="tao-SDT" value="${user.SDT}" required>     <br />
            </pre>
             `
        var dialog_edit = $.confirm({
            title: `SỬA ĐỔI THÔNG TIN - ${user.TEN}!`,
            content: content,
            icon: 'fa fa-key',
            columnClass: 'medium',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'US_edit',
                            id: id,
                            User_Name: $('#tao-name').val(),
                            hodem: $('#tao-hodem').val(),
                            ten: $('#tao-ten').val(),
                            diachi: $('#tao-diachi').val(),
                            SDT: $('#tao-SDT').val()
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




    //khách hàng đăng nhập vào
    $('.btn-trangchu').click(function () {
        add_class_not_show();

        $('.du-lieu-lam-viec').removeClass("not-show");

        trang_chu_lv(action_bandau);
    });
    function form_muahang(mabanh, data) {
        var banh;
        var json = JSON.parse(data);
        for (var item of json.data) {
            if (item.MABANH == mabanh) {
                banh = item;
                break;
            }
        }
        const randomNumber = Math.floor(Math.random() * 100000000);

        var mahoadon = banh.MABANH + randomNumber
        var content =
            ` <pre>
                    CHÀO MỪNG QUÝ KHÁCH MUA HÀNG 
                        Mã Hóa đơn : ${mahoadon}
                        Ngày mua   : ${getdate()}

                    Tên sản phẩm  : ${banh.TEN}  
                    <img style="width: 170px; " src="${banh.ANH}" />
                    Giá Tiền      : ${banh.GIA} 000 VNĐ
                    Số lượng      : <input type="int" id="soluong" placeholder="Số lượng " required>
                    Tên người nhận: <input type="text" id="tennguoinhan" value="${KH_HO_DEM + " " + KH_TEN}" required>
                    Địa chỉ       : <input type="text" id="diachinhan" value="${KH_DIA_CHI}" required>
                    Số điện thoại : <input type="text" id="sdtnhan" value="${KH_SDT}" required>
    
            </pre>`


        $.confirm({
            title: '<b> Xác Nhận Đơn Hàng </b>',
            content: content,
            columnClass: 'medium',

            buttons: {
                formSubmit: {
                    text: 'Đặt hàng',
                    btnClass: 'btn-primary',
                    action: function () {
                        if ($('#soluong').val() != null) {
                            var data_bang_hoa_don = {
                                action: 'CH_ADD_HOA_DON',
                                mahoadon: mahoadon,
                                MaKH: KH_ID,                                                           
                                Trangthai: 'Chờ Xác Nhận',
                                tongtien: $('#soluong').val() * banh.GIA,
                            }

                            var data_bang_chi_tiet = {
                                action: 'CH_ADD_CT_HOA_DON',
                                mahoadon: mahoadon,
                                mabanh: mabanh,
                                soluong: $('#soluong').val(),
                                giaban: $('#giatien').val(),

                            }
                            var data_khach_hang = {
                                action: 'CH_ADD_KHACH_HANG',
                                MaKH: KH_ID, 
                                ten: $('#tennguoinhan').val(),
                                diachi: $('#diachinhan').val(),
                                sdt: $('#sdtnhan').val(),
                            }
                            $.post(api, data_khach_hang, function (data) { })
                            $.post(api, data_bang_hoa_don, function (data) { })
                            $.post(api, data_bang_chi_tiet, function (data) { })

                           



                        } else {

                            return;
                        }


                    }
                },
                cancel: {},
            },
        });

    };
    function trang_chu_lv(data_gui_di) {

        $.post(api, data_gui_di,
            function (data) {
                var json = JSON.parse(data);

                var noidung = "";
                if (json.ok) {
                    var stt = 0;
                    for (var banh of json.data) {

                        var muahang = `<button class="btn btn-sm btn-primary nut-mua-ngay" data-cid="${banh.MABANH}""><ion-icon name="cart-outline"></ion-icon> Mua Ngay</button>`;
                        noidung +=
                            `
            <div class="book-container" style="width: 28%; height :380px;  margin: 15px; text-align: center; border: 1px solid #ccc; padding: 10px; display: inline-block; box-sizing: border-box;transition: box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'" onmouseout="this.style.boxShadow='none';">
                    <img src="${banh.ANH}" alt="Ảnh bìa sách" style="width: 150px; height:  200px; margin-bottom: 10px;">
                    <h2 style="font-size: 18px; margin-bottom: 5px;">${banh.TEN}</h2>
                    <p class="book-price" style="font-weight: bold; color: #FF5733;">${banh.GIA} Nghìn Đồng </p>
             <p>${muahang}</p>
            </div> 
            `
                    }

                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }
                $('.du-lieu-lam-viec').html(noidung);


                $('.nut-mua-ngay').click(function () {
                    checkdangnhap();
                    var mabanh = $(this).data('cid');
                    form_muahang(mabanh, data);
                });
            });
    }




    $('.btn-dondathang').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.du-lieu-lam-viec2').removeClass("not-show");
        list_hoa_don_dat_hang();
    });

    function list_hoa_don_dat_hang() {
        $.post(api,
            {
                action: 'CH_DON_HANG_DANG_GIAO'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " 
                                style="width: 90%; margin:auto"> `;
                    noidung +=
                        `
            <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Hóa Đơn</th>
                  <th>TÊN NGƯỜI NHẬN</th>
                  <th>Tổng Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Ngày mua</th>
                  <th>Thay đổi</th>
                </tr>
            </thead> <tbody>

            `


                    var stt = 0;
                    for (var hoadon of json.data) {
                        var tt = hoadon.TT;

                        var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" 
                                        data-cid="${hoadon.MAHD}" data-chitiet ="chi_tiet" data-trangthai ="${hoadon.TT}">Xem chi tiết</button>`;

                        if (tt == 'Chờ Xác Nhận') {
                            thaydoi += `<button class="btn btn-sm btn-danger nut-thay-doi" 
                                        data-cid="${hoadon.MAHD}" data-action ="CH_HUY_DON">HỦY ĐƠN</button>`;

                        } else {
                            thaydoi += `<button class="btn btn-sm btn-primary nut-thay-doi" 
                                        data-cid="${hoadon.MAHD}" data-action ="CH_DA_NHAN_DUOC_HANG">ĐÃ NHẬN</button>`
                        }
                        noidung +=
                            `.
            <tr>
                <td>${++stt}</td>
                <td>${hoadon.MAHD}</td>
                <td>${hoadon.TENNGUOINHAN}</td>
                <td>${hoadon.TIEN}</td>
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
                $('.du-lieu-lam-viec2').html(noidung);
                $('.nut-thay-doi').click(function () {
                    var mahoadon = $(this).data('cid');
                    var trangthai = $(this).data('trangthai');
                    var action = $(this).data('action');
                    var chitiet = $(this).data('chitiet');

                    if (chitiet == 'chi_tiet') {
                        if (trangthai == 'Chờ Xác Nhận') {
                            edit_chi_tiet_don_hang(mahoadon);
                        } else {
                            edit_chi_tiet_don_hang_dg(mahoadon);
                        }
                    } else {
                        if (action == 'CH_HUY_DON') {
                            HUY_DON_HANG(mahoadon, action, json)
                        } else if (action == 'CH_DA_NHAN_DUOC_HANG') {

                            DA_NHAN_HANG(mahoadon, action, json)
                        } else {
                            alert('Lỗi đâu rồi ấy')
                        }
                    }
                });
            });

    }
    function edit_chi_tiet_don_hang(mahoadon) {
        $.post(api,
            {
                action: 'CH_CHI_TIET_HOA_DON',
                mahoadon: mahoadon
            }, function (data) {
                var Hoadon;
                var json = JSON.parse(data)
                for (var item of json.data) {
                    if (item.MAHD == mahoadon) {
                        Hoadon = item;
                        break;
                    }
                }

                if (json.ok) {
                    var content = `<pre>
                     Thông Tin Đơn Hàng:
                     Mã Đơn Hàng: ${Hoadon.MAHD}
                     Ngày Đặt Hàng: ${Hoadon.NGAY}
                    </pre>`

                    var stt = 0;
                    for (var item of json.data) {
                        content += `<pre>
                  ${++stt}.Mặt hàng số ${stt} 
                            - Tên Bánh : ${item.TENBANH}
                            - Số lượng : ${item.SOLUONG}
                            - Giá      : ${item.GIABANH} 000 VNĐ
                            </pre>`;
                    }
                    content += `<pre>
                         - Tên người nhận  : ${item.TEN_NHAN}
                         - Địa chỉ nhận    : ${item.DIACHI}
                         - Số Điện Thoại   : ${item.SDT}
                     Tổng Tiền :     : ${item.TONG_TIEN} 000 VNĐ

                  Chân thành cảm ơn,
                  Minh Tuấn Bakery
                  Đội Ngũ Hỗ Trợ Khách Hàng</pre>`;


                    $.confirm({
                        title: "",
                        columnClass: 'large',
                        content: content,
                        buttons: {
                            cancel: {},
                        },
                    });
                } else {
                    alert('không có dữ liệu')
                }
            })
    }
    function edit_chi_tiet_don_hang_dg(mahoadon) {
        $.post(api,
            {
                action: 'CH_CHI_TIET_HOA_DON_HOAN_THANH',
                mahoadon: mahoadon
            }, function (data) {
                var Hoadon;
                var json = JSON.parse(data)
                for (var item of json.data) {
                    if (item.MAHD == mahoadon) {
                        Hoadon = item;
                        break;
                    }
                }

                if (json.ok) {
                    var content = `<pre>
                     Thông Tin Đơn Hàng:
                     Mã Đơn Hàng: ${Hoadon.MAHD}
                     Ngày Đặt Hàng: ${Hoadon.NGAY}
                    </pre>`

                    var stt = 0;
                    for (var item of json.data) {
                        content += `<pre>
                  ${++stt}.Mặt hàng số ${stt} 
                            - Tên Bánh : ${item.TENBANH}
                            - Số lượng : ${item.SOLUONG}
                            - Giá      : ${item.GIABANH} 000 VNĐ
                            </pre>`;
                    }
                    content += `<pre>
                         - Tên người nhận  : ${item.TEN_NHAN}
                         - Địa chỉ nhận    : ${item.DIACHI}
                         - Số Điện Thoại   : ${item.SDT}
                     Tổng Tiền :     : ${item.TONG_TIEN} 000 VNĐ

                     Người Giao Hàng :${item.TEN_SHIPER}
                     Số điện thoại   :${item.SDT_SHIPER}
                     Thời Gian ship dự kiến : ${item.TIME_SHIP} PHÚT
                  Chân thành cảm ơn,
                  Minh Tuấn Bakery
                  Đội Ngũ Hỗ Trợ Khách Hàng</pre>`;


                    $.confirm({
                        title: "",
                        columnClass: 'large',
                        content: content,
                        buttons: {
                            cancel: {},
                        },
                    });
                } else {
                    alert('không có dữ liệu')
                }
            })
    };
    function HUY_DON_HANG(mahoadon, action, json) {
        var hoadon;
        for (var item of json.data) {
            if (item.MAHD == mahoadon) {
                hoadon = item;
                break;
            }
        }
        var dialog_huydonhang = $.confirm({
            title: ` XÓA HÓA ĐƠN NÀY NHÉ !! `,
            content: ``,
            buttons: {
                YES: {
                    action: function () {
                        var data_gui_di = {
                            action: action,
                            mahoadon: mahoadon
                        }
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_huydonhang.close();
                                list_hoa_don_dat_hang();
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
    }
    function DA_NHAN_HANG(mahoadon, action, json) {
        var hoadon;
        for (var item of json.data) {
            if (item.MAHD == mahoadon) {
                hoadon = item;
                break;
            }
        }
        var dialog_huydonhang = $.confirm({
            title: ` ĐÃ NHẬN ĐƯỢC HÀNG!! `,
            content: ``,
            buttons: {
                YES: {
                    action: function () {
                        var data_gui_di = {
                            action: action,
                            mahoadon: mahoadon
                        }
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data); //json string text => obj
                            if (json.ok) { //dùng obj
                                dialog_huydonhang.close();
                                list_hoa_don_dat_hang();
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
    }




    // Nút lịch sử mua hàng được bấm
    ////////////////////////////////
    $('.btn-lichsumua').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.du-lieu-lam-viec').removeClass("not-show");

        list_hoa_don_hoan_thanh();
    });
    function list_hoa_don_hoan_thanh() {
        $.post(api,
            {
                action: 'CH_LIST_HOA_DON_HOAN_THANH'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " 
                         style="width: 90%; margin:auto"> `;
                    noidung += `
                             <thead>
                                 <tr>
                                   <th>STT</th>
                                   <th>Mã Hóa Đơn</th>
                                   <th>Người Nhận</th>
                                   <th>Tổng Tiền</th>          
                                   <th>Ngày mua</th>
                                   <th>Thay đổi</th>
                                 </tr>
                             </thead> <tbody>`
                    var stt = 0;
                    var tongtien
                    for (var hoadon of json.data) {
                        tongtien += hoadon.TIEN;


                        var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" 
                                 data-cid="${hoadon.MAHD}">Xem chi tiết </button>`;
                        noidung += `
                             <tr>
                                 <td>${++stt}</td>
                                 <td>${hoadon.MAHD}</td>
                                 <td>${hoadon.TEN_NGUOI_NHAN}</td>
                                 <td>${hoadon.TIEN}</td>  
                                  <td>${hoadon.NGAY}</td>
                                 <td>${thaydoi}</td>
                             </tr>`

                    }
                    noidung += " </tbody> </table>";

                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }
                $('.du-lieu-lam-viec').html(noidung);


                $('.nut-thay-doi').click(function () {
                    var mahoadon = $(this).data('cid');
                    edit_chi_tiet_don_hang_dg(mahoadon);
                });
            });
    }


    $('.btn-doanhthu').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.du-lieu-lam-viec2').removeClass("not-show");
        xem_doanh_thu();
    });
    function xem_doanh_thu() {
        var noidung1 = "";
        var thang;
        noidung1 = `<pre>

         THÁNG:    <select id="chooseOption" name="chooseOption">         
                                     <option value="1">THÁNG 1</option>
                                     <option value="2">THÁNG 2</option>
                                     <option value="3">THÁNG 3</option>
                                     <option value="4">THÁNG 4</option>
                                     <option value="5">THÁNG 5</option>
                                     <option value="6">THÁNG 6</option>
                                     <option value="7">THÁNG 7</option>
                                     <option value="8">THÁNG 8</option>
                                     <option value="9">THÁNG 9</option>
                                     <option value="10">THÁNG 10</option>
                                     <option value="11">THÁNG 11</option>
                                     <option value="12">THÁNG 12</option>                                
                                 </select>    <button id="xem-doanh-thu">XEM DOANH THU</button>

                 </pre>  `
        $('.du-lieu-lam-viec2').html(noidung1);
        $('#xem-doanh-thu').click(function () {
            thang = $('#chooseOption').val()
            $.post(api,
                {
                    action: 'CH_DOANH_THU',
                    thang: $('#chooseOption').val()
                },
                function (data) {
                    var json = JSON.parse(data);
                    if (json.ok) {
                        for (var doanhthu of json.data) {
                          
                            if (doanhthu.SOLUONG == 'NULL') {
                                alet('KHÔNG CÓ DOANH THU')
                            } else {
                                $('.du-lieu-lam-viec').removeClass("not-show");
                                var loinhuan = doanhthu.TONGTIEN * 30 / 100
                                var noidung =
                                    `<pre>
                                   
                        _________________________________________________________________________________
                        |                        Thông Báo doanh thu của quán Tháng ${thang}                 
                            -_-                                                               -_-       |
                        |                    1. Khách hàng mua nhiều hàng nhất                          |
                                                Anh(chị): ${doanhthu.TENKHACHHANG}                           
                                                 Số lần mua : ${doanhthu.SLMH}                          
                        |                                                                               |
                        |                    2. Loại bánh bán được nhiều nhất                           |
                                                 Tên Bánh     : ${doanhthu.TENBANH}                     
                        |                        Số lượng bán : ${doanhthu.SOLUONG}                     
                        |                                                                               |
                        |                    3. Tổng số tiền bán được (Sẽ làm chi tiết sau)             |
                                                   Doanh thu: ${doanhthu.TONGTIEN} 000 VNĐ                                  
                        |                          Lợi nhuận: ${loinhuan} 000 VND                            
                        |                    4. Tổng số hóa đơn bán ra                                  |
                        |                        Số lượng: ${doanhthu.SLHD}                             
                                                                                                        |
                        |        ok Đã Thông kê xong bán không được là do maketting thôi                |
                                 không phải do web đâu nhé  
                                 
                                                    
                        |                                                                               |
                        |_______________________________________________________________________________|
                         </pre>`
                            }
                           
                        }
                    } else {
                        alert([json.msg]);
                    }
                    $('.nut-in-doanh-thu').removeClass("not-show");
                    $('.du-lieu-lam-viec').html(noidung);

                    $('.in-doanh-thu').click(function () {
                        var dulieuvao = '.du-lieu-lam-viec'
                        XUAT_DOANH_THU_PDF(dulieuvao)
                    });
                }
            )
        })
    };

    function XUAT_DOANH_THU_PDF(noidung) {
        (function () {
            var
                form = $(noidung),
                cache_width = form.width(),
                a4 = [595.28, 841.89]; // for a4 size paper width and height          
                $('body').scrollTop(0);
                createPDF();
                     
            function createPDF() {
                getCanvas().then(function (canvas) {
                    var
                        img = canvas.toDataURL("image/png"),
                        doc = new jsPDF({
                            unit: 'px',
                            format: 'a4'
                        });
                    doc.addImage(img, 'JPEG', -30, 20);
                    doc.save('Bhavdip-html-to-pdf.pdf');
                    form.width(cache_width);
                });
            }

            // create canvas object  
            function getCanvas() {
                form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
                return html2canvas(form, {
                    imageTimeout: 2000,
                    removeContainer: true,
                    dpi: 1
                });
            }

        }());  
           
                (function ($) {
                    $.fn.html2canvas = function (options) {
                        var date = new Date(),
                            $message = null,
                            timeoutTimer = false,
                            timer = date.getTime();
                        html2canvas.logging = options && options.logging;
                        html2canvas.Preload(this[0], $.extend({
                            complete: function (images) {
                                var queue = html2canvas.Parse(this[0], images, options),
                                    $canvas = $(html2canvas.Renderer(queue, options)),
                                    finishTime = new Date();

                                $canvas.css({ position: 'absolute', left: 0, top: 0 }).appendTo(document.body);
                                $canvas.siblings().toggle();

                                $(window).click(function () {
                                    if (!$canvas.is(':visible')) {
                                        $canvas.toggle().siblings().toggle();
                                        throwMessage("Canvas Render visible");
                                    } else {
                                        $canvas.siblings().toggle();
                                        $canvas.toggle();
                                        throwMessage("Canvas Render hidden");
                                    }
                                });
                                throwMessage('Screenshot created in ' + ((finishTime.getTime() - timer) / 1000) + " seconds<br />", 4000);
                            }
                        }, options));

                        function throwMessage(msg, duration) {
                            window.clearTimeout(timeoutTimer);
                            timeoutTimer = window.setTimeout(function () {
                                $message.fadeOut(function () {
                                    $message.remove();
                                });
                            }, duration || 2000);
                            if ($message)
                                $message.remove();
                            $message = $('<div ></div>').html(msg).css({
                                margin: 0,
                                padding: 10,
                                background: "#000",
                                opacity: 0.7,
                                position: "fixed",
                                top: 10,
                                right: 10,
                                fontFamily: 'Tahoma',
                                color: '#fff',
                                fontSize: 12,
                                borderRadius: 12,
                                width: 'auto',
                                height: 'auto',
                                textAlign: 'center',
                                textDecoration: 'none'
                            }).hide().fadeIn().appendTo('body');
                        }
                    };  
    })(jQuery); 
    }  

    $('.btn-dondathang-admin').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.du-lieu-lam-viec').removeClass("not-show");
        list_xac_nhan_hoa_don();
    });
    function list_xac_nhan_hoa_don() {
        $.post(api,
            {
                action: 'CH_XAC_NHAN_HOA_DON'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " 
                                style="width: 90%; margin:auto"> `;
                    noidung +=
                        `
            <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Hóa Đơn</th>
                  <th>Tên người nhận</th>
                  <th>Tổng Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Ngày mua</th>
                  <th>Thay đổi</th>
                </tr>
            </thead> <tbody>

            `
                    var stt = 0;
                    for (var hoadon of json.data) {

                        var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" 
                                        data-cid="${hoadon.MAHD}">Xác Nhận</button>`;
                        noidung +=
                            `
            <tr>
                <td>${++stt}</td>
                <td>${hoadon.MAHD}</td>
                <td>${hoadon.TENNGUOINHAN}</td>
                <td>${hoadon.TIEN}</td>
                <td>${hoadon.TT}</td>
                 <td>${hoadon.NGAY}</td>
                <td>${thaydoi}</td>
            </tr>
           
            `
                    }
                    noidung += " </tbody> </table>"


                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }

                $('.du-lieu-lam-viec').html(noidung);


                $('.nut-thay-doi').click(function () {
                    var mahoadon = $(this).data('cid');
                    update_xac_nhan_don_hang(mahoadon);
                });
            });
    }; 
    function update_xac_nhan_don_hang(mahoadon) {
        var content =
            `<pre>         
           
    SHIPER        :  <select id="chooseOption" name="chooseOption">
                    <option value="SHIPER01">Hoàng Mạnh Tiến</option>
                    <option value="SHIPER02">Hoàng tràn Phâu</option>
                    </select>

    THỜI GIAN SHIP:  <input type="text" class="timesship" placeholder="thời gian ship" /> PHÚT
             </pre>`

        $.confirm({
            title: 'XÁC NHẬN ĐƠN ĐẶT HÀNG',
            content: content,
            buttons: {
                formSubmit: {
                    text: 'XÁC NHẬN',
                    btnClass: 'btn-primary',
                    keys: ['enter', 'enter'],
                    action: function () {
                        var data_gui_di = {
                            action: 'CH_UPDATE_XAC_NHAN_DON_HANG',
                            mahoadon: mahoadon,
                            mashiper: $('#chooseOption').val(),
                            thoigian: $('.timesship').val()
                        }
                        $.post(api, data_gui_di, function (data) {
                            list_xac_nhan_hoa_don();
                        });
                    }
                },
                cancel: {},

            },
        });
    };
    $('.nut-search').click(function () {

        var data_gui_di = {
            action: 'CH_TIM_KIEM_BANH',
            tenbanh: $('.input-seach').val()
        }
        trang_chu_lv(data_gui_di)
    });
    ////////Nút Nguyên liệu được bấm//////
    $('.btn-nguyenlieu').click(function () {
        add_class_not_show();
        $('.du-lieu-lam-viec').removeClass('not-show');
        var noidung = "";
        list_danh_sach_nguyen_lieu();
    });
    function list_danh_sach_nguyen_lieu() {
        $.post(api,
            {
                action: 'CH_LIST_NGUYEN_LIEU'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<pre>
                           <button class="them-nguyen-lieu btn btn-primary"  style="padding:20px" >Thêm Nguyên Liệu</button></pre>`;
                    noidung += `<table class="table table-hover " 
                                style="width: 90%; margin:auto"> `;
                    noidung += `
            <thead>
                <tr>
                  <th>STT</th>
                 
                  <th>Tên nguyên liệu</th>
                  <th>số lượng </th>
                  <th>DVT</th> 
                  <th>Giá</th>
                  <th>Sửa</th>
                </tr>
            </thead> <tbody> `
                    var stt = 0;
                    for (var NV of json.data) {
                        var SUA = `<button class="sua-nguyen-lieu btn btn-warning" data-cid="${NV.MANV}">Sửa Nguyên Liệu</button>`
                        noidung +=
                            `
            <tr>
                <td>${++stt}</td>
              
                <td>${NV.TENNV}</td>
                <td>${NV.SL}</td>
                <td>${NV.DVT}</td>
                 <td>${NV.DONGIA}</td>
                 <td>${SUA}</td>
                
            </tr>  `
                    }
                    noidung += " </tbody> </table>";
                } else {
                    noidung = "Không có dữ liệu nhé !!";
                }


                $('.du-lieu-lam-viec').html(noidung);

                $('.sua-nguyen-lieu').click(function () {
                    var mahoadon = $(this).data('cid');
                    sua_nguyen_lieu(mahoadon, json)
                });

                $('.them-nguyen-lieu').click(function () {
                    them_nguyen_lieu()
                });

            }
        );
    }
    function sua_nguyen_lieu(mahoadon, json) {
        var NV;
        for (var item of json.data) {
            if (item.MANV == mahoadon) {
                NV = item;
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
            <pre>
                             SỬA GIÁ THÔI NHÁ AE
             
            TÊN NGUYÊN LIỆU : ${NV.TENNV}
            GIÁ             :  <input type="text" id="gia_nv" value="${NV.DONGIA}" required>Nghìn Đồng<br />
            </pre>
             `
        var dialog_edit = $.confirm({

            content: content,
            title: "",
            columnClass: 'medium',
            buttons: {
                formSubmit: {
                    text: 'SAVE',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'CH_SUA_GIA_NGUYEN_LIEU',
                            manv: mahoadon,
                            gianv: $('#gia_nv').val()
                        }
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                dialog_edit.close();
                                list_danh_sach_nguyen_lieu();
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

    function them_nguyen_lieu() {
        var content = "";
        var slmathang = 1;
        var mahoadon = Math.random();
        content += 

            `<pre>         
     MÃ HÓA ĐƠN     : ${mahoadon}
     NGÀY NHẬP      : ${getdate()}   
     Tên Nhà Cung Cấp:     <input type="text" class="tennguyenlieu" placeholder="Tên nhà cung cấp" />   
     Địa chỉ :    <input type="text" class="tennguyenlieu" placeholder="Địa chỉ" />  SDT :    <input type="text" class="tennguyenlieu" placeholder="SDT" />   
     TÊN NGUYÊN LIỆU: <input type="text" class="tennguyenlieu" placeholder="Tên Nguyên Liệu" /> 
     SỐ LƯỢNG       : <input type="number" class="soluong" placeholder="Số lượng " />
     DVT            : <input type="text" class="donvitinh" placeholder="Đơn vị tính" />
     GIÁ            : <input type="number" class="giatien" placeholder="Giá" />
     
     
    
             </pre>`
        $.confirm({
            title: "Danh sách tài khoản",
            content: content,
            columnClass: 'medium',
            buttons: {
                formSubmit: {
                    text: 'XÁC NHẬN',
                    btnClass: 'btn-primary',
                    keys: ['enter', 'enter'],
                    action: function () {
                        var data_gui_di = {
                            action: 'CH_THEM_NGUYEN_LIEU',
                            mahoadon: mahoadon,
                            tennguyenlieu: $('.tennguyenlieu').val(),
                            soluong: $('.soluong').val(),
                            dvt: $('.donvitinh').val(),
                            gia: $('.giatien').val()

                        }
                        $.post(api, data_gui_di, function (data) {
                            list_danh_sach_nguyen_lieu();
                        });
                    }
                },
                cancel: {},
            },

        });


    }


    $('.nut-message').click(function () {
        if ($('.chat-area').hasClass('not-show')) {
            $('.goc-anh').addClass("not-show");
            $('.chat-area').removeClass("not-show");
            check_dung_chat = true;
        } else {
            $('.goc-anh').removeClass("not-show");
            $('.chat-area').addClass("not-show");
            check_dung_chat = false;
        }


        thuc_hien_lai();

        $('.nut-chat-gui').click(function () {
            var dulieu = $('.input-field').val();

            var data_gui_di_1 = {
                action: 'CHAT_ADD_DU_LIEU_ADMIN',
                machat: '3',
                admin: dulieu
            }
            var data_gui_di = {
                action: 'CHAT_ADD_DU_LIEU_KHACH',
                machat: KH_ID,
                khachhang: dulieu
            }
            if (!admin_login) {
                $.post(api, data_gui_di, function (data) {
                    var json = JSON.parse(data);
                    if (json.ok == 1) {
                        $('.input-field').val('');
                    } else {
                        alert(json.msg)
                    }
                });
            } else {
                $.post(api, data_gui_di_1, function (data) {
                    var json = JSON.parse(data);
                    if (json.ok == 1) {
                        $('.input-field').val('');
                    } else {
                        alert(json.msg)
                    }
                });
            }
        });
    });
    function du_lieu_doan_chat_admin() {
        var data_gui_di = {
            action: 'CHAT_LIST',
            machat: '3'
        }
        $.post(api, data_gui_di, function (data) {
            var json = JSON.parse(data);
            var noidung_out = "";
            for (var CHAT of json.data) {
                if (CHAT.ADMIN != 'NULL') {
                    noidung_out +=
                        `
                     <div class="chat outgoing">
                         <div class="detail">
                           <p>${CHAT.ADMIN}</p>
                        </div>
                     </div>
                         `
                }
                if (CHAT.KHACH_HANG != 'NULL') {
                    noidung_out +=
                        `
                <div class="chat incomming">
                    <div class="detail">
                           <p>${CHAT.KHACH_HANG}</p>
                    </div>
                 </div>
                `
                }
            }
            $('.chat-box').html(noidung_out);
        });
    }
    function du_lieu_doan_chat() {
        var data_gui_di = {
            action: 'CHAT_LIST',
            machat: '3'
        }
        $.post(api, data_gui_di, function (data) {
            var json = JSON.parse(data);
            var noidung_out = "";
            for (var CHAT of json.data) {
                if (CHAT.KHACH_HANG != 'NULL') {
                    noidung_out +=
                        `
                     <div class="chat outgoing">
                         <div class="detail">
                           <p>${CHAT.KHACH_HANG}</p>
                        </div>
                     </div>
                         `
                }
                if (CHAT.ADMIN != 'NULL') {
                    noidung_out +=
                        `
                <div class="chat incomming">
                    <div class="detail">
                           <p>${CHAT.ADMIN}</p>
                    </div>
                 </div>
                `
                }
            }
            $('.chat-box').html(noidung_out);
        });
    }
    function thuc_hien_lai() {
        if (!check_dung_chat) {
            return;
        }
        else {
            if (!admin_login) {
                du_lieu_doan_chat();
            } else {
                du_lieu_doan_chat_admin();
            }
            const chatBox = document.querySelector('.chat-box');
            chatBox.scrollTop = chatBox.scrollHeight;
            setTimeout(thuc_hien_lai, 500);
        }


    }

    $('.btn-bieudo').click(function () {
        add_class_not_show();
        $('.du-lieu-lam-viec').removeClass('not-show');
        alert('HIỆN BIỂU ĐỒ BÁNH ');
        google.charts.load('current', { 'packages': ['corechart'] });

        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            $.post(api, {
                action: 'CH_BIEU_DO_BANH'
            }, function (data) {
                var json = JSON.parse(data);
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                for (var banh of json.data) {
                    data.addRows([
                        [banh.TENBANH, banh.SOLUONG],                     
                    ]);
                }

                // Set chart options
                var options = {
                    'title': 'BIỂU ĐỒ MÔ TẢ SỐ LƯỢNG BÁNH ĐƯỢC BÁN ',
                    'width': 1050,
                    'height': 1000
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('okla'));
                chart.draw(data, options);
            })     
        }
    });

    ////// PHẦN NÀY COOKIE NHÉ //////////////
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function getLocal(name) {
        return window.localStorage.getItem(name);
    }
    function get_store(key) {
        var value = getCookie(key);
        if (value == null || value == '' || value == undefined) {
            value = getLocal(key);
        }
        return value;
    }

});