const Note = require('../model/Note')

const creatNote = async(req,res)=>{
    
    try{
        const {noteContent} = req.body
        const note = new Note({
            noteContent
        })
        await note.save()
        res.status(201).json(note)

}
catch(error){
    console.log("There is an error : ",error)
    res.status(500).json({message:"Server Error"})
}
}

const getNotes = async(req,res)=>{
    
    try{
        const allNotes = await Note.find()
        res.status(200).json(allNotes)

    }
    catch(error){
        console.log("There is an error : ",error)
        res.status(500).json({message:"Server Error"})
    }
}

const updateNote = async(req,res)=>{
    try{
    const{noteContent} = req.body
    await Note.findByIdAndUpdate(req.params.id,noteContent)
    res.status(200).json("suscessfully updated the note")
    }
    catch(error){
        console.log(RangeError)
        res.status(500).json({message:"server error"})
    }
}

const deleteNote = async (req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Note Sucessfully Deleted"})
        }
    catch(error){
        console.log('error message: ',error)
        res.status(500).json({message:"server Error"})
    }
}

module.exports ={creatNote,getNotes,deleteNote, updateNote}