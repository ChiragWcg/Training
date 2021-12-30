
$(document).ready(function () {

    // Form Validation 
    $("#form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
            },
            contact: {
                required: true,
                minlength: 10
            },
            password: {
                required: true,
                minlength: 6,
            },

        },
        messages: {
            name: {
                required: "Enter your name",
                minlength: "Your name must be at least 3 characters long",
            },
            email: {
                required: "Enter your email address",
            },
            contact: {
                required: "Enter your contact number",
                minlength: "contact number at least 10 characters long",
            },
            password: {
                required: "Enter your address here",
                minlength: "password must be at least 6 characters long",
            },

        },

        submitHandler: function (form, event) {
            event.preventDefault();
            // get the value of name, email, contact, passwors as userData 
            let userData = ({
                name: $("#name").val(),
                email: $("#email").val(),
                contact: $("#contact").val(),
                password: $("#password").val(),
            })

            // log the new user data
            console.log('new user', userData);
            // let formData = new FormData(form);

            // ajax call for add new user
            $.ajax({
                type: "POST",
                url: "/addUser",
                dataType: "json",
                data: userData,
                success: function (data) {
                    if (data.type == 'error') {
                        // display alert box, if user exists
                        alert('User already exists...');
                        return;
                    }
                    // log result data
                    console.log("data in success..... : ", data);
                   
                    if (data.status == 200) {
                         // render users page, if type - success
                        $(location).attr("href", "/users");
                    }
                    else {
                        $("#errorMessage").html(data.message);
                    }
                },
                error: function (result) {
                    alert('Something went wrong...')
                }
            });
        }
    })

    // $.ajax({
    //     type: "GET",
    //     url: "/users",
    //     success: function (data) {
    //         console.log('USers------------', data);
    //         for (let userdata of data.data) {
    //             let newUser = `<tr>               
    //                                     <td>${userdata.name}</td>
    //                                     <td>${userdata.email}</td>
    //                                     <td>${userdata.contact}</td>                                                     
    //                                     <td>${userdata.password}</td>                                                     
    //                                 </tr>`;
    //             // append data in tablebody                  
    //             $('#tablebody').append(newUser);
    //         }
    //     }
    // });



    //logout on button click
    $(".logout").click(function () {
        // ajax call for logout
        $.ajax({
            type: "GET",
            url: "logout",
        }).done(function (data) {
            // redirect on the userlogin page, if status - success
            if (data.status == "success") {
                $(location).attr("href", "/userLogin");
            } else {
                $("#errorMessage").html(data.message);
            }
        });
    });

});
