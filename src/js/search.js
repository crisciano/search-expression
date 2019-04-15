var d = document;

var inputSearch = d.querySelector('.search');
var pacientes = d.querySelectorAll(".paciente");

inputSearch.addEventListener('input', (event)=>{

    if (this.value.length > 0 ) {
        pacientes.forEach( paciente =>{
            var pacienteNome = paciente.querySelector('.info-nome').textContent;
            console.log(pacienteNome);
        })
        
    }
    

});