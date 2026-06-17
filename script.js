const inputTarefa = document.querySelector("#tarefa");
const btnAdicionar = document.querySelector(".adicionar");
const listaTarefas = document.querySelector(".lista-tarefas");
const filtro = document.querySelector("#filtro");
const todas = document.querySelector(".todas");
const pendentes = document.querySelector(".pendentes");
const concluidas = document.querySelector(".concluidas");
const quantidade = document.querySelector("#quantidade-span");
const nome = document.querySelector("#nome-usuario");
const tema = document.querySelector(".tema");

function salvarTarefas(){
    const tarefas = document.querySelectorAll(".tarefa");
    const lista = [];

    tarefas.forEach((tarefa) =>{
        const texto = tarefa.querySelector("p").innerText;
        const data = tarefa.querySelector(".data").innerText;
        const concluida = tarefa.classList.contains("concluida");

        lista.push({
            texto: texto,
            data: data,
            concluida: concluida
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(lista));
}

function carregarTarefas(){
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));

        tarefasSalvas.forEach((tarefa) => {
            adicionarTarefa(tarefa.texto, tarefa.data, tarefa.concluida);
        });
    }

function digitarNome(){
    const novoNome = prompt("Digite seu nome:", nome.innerText);
    nome.innerText = novoNome.trim();
}

digitarNome();


function atualizarQuantidade(){
    const lista = document.querySelectorAll(".tarefa:not(.escondida)");
    quantidade.innerText = lista.length;
}

function adicionarTarefa(textoSalvo = null, dataSalva = null, concluidaSalva = false){

    if(inputTarefa.value === "" && textoSalvo === null){
        alert("Digite uma tarefa")
        return
    }

    const textoDigitado = textoSalvo || inputTarefa.value;

    const novaTarefa = document.createElement("div")
    novaTarefa.classList.add("tarefa")

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.addEventListener("change", () =>{
    novaTarefa.classList.toggle("concluida")
    alterarCheck();
    atualizarQuantidade();
    salvarTarefas();
    });

    const textoTarefa = document.createElement("p")
    textoTarefa.innerText = textoDigitado

    const horario = document.createElement("span");
    if(dataSalva){
        horario.innerText = dataSalva;
    }else{
        const agora = new Date()
        horario.innerText = agora.toLocaleTimeString("pt-BR",{
            day:"2-digit",
            month:"2-digit",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit"
        });
    }
    horario.classList.add("data");

    const btnEditar = document.createElement("button")
    btnEditar.classList.add("editar")
    btnEditar.innerHTML = '<i class="fa-solid fa-pen"></i>'

    btnEditar.addEventListener("click", () =>{
        const novoTexto = prompt("Edite sua tarefa:", textoTarefa.innerText);
        if(novoTexto !== null && novoTexto.trim() !== ""){
            textoTarefa.innerText = novoTexto.trim();
            salvarTarefas();
        }
    })

    const btnExcluir = document.createElement("button")
    btnExcluir.classList.add("btn-excluir")
    btnExcluir.innerHTML = '<i class="fa-solid fa-trash-can"></i>'    
    btnExcluir.addEventListener("click", () =>{
        novaTarefa.remove();
        atualizarQuantidade();
        salvarTarefas();
    });

    if(concluidaSalva){
        novaTarefa.classList.add("concluida");
        checkBox.checked = true;
    }

    novaTarefa.appendChild(checkBox)
    novaTarefa.appendChild(textoTarefa)
    novaTarefa.appendChild(horario)
    novaTarefa.appendChild(btnEditar)
    novaTarefa.appendChild(btnExcluir)

    listaTarefas.appendChild(novaTarefa);

    inputTarefa.value = ""

    alterarCheck();
    atualizarQuantidade();
    salvarTarefas();
} 

tema.addEventListener ("click", () => {
    document.body.classList.toggle("tema-claro");
})

btnAdicionar.addEventListener("click", () => {
    adicionarTarefa();
});

inputTarefa.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        adicionarTarefa();
    }
})

function alterarCheck(){
    const tarefas = document.querySelectorAll(".tarefa")

    tarefas.forEach((tarefa) => {
        if(filtro.value === "todas"){
            tarefa.classList.remove("escondida")
            todas.classList.add("ativa");
            pendentes.classList.remove("ativa");
            concluidas.classList.remove("ativa");
        }

        if(filtro.value === "concluidas"){
            if(tarefa.classList.contains("concluida")){
                tarefa.classList.remove("escondida")
            }else{
                tarefa.classList.add("escondida")
            }
            todas.classList.remove("ativa");
            pendentes.classList.remove("ativa");
            concluidas.classList.add("ativa");
        }

        if(filtro.value === "pendentes"){
            if(tarefa.classList.contains("concluida")){
                tarefa.classList.add("escondida")
            }else{
                tarefa.classList.remove("escondida")
            }
            todas.classList.remove("ativa");
            pendentes.classList.add("ativa");
            concluidas.classList.remove("ativa");
        }
        
        atualizarQuantidade();
    });
}


filtro.addEventListener("change", () =>{
    alterarCheck();
});

todas.addEventListener("click", () =>{
    filtro.value ="todas";

    todas.classList.add("ativa");
    pendentes.classList.remove("ativa");
    concluidas.classList.remove("ativa");

    alterarCheck();
    atualizarQuantidade();
})

pendentes.addEventListener("click", () =>{
    filtro.value ="pendentes";

    todas.classList.remove("ativa");
    pendentes.classList.add("ativa");
    concluidas.classList.remove("ativa");

    alterarCheck();
    atualizarQuantidade();
})

concluidas.addEventListener("click", () =>{
    filtro.value ="concluidas";
    
    todas.classList.remove("ativa");
    pendentes.classList.remove("ativa");
    concluidas.classList.add("ativa");

    alterarCheck();
    atualizarQuantidade();
})


carregarTarefas();
atualizarQuantidade();
