let a;
for (let index = 0; index < res.resKeys.length; index++) {
    // let a = "<tr></tr>"
    // append table-row and table-data on table body
    a += "<tr class='table fields' id=" + res.resKeys[index] + ">  <td>" + res.resKeys[index] + "</td> <td>" + res.resValues[index] +
    "</td> <td>  <select name='' class='fieldClass form-select'id=" + res.resKeys[index] + "-dropdown > <option value='' >Select Value</option> <option value='name'>Name</option> <option value='email'>Email</option> <option value='contact'>Contact</option></select></td></tr>";
    
    
}
$('.csvTbl').replaceWith(a);
