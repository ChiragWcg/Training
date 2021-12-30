// $(document).ready(function () {

//     $(document).on('click', '.exportBtn', function () {
//         let exportObj = {
//             type: 'exportdata',
//             exportId: $(this).attr("id")
//         }
//         console.log('Export data on click ----');
//         console.log(exportObj);

//         $.ajax({
//             type: "post",
//             url: "/export",
//             data: exportObj,
//             success: function (res) {
//                 console.log('Exporting data---------');
//                 if (res.type == 'success') {
//                     let a = $("<a />");
//                     a.attr("download", res.fileName);
//                     a.attr("href",`/csvdata/${ res.fileName}`);
//                     $("body").append(a);
//                     a[0].click();
//                     $("body").remove(a);
//                     return;
//                 }
//             },
//             error: function (result) {
//                 alert('Error in export....')
//             }
//         });
//     })

// });