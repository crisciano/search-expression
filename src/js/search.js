var d = document;

var inputSearch = d.querySelector('.search');

inputSearch.addEventListener("input", function(){
    var pacientes = d.querySelectorAll(".paciente");
    
    if (this.value.length > 0 ) {
        pacientes.forEach( paciente =>{
            var pacienteNome = paciente.querySelector('.info-nome').textContent;
            var expression = new RegExp(this.value, "i");
            if(expression.test(pacienteNome)) paciente.classList.remove('none');
            else paciente.classList.add('none'); 
        });
    }else  pacientes.forEach( paciente => paciente.classList.remove("none") );
});