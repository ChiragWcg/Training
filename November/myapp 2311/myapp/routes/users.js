var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


{/* <script>
        $(document).ready(function () {
            $("#myform").validate({
                rules: {
                    firstname: {
                        required: true,
                        minlength: 3,
                    },
                    lastname: {
                        required: true,
                        minlength: 3,
                    },
                    address: {
                        required: true
                    },
                    gender: {
                        required: true,
                    },
                    hobbies: {
                        required: true,
                    },
                    imagefile: {
                        required: true,
                    },
                    interest: {
                        required: true,
                    },
                },

                messages: {
                    firstname: {
                        required: "Enter your first name",
                        minlength: "Your name must be at least 2 characters long",
                    },
                    lastname: {
                        required: "Enter your last name",
                        minlength: "Your name must be at least 2 characters long",
                    },
                    address: {
                        required: "Enter your address here",
                    },
                    gender: {
                        required: "Please select gender",
                    },
                    hobbies: {
                        required: "Please select hobbies",
                    },
                    imagefile: {
                        required: "Please choose any file",
                    },
                    interest: {
                        required: "Please select interested area",
                    },
                },
                errorPlacement: function (error, element) {
                    console.log("error")
                    console.log(error)
                    console.log("element")
                    console.log(element)

                    if (element.attr("name") == "gender") {
                        error.insertBefore("#temp");
                    }
                    else if (element.attr("name") == "hobbies") {
                        error.insertBefore("#temp2");
                    }
                    else {
                        error.insertAfter(element);
                    }
                }
            });
            for (let key in myObj) {
                        demoData.append(key, myObj[key]);
                    };
        });
    </script> */}


    /*
                    formData.append('firstName', $("#firstName").val());
                    formData.append('lastName', $("#lastName").val());
                    formData.append('address', $("#address").val());
                    formData.append('gender', $("input[type='radio']:checked").val());
                    formData.append('hobby', chkArray);
                    formData.append('image', $('#imagefile')[0].files[0]);
                    formData.append("interest", $('#interest').val());
            */


                    /*   var data = {
                           firstName: $('#firstName').val(),
                           lastName: $('#lastName').val(),
                           address: $('#address').val(),
                           gender: radiobuttonvalue,
                           hobbies: JSON.stringify(chkArray),
                           interest: $('#interest').val(),
                       }
                       console.log('Mydata : ' + data);
   */