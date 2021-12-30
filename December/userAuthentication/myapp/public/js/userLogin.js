$(document).ready(function () {

    // Form Validation 
    $("#form").validate({
         // rules for form Validation 
        rules: {
            email: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
            },
        },
        // messages for form Validation 
        messages: {
            email: {
                required: "Please enter valid email address OR contact number",
            },
            password: {
                required: "Enter your password here",
                minlength: "password must be at least 6 characters long",
            },
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            // get the value of email and password field
            let formData = {
                email: $("#email").val(),
                password: $("#password").val()
            };

            // log the user email and password value
            console.log("formData...", formData);

            // ajax call for user login
            $.ajax({
                type: "POST",
                url: "/userLogin",
                data: formData,
                success: function (data) {
                    console.log("data is : ", data);
                    if (data.status == 200) {
                        // redirect on the users page, if status - success
                        $(location).attr("href", "/users");
                    }
                    else {
                        $("#errorMessage").html(data.message);
                    }
                }
            })
        }


    })
})



