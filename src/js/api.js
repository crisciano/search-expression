var d = document;
var urlApi = "https://api-pacientes.herokuapp.com/pacientes";
var __table = d.querySelector('#tabela-pacientes');

// fetch(urlApi)
//     .then(res => res.json())
//     .then((res)=>{
//         res.map( paciente =>{ CreateTemplate(paciente) })
//     })

function Fetch(urlApi){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', urlApi);

    xhr.addEventListener('load', ()=> {
        var pacientes = JSON.parse(xhr.responseText);
        pacientes.map(paciente=> CreateTemplate(paciente))
    })

    xhr.send();
}
Fetch(urlApi);

// recever obj
function CreateTemplate(paciente){
    var tr = CreateElement('tr');
    tr.classList.add('paciente');

    var tdNome = CreateRow(paciente.nome, 'info-nome');
    var tdPeso = CreateRow(paciente.peso, 'info-peso');
    var tdAltura = CreateRow(paciente.altura, 'info-altura');
    var tdGordura = CreateRow(paciente.gordura, 'info-gordura');
    var tdImc = CreateRow(paciente.imc, 'info-imc');

    tr.appendChild(tdNome);
    tr.appendChild(tdPeso);
    tr.appendChild(tdAltura);
    tr.appendChild(tdGordura);
    tr.appendChild(tdImc);

    __table.appendChild(tr);
}

function CreateRow(value, className){
    var td = CreateElement('td');
    td.classList.add(className);
    td.innerHTML = value;
    return td;
}

function CreateElement(tag){
    return d.createElement(tag);
}
