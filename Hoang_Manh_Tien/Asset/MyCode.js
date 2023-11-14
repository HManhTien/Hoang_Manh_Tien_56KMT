$(document).ready(function () {

    var logined = false;
    var admin_login = false;
    const api = '/api.aspx';
    var data_luu_giu;
    var MA_KHACH_HANG;
    var action_bandau = {
        action: 'CH_list_banh'
    }
    var noi_dung_nut_xin_chao;

    login_ck();
    function login_ck() {
        var id = get_store('name_login');
        var ck = get_store('ck_login');
        var data_gui_di = {
            action: 'US_login_ck',
            id: id,
            ck: ck
        }
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
                MA_KHACH_HANG = user.ID;
                noi_dung_nut_xin_chao = `Xin Chào<b> ${user.TEN} </b>`
                setCookie('name_login', user.ID, 365);
                setCookie('ck_login', user.COOKIE, 365);

                if (user.NAME === 'ADMIN') {
                    admin_login = true;
                    $('.btn-xinchao').html("Xin chao <b>ADMIN</b>");
                    Neu_admin_dang_nhap();
                } else {
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
    function getdate() {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        var year = currentDate.getFullYear();

        return ('' + day + '/' + month + '/' + year);
    }

    Neu_khachhang_dang_nhap();
    trang_chu_lv(action_bandau);
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
        $('.dulieuoday').addClass("not-show");
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
        $('.data-trang-chu').removeClass("not-show");
        trang_chu_lv();
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
                        data_luu_giu = {
                            action: 'US_login',
                            User_Name: $('#login-name').val(),
                            pw: $('#login-pw').val()
                        }


                        $.post(api, data_gui_di, function (data) {
                            login(data);
                            dialog_dangnhap.close();
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
                onContentReady: function () {
                    //khi trang tải xong
                    thong_tin_ca_nhan();
                }
            });
        }
    });
    function thong_tin_ca_nhan() {
        $.post(api, data_luu_giu, function (data) {
            var json = JSON.parse(data);
            var noidung = "";
            if (json.ok) {

                for (var user of json.data) {
                    noidung +=
                        ` 
                    <pre>
         USER NAME : ${user.USERNAME}
         TÊN       : ${user.HODEM + user.TEN}
         ĐỊA CHỈ   : ${user.DIACHI}
         SDT       : ${user.SDT}
                    </pre>
                `
                }
            } else {
                noidung = "Không có dữ liệu nhé !!";
            }
            $('#danh_sach_user').html(noidung);
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

        $('.data-trang-chu').removeClass("not-show");

        trang_chu_lv(action_bandau);
    });
    function form_muahang(mabanh, data, data1) {
        var banh;
        var json = JSON.parse(data);
        for (var item of json.data) {
            if (item.MaBanh == mabanh) {
                banh = item;
                break;
            }
        }
        var mahoadon = Math.random();
        var user;
        var json = JSON.parse(data1);
        for (var user of json.data) { }
        var content =
            `     
              <pre>
                    Chào mưng quý khách
        Mã Hóa đơn : ${mahoadon}
        Ngày mua   : ${getdate()}

    Tên sản phẩm  : ${banh.TEN}                               <img style="width: 200px; " src="${banh.ANH}" />
    Số lượng      : <input type="int" id="soluong" placeholder="Số lượng " required>
    Giá Tiền      : <input type="int" id="giatien" value="${banh.GIA}" required>
    Tên người nhận: <input type="text" id="tennguoinhan" value="${user.HODEM + " " + user.TEN}" required>
    Địa chỉ       : <input type="text" id="diachinhan" value="${user.DIACHI}" required>
    
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
                        var data_bang_hoa_don = {
                            action: 'CH_add_hoa_don',
                            mahoadon: mahoadon,
                            Tennguoinhan: $('#tennguoinhan').val(),
                            diachinguoinhan: $('#diachinhan').val(),
                            MaKH: MA_KHACH_HANG,
                            Trangthai: 'Chờ Xác Nhận',
                            tongtien: $('#soluong').val() * $('#giatien').val(),

                        }

                        var data_bang_chi_tiet = {
                            action: 'CH_add_ct_hoa_don',
                            mahoadon: mahoadon,
                            mabanh: mabanh,
                            soluong: $('#soluong').val(),
                            giaban: $('#giatien').val(),

                        }

                        $.post(api, data_bang_chi_tiet, function (data) {

                        })
                        $.post(api, data_bang_hoa_don, function (data) {

                        })


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

                        var muahang = `<button class="btn btn-sm btn-primary nut-mua-ngay" data-cid="${banh.MaBanh}""><ion-icon name="cart-outline"></ion-icon> Mua Ngay</button>`;
                        noidung +=
                            `
            <div class="book-container" style="width: 25%;height :380px;  margin: 10px; text-align: center; border: 1px solid #ccc; padding: 10px; display: inline-block; box-sizing: border-box;transition: box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'" onmouseout="this.style.boxShadow='none';">
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
                $('.data-table-trang-chu').html(noidung);


                $('.nut-mua-ngay').click(function () {
                    checkdangnhap();
                    var mabanh = $(this).data('cid');
                    $.post(api, data_luu_giu, function (data1) {

                        form_muahang(mabanh, data, data1);
                    });
                });

            });
    }




    $('.btn-dondathang').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.data-hoa-don-dat-hang').removeClass("not-show");
        $.post(api,
            {
                action: 'CH_xac_nhan_hoa_don'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " 
                                style="width: 70%; margin:auto"> `;
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
                                        data-cid="${hoadon.MaHD}">Xem chi tiết</button>`;
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

                    var data_gui_di = {
                        action: 'CH_chi_tiet_hoa_don',
                        mahoadon: mahoadon
                    }
                    $.post(api, data_gui_di, function (data) {
                        edit_chi_tiet_don_hang(mahoadon, data);
                    })
                });

            });



    });
    function edit_chi_tiet_don_hang(mahoadon, data) {
        var Hoadon;
        var json = JSON.parse(data)
        for (var item of json.data) {
            if (item.MaHD == mahoadon) {
                Hoadon = item;
                break;
            }
        }

        if (json.ok) {
            var content = `<pre>
             Thông Tin Đơn Hàng:
             Mã Đơn Hàng: ${Hoadon.MaHD}
             Ngày Đặt Hàng: ${Hoadon.NGAY}
            </pre>`

            var stt = 0;
            for (var item of json.data) {
                content += `<pre>
          ${++stt}.Mặt hàng số ${stt} 
                    - Tên Bánh : ${item.TENBANH}
                    - Số lượng : ${item.SOLUONG}
                    - Giá      : ${item.GIABANH} </pre>`;
            }
            content += `<pre>
                 - Tên người nhận  : ${item.TEN}
                 - Địa chỉ nhận : ${item.DIACHI}
             Tổng Tiền :     : ${item.TONGTIEN}

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
        $('.data-hoa-don-dat-hang').removeClass("not-show");

        list_hoa_don_hoan_thanh();
    });
    function list_hoa_don_hoan_thanh() {
        $.post(api,
            {
                action: 'CH_list_hoa_don_hoan_thanh'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " 
                         style="width: 70%; margin:auto"> `;
                    noidung +=
                        `
     <thead>
         <tr>
           <th>STT</th>
           <th>Mã Hóa Đơn</th>
           <th>Mã Khách Hàng</th>
           <th>Tổng Tiền</th>          
           <th>Ngày mua</th>
           <th>Thay đổi</th>
         </tr>
     </thead> <tbody>

     `
                    var stt = 0;
                    for (var hoadon of json.data) {

                        var thaydoi = `<button class="btn btn-sm btn-warning nut-thay-doi" 
                                 data-cid="${hoadon.MaHD}">Xem chi tiết </button>`;
                        noidung +=
                            `
     <tr>
         <td>${++stt}</td>
         <td>${hoadon.MaHD}</td>
         <td>${hoadon.MaKH}</td>
         <td>${hoadon.Tien}</td>  
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
                    var data_gui_di = {
                        action: 'CH_chi_tiet_hoa_don',
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
            if (item.MaHD == mahoadon) {
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
             Mã Đơn Hàng: ${Hoadon.MaHD}
             Ngày Đặt Hàng: ${Hoadon.NGAY}
            </pre>`

            var stt = 0;
            for (var item of json.data) {
                content += `<pre>
          ${++stt}.Mặt hàng số ${stt} 
                    - Tên Bánh : ${item.TENBANH}
                    - Số lượng : ${item.SOLUONG}
                    - Giá      : ${item.GIABANH} </pre>`;
            }
            content += `<pre>
                 - Tên người nhận  : ${item.TEN}
                 - Địa chỉ nhận : ${item.DIACHI}
             Tổng Tiền :     : ${item.TONGTIEN}

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

        $('.dulieuoday').removeClass("not-show");
        $('.data-hoa-don-dat-hang').removeClass("not-show");
        xem_doanh_thu();
        list_hoa_don_hoan_thanh();

    });
    function xem_doanh_thu() {
        $.post(api,
            {
                action: 'CH_doanh_thu'
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
                                                   Doanh thu: ${doanhthu.TONGTIEN} $                                  
                        |                          Lợi nhuận: ${loinhuan} $                            
                        |                    4. Tổng số hóa đơn bán ra                                  |
                        |                        Số lượng: ${doanhthu.SLHD}                             
                                                                                                        |
                        |        OK Đã Thông kê xong bán không được là do maketting thôi                |
                                 không phải do web đâu nhé                                              
                        |                                                                               |
                        |_______________________________________________________________________________|
                        </pre>`
                    }
                    $('.dulieuoday').html(noidung);
                } else {
                    alert([json.msg]);
                }
            }
        )
    };


    $('.btn-dondathang-admin').click(function () {
        if (checkdangnhap()) return;
        add_class_not_show();
        $('.data-hoa-don-dat-hang').removeClass("not-show");
        list_xac_nhan_hoa_don();
    });
    function list_xac_nhan_hoa_don() {
        $.post(api,
            {
                action: 'CH_xac_nhan_hoa_don'
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung = "";
                if (json.ok) {
                    noidung += `<table class="table table-hover " 
                                style="width: 70%; margin:auto"> `;
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
                                        data-cid="${hoadon.MaHD}">Xác Nhận</button>`;
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
                    update_xac_nhan_don_hang(mahoadon);
                });
            });
    };
    function update_xac_nhan_don_hang(mahoadon) {
        var data_gui_di = {
            action: 'CH_update_xac_nhan_don_hang',
            mahoadon: mahoadon
        }

        $.post(api, data_gui_di, function (data) {
            list_xac_nhan_hoa_don();
        })
    };

    $('.btn-nguyenlieu').click(function () {
        add_class_not_show();
        $('.data-trang-chu').removeClass("not-show");


    });

    $('.nut-search').click(function () {

        var data_gui_di = {
            action: 'CH_tim_kiem_banh',
            tenbanh: $('.input-seach').val()
        }
        trang_chu_lv(data_gui_di)
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
    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    function getLocal(name) {
        return window.localStorage.getItem(name);
    }
    function setLocal(name, value) {
        window.localStorage.setItem(name, value);
    }
    function delLocal(name) {
        localStorage.removeItem(name);
    }
    function get_store(key) {
        var value = getCookie(key);
        if (value == null || value == '' || value == undefined) {
            value = getLocal(key);
        }
        return value;
    }

});