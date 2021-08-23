$().ready(function () {
  $("#commentForm").validate({
    rules: {             
      password: {
        required: true,
        minlength: 6,
        password: true,
      },
      confirm_password: {
        equalTo: "#password",
      },
    },


    messages: {      
      password: {
        required: "Please enter a password",
        minlength: "Your password at least 6 characters long",
      },
      confirm_password: {
        equalTo: "#please enter password same as above",
      },

    },

  });
});