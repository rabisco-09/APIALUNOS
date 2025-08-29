// importa a biblioteca
const express = require("express"); // framework web
// cria a aplicação express
const app = express();
app.use(express.json());
const PORT = 3000;

const ALUNOS = [
    {
        id: 1, nome: "Vitor Lima", cor: "Azul", idade: 26
    },
    {
        id: 2, nome: "João Gamer", cor: "Preto",  idade: 17
    },
    {
        id: 3, nome: "Henry Sem ducha",cor: "Verde",idade: 19
    },
]

app.get("/", (req, res) => {
    res.json({
        mensagem: "Hello world"
    })
})

app.get("/alunos",(req, res)=>{
    res.json(ALUNOS);
})

app.get("/alunos/:id", (req , res)=>{
    const id = Number(req.params.id)
    console.log(`Valor recebido ${id}`);
    
    const aluno = ALUNOS.filter( (aluno) => aluno.id === id )
    if(aluno.length > 0){
        res.status(200).json(aluno)
    }else{
        res.status(404).json({ msg: "Aluno não encontrado"})
    }     
})

app.get("/alunos/cor/:cor", (req, res) => {
    const cor = req.params.cor;
    console.log(`Cor recebida: ${cor}`);    
    const alunosFiltrados = ALUNOS.filter(
        (aluno) => aluno.cor.toLowerCase() === cor.toLowerCase()
    );
    if (alunosFiltrados.length > 0) {
        res.status(200).json(alunosFiltrados);
    } else {
        res.status(404).json({ msg: "Nenhum aluno encontrado com essa cor" });
    }
});

app.post("/alunos", (req, res)=>{
    const{nome, cor, idade}  = req.body;

    if(nome || !cor || !idade)
        return res.status(400).json({msg : "nome cor e idade sao obrigatoria"})
})

app.delete("/alunos/:id", (req, res)=>{
    const id = Number(req.params.id);
    const indice = ALUNOS.findIndex((aluno)=>{ aluno.id === id})
    console.log(indice)
})


app.post("/alunos", (req, res)=>{
    const informaçao = req.body;
    console.log(informaçao);
    ALUNOS.push(informaçao);
    res.status(201).json({mensagem: "aluno criado com sucesso"});
})


app.put("/alunos/:id", (req, res) =>{
    const id = Number(req.params.id);
    const {nome, cor, idade} = req.body;

    const indice = ALUNOS.findIndex(aluno => aluno.id === id)

    if(indice === -1){
        return res.status(404),json({msg: "aluno nao encontrado"})
    }
    if(!nome || !cor || !idade){
        return res.status(400).json({msg: "nome, cor e idade sao obrigatorias"})
    }
    ALUNOS[indice] = {id, nome, cor, idade}

res.status(200).json({msg: "aluno atualizado com sucesso!"})

    // console.log(indice)
    // console.log(ALUNOS[indice])


})









app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})