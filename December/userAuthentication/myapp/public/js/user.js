$(document).ready(function () {
    console.log('Data +++++++ ');
    // declare fileId variable - null as global
    let fileId = null
    // declare fieldObj object as global
    let fieldObj = {}


    $(document).on('change', '.fieldClass', function () {

        // if ($(this).val() == "addField") {
        //     let newField = prompt("enter new field name");
        //     console.log(newField);
        //     $.ajax({
        //         type: "POST",
        //         url: "/addNewField",
        //         data: { newField: newField },
        //         success: function (res) {
        //             console.log('Data in fieldData ---------');
        //             console.log(res);
        //         },
        //         error: function (result) {
        //             alert('Error in add btn click')
        //         }
        //     });

        // }

        let previousValue = $(this).attr('name');
        console.log('previousValue ---------- ', previousValue);
        let current = $(this).val();
        console.log('current --------- ', current);

        if (fieldObj.hasOwnProperty(current)) {
            //alert(`${current} already selected `);
            toastr.options = {
                preventDuplicates: true,
                timeOut: 2000,
                progressBar: true,
                positionClass: "toast-top-right"
            }

            toastr.error(`Error!`, `${current} already selected!`, { iconClass: "toast-custom" })
            $(this).val(previousValue).attr("selected", true);
        }
        else {
            $(this).attr("name", current);
            // if select the "select value"
            if (current == '') {
                // delete the previous stored value in field bject
                delete fieldObj[previousValue];
            }
            // move on the selected value to another value
            else {
                // delete the previous stored value in field Object
                delete fieldObj[previousValue];

                // store selected value in field Object
                fieldObj[current] = 'selected';
            }
        }
        console.log('fieldObj-----', fieldObj);
    });





    // CSV-Form Validation 
    $("#csvform").validate({
        rules: {
            file: {
                required: true,
            },
        },
        messages: {
            file: {
                required: "Please choose csv file",
            },
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            console.log("CSV file : ", $("#file")[0].files[0]);
            let formData = new FormData(form);
            // console.log('formData----', formData);
            // POST Method
            $.ajax({
                type: "POST",
                url: "/import",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    console.log('Result +++++++++++++');
                    console.log(res.resKeys);
                    console.log(res.resValues);
                    // console.log(res.fileId);
                    // console.log(res.resValues.length);
                    fileId = res.fileId;
                    $("#csvTbl tr").empty();

                    let options = ``;
                    for (let field of res.allFields) {
                        options = options + `<option value='${field}'>${field}</option>`
                    }
                    console.log('Options------ after', options);

                    // $(".modal-body").html("");
                    for (let index = 0; index < res.header.length; index++) {
                        // append table-row and table-data on table body
                        $('.csvTbl').append("<tr class='table fields' id=" + res.header[index] + ">  <td>" + res.firstRow[index] + "</td> <td>" + res.secondRow[index] +
                            "</td> <td>  <select name='' class='fieldClass form-select'id=" + res.header[index] + "-dropdown > <option value='' >Select Value</option> " + options + " </select></td></tr>");

                    }
                    // $(".fields").html(" ");
                },
                error: function (result) {
                    alert('Error in import file..')
                }
            });
        }
    })


    // uploadBtn for mapping the fields as mapObject
    $(document).on("click", ".uploadBtn", function () {
        console.log('upload btn ---------');

        let fileObjId = fileId;
        // console.log('fileObjId ====== ', fileObjId)

        let checkBoxData = $("#skipHeader").prop("checked");
        console.log('check ------ ', checkBoxData)

        // get mapObject Object - checkBox value with dropDown value
        let mapObject = {}

        $("tr.fields").each(function () {
            // get value of haeder f
            let checkboxval = $(this).attr("id");
            console.log('chechbox val----', checkboxval);
            // get the dropdown selected value as dropDownVal
            let dropDownVal = $(`#${checkboxval}-dropdown option:selected`).val();
            mapObject[dropDownVal] = checkboxval;
            // console.log('dropDownVal-------', dropDownVal)
        });

        // console.log('mapObject-------', mapObject)

        $.ajax({
            type: "POST",
            url: "/mapRoute/" + fileObjId,
            data: { data: JSON.stringify({ mapObject: mapObject, skipHeader: checkBoxData }) },
            success: function (res) {
                console.log('Data in success ---------');
                console.log(res);
                $("#exampleModal").modal('hide');
                // $('input[type=checkbox]').prop('checked', false);
                //$('select option').each(function () { $(this).removeAttr('selected'); });
            },
            error: function (result) {
                alert('Error in upload btn click')
            }
        });
    });


    // logout on button click
    $(".logout").click(function () {
        $.ajax({
            type: "GET",
            url: "logout",
        }).done(function (data) {
            if (data.status == "success") {
                // redirect on the userlogin page, if status - success
                $(location).attr("href", "/userLogin");
            } else {
                $("#errorMessage").html(data.message);
            }
        });
    });


    // export data on export button click
    $(document).on('click', '.exportBtn', function () {
        let exportObj = {
            type: 'exportdata',
            exportId: $(this).attr("id")  // get the export button id
        }

        // log the export object
        console.log('Export data on click ----');
        console.log(exportObj);

        $.ajax({
            type: "post",
            url: "/",
            data: exportObj,
            success: function (res) {
                console.log('Exporting data---------');
                if (res.type == 'success') {
                    let a = $("<a />");
                    a.attr("download", res.fileName);
                    a.attr("href", `/csvdata/${res.fileName}`);
                    $("body").append(a);
                    a[0].click();
                    $("body").remove(a);
                    return;
                }
            },
            error: function (result) {
                // get alert on error
                alert('Error in export data ....')
            }
        });
    });


    // addBtn for add new field -------------------
    $(document).on("click", ".addBtn", function () {
        let newField = $('#field').val();
        console.log('Add btn value ==== ', newField);
       
        $.ajax({
            type: "POST",
            url: "/fieldData",
            data: { newField: newField },
            success: function (res) {

                if (res.type == "error") {
                    return alert(res.message);
                }

                console.log('Data in fieldData ---------');
                console.log(res);
                $(".fieldClass").append(`<option value='${newField}'>${newField}</option>`);

                alert(`${newField} field added`);
            },
            error: function (result) {
                alert('Error in add btn click')
            }
        });

    });


});
