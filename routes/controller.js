const db = require('../config/config').ConnectDB()
async function CreateDoc(req,res){
    const obj = {
        name: req.body.name,
        age: req.body.age
    }

    const data = await db.insert(obj)
    console.log(data)
    return res.send("Inserted data with name: "+obj.name)
}

async function GetDocs(req,res){
    const data  = await db.list({include_docs:true})
    console.log(data)
    const rows = data.rows
    let arr =[]
    await rows.forEach(element => {
        arr.push(element.doc.name)
    });
    console.log(arr)
    return res.send("All Documents names: "+arr)
}

module.exports={
    CreateDoc,
    GetDocs
}