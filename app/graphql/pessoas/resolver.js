Query: {
    resposta: () => {
        return 'resposta dada com sucesso'
    }
    saudacao: (_, args) => {
        return `ola ${args.nome} seja bem vindo`
    }
    findPessoaOne: (_, args) => {
        return db.collection('pessoas').findOne({codigo: args.codigo}).then((r)=>{
            return r;
        })
    }
    findPessoa: (_, args) => {
        return db.collection('pessoas').find(args.input).toArray().then((r)=>{
            return r
        })
    }
}
Mutation:{
    insertPessoa: (_, args) => {
        args.input.codigo = getCode()
        return db.collection('pessoas').insertOne(args.input).then((r)=>{
            return r.ops[0]
        })
    }

    updatePessoa: (_, args) => {
        return db.collection('pessoas').updateOne({codigo: args.codigo}, {$set: args.input})
        .then((r)=>{
            if(r.result.n>0) return 'registro alterado'
            else return 'error'
        })
    } 

    deletePessoa: (_, args) => {
        return db.collection('pessoas').deleteOne({codigo: args.codigo}).then((r)=>{
            if(r.result.n>0) return 'registro deletado'
            else return 'error'
        })
    }
}

