$(document).ready(function () {

    const api = '/api.aspx';

    $('#nut-dang-ky').click(function () {
        var content =
            `
        <style>
        .form-group {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        label {
            width: 200px;
           text-align: center; 
            padding-right: 10px;
        }
        input[type="text"] {
            flex: 1;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 5px;                  
        }      
        </style>
             <div class="form-group">
                <label for="create-name">Name :</label>
                <input type="text" id="create-name" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="create-pw">Mật khẩu :</label>
                <input type="text" id="create-pw" placeholder="Your password" required>
            </div>
             <div class="form-group">
                <label for="create-email">Email :</label>
                <input type="text" id="create-email" placeholder="Nhập Emaill" required>
            </div>
        
        `
        $.confirm({
            title: 'Đăng Ký!',
            content: content,

            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-primary',
                    action: function () {
                        var data_gui_di = {
                            action: 'creat-user',
                            name: $('#create-name').val(),
                            pw: $('#create-pw').val(),
                            email: $('#create-email').val()
                        }

                        console.log(data_gui_di);
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {

                            } else {

                            }
                        })
                    },
                    cancel: function () {
                        //close
                    },
                },
            },
        });
    });

    $('#nut-dang-nhap').click(function () {
        var content =
            `
        <style>
        .form-group {
            display: flex;
            align-items: center ;
            margin-bottom: 10px;
        }
        label {
            width: 200px;
           text-align: center;          
        }
        input[type="text"] {
            flex: 1;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 5px;                  
        }      
        </style>
             <div class="form-group">
                <label for="create-name">Name :</label>
                <input type="text" id="login-name" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="create-pw">Mật khẩu :</label>
                <input type="text" id="login-pw" placeholder="Your password" required>
            </div>     
            
        `
        var dialog_dangnhap = $.confirm({
            title: 'Đăng Nhập!',
            content: content,
            icon: 'fa fa-key',
            buttons: {
                formSubmit: {
                    text: 'Đăng Nhập',
                    btnClass: 'btn-primary',

                    action: function () {
                        var data_gui_di = {
                            action: 'login_user',
                            name: $('#login-name').val(),
                            pw: $('#login-pw').val()
                        }

                        $.post(api, data_gui_di, function (data) {
                            console.log(data);
                            var json = JSON.parse(data);
                            console.log(json);
                            if (json == 1) {
                                dialog_dangnhap.close();
                                $('#nut-dang-nhap').addClass("not-show");
                                $('#nut-dang-ky').addClass("not-show");
                                $('#nut-xin-chao').removeClass("not-show");
                                $('#nut-dang-xuat').removeClass("not-show");
                            } else {
                                alert(json.msg)
                            }
                        })

                    }
                },
                cancel: {},
            },
        });
    });

    $('#nut-dang-xuat').click(function () {
        $('#nut-dang-nhap').removeClass("not-show");
        $('#nut-dang-ky').removeClass("not-show");
        $('#nut-xin-chao').addClass("not-show");
        $('#nut-dang-xuat').addClass("not-show");
    });
});
