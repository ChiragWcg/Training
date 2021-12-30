$(document).ready(function () {
    let sortingObj = {};

    let serchValue;
    let genderValue;
    let page;
    let sortingOrder;
    let sortingField;

    // Form Validation 
    $("#form").validate({
        rules: {
            firstName: {
                required: true,
                minlength: 3,
            },
            lastName: {
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
            // imagefile: {
            //     required: true,
            // },
            interest: {
                required: true,
            },

        },
        messages: {
            firstName: {
                required: "Enter your first name",
                minlength: "Your name must be at least 3 characters long",
            },
            lastName: {
                required: "Enter your last name",
                minlength: "Your name must be at least 3 characters long",
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
            // imagefile: {
            //     required: "Please choose any file",
            // },
            interest: {
                required: "Please select interested area",
            },

        },
        errorPlacement: function (error, element) {

            if (element.attr("name") == "gender") {
                error.insertBefore("#temp");
            }
            else if (element.attr("name") == "hobbies") {
                error.insertBefore("#temp2");
            }
            else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var radiobuttonvalue = $("input[type='radio']:checked").val();

            var hobbiesdata = [];
            $("#form input:checkbox:checked").each(function () {
                hobbiesdata.push($(this).val());
            })
            console.log("Image file : ", $("#imagefile")[0].files[0]);

            let formData = new FormData(form);

            // POST Method
            $.ajax({
                type: "POST",
                url: "/userdata",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    let newUser = `<tr class = ${res._id}>               
                                        <td>${res.firstName}</td>
                                        <td>${res.gender}</td>
                                        <td>${res.address}</td>
                                        <td><img src="/images/${res.imagefile}" alt="" height="100px" width="155px"></td>

                                        <td class="text-center">
                                            <button class="editBtn btn btn-primary" id="${res._id}">Edit</button>
                                            <button class="deleteBtn btn btn-danger" id="${res._id}">Delete</button>                        
                                        </td>                   
                                    </tr>`;

                    $('#tablebody').append(newUser);
                    $('#form')[0].reset();
                },
                error: function (result) {
                    alert('Error..')
                }
            });

        }
    })


    // EDIT - GET method
    $(document).on("click", ".editBtn", function () {
        let id = $(this).attr("id");

        $.ajax({
            type: "get",
            url: "/edit/" + id,
            dataType: "json",

            success: function (res) {
                console.log(res);
                let hobby = res.hobbies[0].split(",");

                $('#firstName').val(res.firstName);
                $('#address').val(res.address);
                $('input[name="gender"][value="' + res.gender + '"]').attr('checked', true);
                $("#hobbies").find("[value=" + hobby.join("], [value=") + "]").attr("checked", true);
                $('#interest').val(res.interest);
                $('<img class="img" src="/images/' + res.imagefile + '" height="100", width="155"/>').insertAfter('#imagefile');
                $('#btn').html('Update').data("id", res._id).attr("class", "update btn btn-success").attr("type", "button");
                $('<button class="btn btn-danger cancel">cancel</button>').insertAfter('.btns').attr("type", "button");
                $('.editBtn').attr('disabled', true);
            },
            error: function (result) {
                alert('Error in update record')
            }
        });
    });


    // Cancel -- Button
    $(document).on("click", ".cancel", function () {
        $('#form')[0].reset();
        $('.editBtn').attr('disabled', false);
        $('.img').remove();
        $('.cancel').hide();
        $('#btn').html('Submit').data("id", "").attr("class", "btn btn-primary").attr("type", "submit");
    });


    // Update data - PUT Method
    $(document).on("click", ".update", function () {
        console.log();
        var hobbiesArray = []
        $(':checkbox:checked').each(function () { hobbiesArray.push($(this).val()); });

        const formdata = new FormData();
        formdata.append('firstName', $("#firstName").val());
        formdata.append('address', $("#address").val());
        formdata.append('gender', $("input:radio:checked").val());
        formdata.append('interest', $('#interest').val());
        formdata.append('hobbies', hobbiesArray);
        formdata.append('imagefile', $('#imagefile')[0].files[0]);

        let dataId = $(this).data('id');

        $.ajax({
            url: '/edit/' + dataId + '',
            method: 'put',
            processData: false,
            contentType: false,
            data: formdata,
            success: function (res) {
                console.log(res);
                $('.' + dataId).replaceWith(`<tr class = ${res._id}>               
                                        <td>${res.firstName}</td>
                                        <td>${res.gender}</td>
                                        <td>${res.address}</td>
                                        <td><img src="/images/${res.imagefile}" alt="" height="100px" width="155px"></td>

                                        <td class="text-center">
                                            <button class="editBtn btn btn-primary" id="${res._id}">Edit</button>
                                            <button class="deleteBtn btn btn-danger" id="${res._id}">Delete</button>                        
                                        </td>                   
                                    </tr>`);
                $('#btn').html('Submit').data("id", "").attr("class", "btn btn-primary").attr("type", "submit");
                $('#form')[0].reset();
                $('.editBtn').attr('disabled', false);
                $('.img').remove();
                $('.cancel').remove();
            },
            error: function (error) {
                console.log(error);
            }
        })
    });


    // DELETE Record
    $(document).on("click", ".deleteBtn", function () {

        let id = $(this).attr("id");
        console.log(id)
        $.ajax({
            type: "delete",
            url: "/delete/" + id,
            dataType: "json",
            success: function (res) {
                $('.' + id).html("")
            },
            error: function (result) {
                alert('Error in delete record')
            }
        });
    });


    // Sorting -- Sort the record
    $(document).on('click', '.sortingClass', function () {
        sortingOrder = $(this).attr('sortOrder');
        sortingField = $(this).attr('id');
        console.log('---=====----');
        console.log(sortingOrder);
        console.log(sortingField);

        // sorting data object
        sortingObj = {
            sortOrder: $(this).attr('sortOrder'),  // get sort order
            sortField: $(this).attr("id"),         // get sort Field
        }
        // print sortingObj
        console.log(sortingObj);

        // condition for check sortorder 1(asc) || -1(desc)
        if ($(this).attr('sortOrder') == 1) {
            $(this).attr('sortOrder', -1);
        }
        else {
            $(this).attr('sortOrder', 1);
        }
        $.ajax({
            url: '/sortdata',
            method: 'POST',
            data: sortingObj,
            success: function (modeldata) {
                console.log('===========');
                // console.log(JSON.stringify(modeldata));   

                // empty the tablebody 
                $('#tablebody').empty();
                for (let getdata of modeldata) {
                    let newUser = `<tr>               
                                        <td>${getdata.firstName}</td>
                                        <td>${getdata.gender}</td>
                                        <td>${getdata.address}</td>
                                        <td><img src="/images/${getdata.imagefile}" alt="" height="100px" width="155px"></td>    
                                        <td class="text-center">
                                            <button class="editBtn btn btn-primary" id="${getdata._id}">Edit</button>
                                            <button class="deleteBtn btn btn-danger" id="${getdata._id}">Delete</button>                        
                                        </td>                                                       
                                    </tr>`;
                    // append data in tablebody                  
                    $('#tablebody').append(newUser);
                }
            },
            error: function (result) {
                console.log(error);
            }
        })
    })


    // // Pagination
    $(document).on('click', '.pageBtn', function () {
        page = $(this).attr('page');
        sortingObj;
        // pagination data object
        let pageObj = {
            type: 'pagination',
            page: $(this).attr('page'),
            sortOrder: sortingOrder,
            sortField: sortingField,
        }
        console.log('Page no. on click -----');
        console.log(pageObj.page);

        $.ajax({
            type: "post",
            url: "/sortdata",
            data: pageObj,
            success: function (modeldata) {
                console.log('Pagination in success ---- ');
                // console.log(pageObj);
                console.log('=====');
                console.log(modeldata.result2);
                // empty tablebody
                $('#tablebody').empty();
                for (let getdata of modeldata.result) {
                    let newUser = `<tr>               
                                        <td>${getdata.firstName}</td>
                                        <td>${getdata.gender}</td>
                                        <td>${getdata.address}</td>
                                        <td><img src="/images/${getdata.imagefile}" alt="" height="100px" width="155px"></td>   
                                        <td class="text-center">
                                            <button class="editBtn btn btn-primary" id="${getdata._id}">Edit</button>
                                            <button class="deleteBtn btn btn-danger" id="${getdata._id}">Delete</button>                        
                                        </td>                                                      
                                    </tr>`;
                    // append data in tablebody
                    $('#tablebody').append(newUser);
                }
                // empty the pagination class
                $(".pagination").empty();                
                for(i=1; i<=modeldata.result2; i++){
                    $(".pagination").append(`<li class="page-item"><a class="pageBtn page-link" id="${i}" page="${i}" href="javascript:void[0]">${i}</a></li>`)
                }
            },
            error: function (result) {
                alert('Error in pagination')
            }
        });
    })


    // Searching
    $(document).on('click', '.searchBtn', function () {
        // serachdata object
        let searchObj = {
            type: 'searching',
            searchField: $('.search').val(),
            gender: $('#gender').val(),
        }
        console.log('Search value on click -----');
        console.log(searchObj);

        $.ajax({
            type: "post",
            url: "/sortdata",
            data: searchObj,
            success: function (modeldata2) {
                console.log('Searching in success ---- ');
                console.log(modeldata2);

                $('#tablebody').empty();
                console.log('++++++++++');
                console.log(modeldata2);
                for (let getdata of modeldata2) {
                    let newUser = `<tr>               
                                        <td>${getdata.firstName}</td>
                                        <td>${getdata.gender}</td>
                                        <td>${getdata.address}</td>
                                        <td><img src="/images/${getdata.imagefile}" alt="" height="100px" width="155px"></td> 
                                        <td class="text-center">
                                            <button class="editBtn btn btn-primary" id="${getdata._id}">Edit</button>
                                            <button class="deleteBtn btn btn-danger" id="${getdata._id}">Delete</button>                        
                                        </td>                                                          
                                    </tr>`;
                    $('#tablebody').append(newUser)
                }
            },
            error: function (result) {
                alert('Error in seraching')
            }
        });
    })



    // Export data
    $(document).on('click', '.exportBtn', function () {
        let exportObj = {
            type: 'exportdata',
            exportId: $(this).attr("id")
        }
        console.log('Export data on click ----');
        console.log(exportObj);

        $.ajax({
            type: "post",
            url: "/sortdata",
            data: exportObj,
            success: function (modeldata) {
                      console.log('Exporting d---------');  
                      console.log(modeldata);     
            },
            error: function (result) {
                alert('Error in export....')
            }
        });
    })

});