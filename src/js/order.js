var d = document;

function order(line, type){
    
    var tbody = d.querySelector('#tabela-pacientes');
    var trs = tbody.querySelectorAll('tr');
    var arr = [];

    Array.from(trs).map((tr)=> {
        var tds = tr.querySelectorAll('td');
        arr.push(tds[line])
        if(type == "string") reorders = orderString(arr);
        if(type == "number") reorders = orderNumber(arr);
    })

    reorders.map(element=>{
        var tr = element.parentNode;
        tbody.appendChild(tr);
    })
}

function orderString(arr){ return arr.sort((a,b)=> a.innerHTML < b.innerHTML ? -1 : 1 );}
function orderNumber(arr){ return arr.sort((a,b)=> a.innerHTML - b.innerHTML) }