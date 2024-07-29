
const content = document.getElementById("inputnote");
const saveButton = document.getElementById('savenote');
const allNoteBtn = document.getElementById('allnotes');
let recent = document.getElementById('recent-note')


function newLists(){
    console.log('calling newLists')
    axios.get('http://localhost:5000/notes')
    .then(response =>{
        const newList = document.getElementById('noteList')
        newList.innerHTML=''
        response.data.forEach(note =>{
            console.log(note)
            const eachNoteElement = document.createElement('div')
            eachNoteElement.className='noteEl'
            eachNoteElement.innerHTML=`<span>${note.noteContent}</span>
            <button onclick='deleteNote("${note._id}")'>Delete<bustton>`
            newList.appendChild(eachNoteElement)
        })
       
    })
}
function recentNoteDisplay(time){
    console.log("calling recent fuction")
    axios.get('http://localhost:5000/notes')
    .then(response =>{
        console.log("this is recent"+response.data[0].noteContent)
        const newData= response.data.reverse()[0]
            const recent = document.getElementById('recent-note')
            const recentData =document.createElement('p')
             recentData.id="recentnoteblock"
           // recentData.textContent = "Recent Note:- "+  newData.noteContent+ " Creted at "+ time;
            recentData.innerHTML = `Recent Note: ${newData.noteContent} </br> Created at ${time}`;

            recent.appendChild(recentData)

            
    })

}


saveButton.addEventListener('click',async ()=>{
    console.log('button working')
    if (content.value===""){
        recent.style.display='none'
        const errEl = document.getElementById('errorMessageId')
        errEl.textContent="PLEASE WRITE YOUR NOTE PLEASE "
    }else{
         recent.style.display='block'
        const errEl = document.getElementById('errorMessageId')
        errEl.textContent=""
        recent.removeChild(recentnoteblock)
    axios.post('http://localhost:5000/notes',{noteContent:content.value})
    .then(response=>{
        console.log(response.data)
       let resData =response.data
       let time= new Date()
       recentNoteDisplay(time)
    })
    content.value=""
    //newLists()
    }

})

allNoteBtn.addEventListener('click', newLists)

function deleteNote(id){
    axios.delete(`http://localhost:5000/notes/${id}`)
    .then(response=>{
        console.log(response)
        newLists()
    })
}
