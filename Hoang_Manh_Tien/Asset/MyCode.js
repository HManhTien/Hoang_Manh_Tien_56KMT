$(document).ready(function () {
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
    }
    function Neu_khachhang_dang_nhap() {
        $('.btn-nguyenlieu').addClass("not-show");
        $('.btn-dondathang-admin').addClass("not-show");
        $('.btn-doanhthu').addClass("not-show");
        $('.btn-phanhoi-admin').addClass("not-show");

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
        $('.btn-phanhoi-admin').removeClass("not-show");
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

        var mahoadon = Math.random();
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
                                MaKH: KH_ID,
                                Tennguoinhan: $('#tennguoinhan').val(),
                                diachinguoinhan: $('#diachinhan').val(),                              
                                Trangthai: 'Chờ Xác Nhận',
                                tongtien: $('#soluong').val() * banh.GIA,
                                sdt: $('#sdtnhan').val(),
                            }


                            var data_bang_chi_tiet = {
                                action: 'CH_ADD_CT_HOA_DON',
                                mahoadon: mahoadon,
                                mabanh: mabanh,
                                soluong: $('#soluong').val(),
                                giaban: $('#giatien').val(),

                            }
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
                 var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" 
                                        data-cid="${hoadon.MAHD}">Xem chi tiết</button>`;
                noidung +=
                            `
            <tr>
                <td>${++stt}</td>
                <td>${hoadon.MAHD}</td>
                <td>${hoadon.MAKH}</td>
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
                    var data_gui_di = {
                        action: 'CH_CHI_TIET_HOA_DON_DANG_GIAO',
                        mahoadon: mahoadon
                    }
                    $.post(api, data_gui_di, function (data) {
                        edit_chi_tiet_don_hang(mahoadon, data ,trangthai);
                    })
                });

            }); 

    });
    function edit_chi_tiet_don_hang(mahoadon, data, trangthai) {
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
        };
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
                                   <th>Mã Khách Hàng</th>
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
                                 <td>${hoadon.MAKH}</td>
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
                    var data_gui_di = {
                        action: 'CH_CHI_TIET_HOA_DON',
                        mahoadon: mahoadon
                    }
                    $.post(api, data_gui_di, function (data) {
                        chitiethoadon(mahoadon, data);
                    })

                });

            });
    }
    function chitiethoadon(mahoadon, data) {
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
                    Chào Quý Khách hàng

          Chúng tôi xin chân thành cảm ơn sự tin tưởng và lựa chọn của 
          Quý khách hàng tại Minh Tuấn Bakery.

          Chúng tôi xác nhận rằng đơn hàng của bạn đã được nhận và đang 
          được xử lý .Dưới đây là một số thông tin chi tiết về đơn hàng 
          của bạn:

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
                    - Giá      : ${item.GIABANH} 000 VNĐ </pre>`;
            }
            content += `<pre>
                 - Tên người nhận  : ${item.TEN}
                 - Địa chỉ nhận : ${item.DIACHI}
             Tổng Tiền :     : ${item.TONGTIEN} 000 VNĐ

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
        }

    }



    $('.btn-doanhthu').click(function () {
        alert('ko dc bấm');
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.du-lieu-lam-viec2').removeClass("not-show");
        $('.du-lieu-lam-viec').removeClass("not-show");
        xem_doanh_thu();
        list_hoa_don_hoan_thanh();

    });
    function xem_doanh_thu() {
        $.post(api,
            {
                action: 'CH_DOANH_THU'
            },
            function (data) {
                var json = JSON.parse(data);
                if (json.ok) {
                    for (var doanhthu of json.data) {
                        var loinhuan = doanhthu.TONGTIEN * 30 / 100
                        var noidung =
                            `<pre>
                        _________________________________________________________________________________
                        |                        Thông Báo doanh thu của quán                           |
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
                    $('.du-lieu-lam-viec2').html(noidung);
                } else {
                    alert([json.msg]);
                }
            }
        )
    };


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

                        var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" 
                                        data-cid="${hoadon.MAHD}">Xác Nhận</button>`;
                        noidung +=
                            `
            <tr>
                <td>${++stt}</td>
                <td>${hoadon.MAHD}</td>
                <td>${hoadon.MAKH}</td>
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
            action: 'CH_tim_kiem_banh',
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
                  <th>Mã Hóa Đơn</th>
                  <th>Mã Khách Hàng</th>
                  <th>Giá </th>
                  <th>Trạng Thái</th>
                  <th>Ngày mua</th>
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
                <td>${NV.MANV}</td>
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
            alert('Sai đâu đó')
            var data_gui_di_1 = {
                action: 'CHAT_ADD_DU_LIEU_ADMIN',
                machat: '3',
                admin: dulieu
            }
            var data_gui_di = {
                action: 'CHAT_ADD_DU_LIEU_KHACH',
                machat: KH_ID,
                khachhang : dulieu
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