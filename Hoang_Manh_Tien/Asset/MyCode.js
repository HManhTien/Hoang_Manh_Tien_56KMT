$(document).ready(function () {

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
            text-align: right;
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
                <label for="create-pw2">Xác Nhận Mật Khẩu :</label>
                <input type="text" id="create-pw2" placeholder="Confirm your password" required>
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
                        var name = this.$content.find('.name').val();
                        if (!name) {
                            $.alert('provide a valid name');
                            return false;
                        }
                        $.alert('Your name is ' + name);
                    }
                },
                cancel: function () {
                    //close
                },
            },
            onContentReady: function () {
                // bind to events
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    });
});
