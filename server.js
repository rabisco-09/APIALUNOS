const express = require("express")

const app = express();

app.use(express.json())

const PORT = 3000;

const ALUNOS = [

]

const alunos =[
    {
        id: 1,
        nome: "vitor lindao",
        cor: "amarelo",
        idade: "18"
    },
    {
        id: 2,
        nome: "neymar",
        cor: "azul",
        idade: "33"
    },
    {
        id: 3,
        nome: "foden",
        cor: "branco",
        idade: "27"
    }
]
app.get("/",(req, res)=>{
    res.json({
    msg: "hello world"
    })
})

app.get("/alunos",(req, res)=>{
    res.json(ALUNOS);
})

app.get("/alunos/:id", (req, res)=>{ 
    const id = Number(req.params.id)
    console.log(`valor recebido ${id}`);
    const aluno = ALUNOS.filter( (a) => a.nome == id )
    if(aluno.length > 1){
        res.status(200).json(aluno) 
    }
    res.status(404).json({msg: "alunos nao encontrado"}) 
})

app.get("/alunos/:cor", (req, res)=>{
    
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodadando em http//:localhost:${PORT}`)
})