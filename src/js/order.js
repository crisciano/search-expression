var d = document;

// 0 - nome     - string
// 1 - peso     - number
// 2 - altura   - number
// 3 - gordura  - number
// 4 - imc      - number

function order(line, type){
    // console.log(`${line} - ${type}`);
    
    var tbody = d.querySelector('#tabela-pacientes');
    var trs = tbody.querySelectorAll('tr');
    var arr = [];

    Array.from(trs).map((tr)=> {
        var tds = tr.querySelectorAll('td');
        arr.push(tds[line])
        if(type == "string") reorders = orderString(arr);
        if(type == "number") reorders = orderNumber(arr);
        // reorders = arr.sort((a,b)=>{ 
        //     // if(type == "string"){
        //     //     console.log(type);
        //     //     if(a.innerHTML < b.innerHTML) { return -1; }
        //     //     if(a.innerHTML > b.innerHTML) { return 1; }
        //     //     return 0;
        //     // }else if( type == 'number' ) {
        //     //     console.log(type);
        //         a.innerHTML - b.innerHTML
        //     // }
        // });
    })
    reorders.map(element=>{
        var tr = element.parentNode;
        tbody.appendChild(tr);
    })
}

function orderString(arr){
    return arr.sort((a,b)=>{ 
        if(a.innerHTML < b.innerHTML) { return -1; }
        if(a.innerHTML > b.innerHTML) { return 1; }
        return 0;
    });
}
function orderNumber(arr){ return arr.sort((a,b)=> a.innerHTML - b.innerHTML) }