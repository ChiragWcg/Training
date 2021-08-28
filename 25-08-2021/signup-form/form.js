$().ready(function () {
    $("#myform").validate({
        ignore: "input:hidden:not(input:hidden.required)",
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 10,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10,
            },
            address: {
                required: true,
                minlength: 15,
                maxlength: 160,
            },
            datepicker: {
                required: true,
                date: true,
            },
            time: {
                required: true,
            },
            chosen1: {
                required: true,
            },
            chosen2: {
                required: true,
            },
            editor: {
                required: true,
            },
            editor1: {
                required: true,
            },
        },

        messages: {
            name: {
                required: "Enter your name",
                minlength: "Your name must be at least 3 characters long",
                maxlength: "Your name maximum 10 characters as long",
            },
            email: "Enter a valid email address",
            phone: {
                required: "Enter your contact number",
                minlength: "Contact nummber must be of 10",
                maxlength: "Contact nummber must be of 10",
            },
            address: {
                required: "Enter your address",
                minlength: "Address must be of 15",
                maxlength: "Address must be of 160",
            },
            datepicker: {
                required: "Enter your Date of Birth",
            },
            time: {
                required: "Enter your Birth Time",
            },
            chosen1: {
                required: "Select your city",
            },
            chosen2: {
                required: "Select your hobbies",
            },
            editor: {
                required: 'Write about yourself',
            },
            editor1: {
                required: 'Write introduction about youself',
            },
        },
    });
});