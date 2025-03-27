const newNote = document.getElementById('newNoteBox') ;     // NEW NOTE CREATION BUTTON

const updateLSData = () => {
    const textareaData = document.querySelectorAll("textarea") ;        // 17. FETCH ALL DATA
    const notes = [] ;
    // console.log(textareaData[0].value) ;
    textareaData.forEach((elem) => {
        return notes.push(elem.value) ;             // 18. INSERT ALL DATA INTO AN ARRAY
    })

    localStorage.setItem('notes', JSON.stringify(notes) ) ;     // 19 PUT THE ARRAY INSIDE A SINGLE KEY
}

const addNewNote = (text='') => {                       // 2. THIS FUNCN WILL CREATE NOTE

    const nBox = document.createElement("div") ;        // 3. CREATE A DIV
    nBox.classList.add("notesBox") ;                    // 4. INSERT THE NECESSARY CLASS
                                                        // 5. INSERT HTML CONTENT
    const noteHTML = `
    <div class="operation">
        <div class="btns">
            <button class="edit"><span class="material-symbols-outlined">edit_note</span></button>
            <button class="delete"><span class="material-symbols-outlined">delete_forever</span></button>
        </div>
    </div>

    <div class="main ${text? "":"hidden"}"></div>
    <textarea class="ipArea ${text ? "hidden":""} " ></textarea>
    `;
    /**
     *  IF TEXT EXISTS, UNHIDE DIV
     *  IF TEXT EXISTS, HIDE TEXT AREA
    */

    nBox.insertAdjacentHTML("afterbegin",noteHTML) ;        // 6. INSERT THE HTML CONTENT INTO THE NEWLY CREATED DIV

    // console.log(nBox) ;
    const noteSect = document.getElementById("notes");      // 7. GET THE SECTION YOU WANT TO INSERT THE DIV, (I HAVE NAMED THE SECTION NOTES, WHERE I WILL INSERT ALL THE NOTES)
    noteSect.appendChild(nBox) ;                        // 8. APPEND(INSERT FROM BACK) THE NEWLY CREATED DIV INTO THE SECTION


    // Getting the references

    // BUTTONS
    const editButton = nBox.querySelector(".edit") ;
    const delButton = nBox.querySelector(".delete") ;
    // DIV AND TEXT AREA
    const mainDiv = nBox.querySelector(".main") ;
    const txtAr = nBox.querySelector("textarea") ;

    
    //  Toggle using edit icon
    
    txtAr.value = text;                 // 9. IF TEXT EXIST, INSET THEM INSIDE TEXT AREA AND DIV
    mainDiv.innerHTML = text ;

    txtAr.addEventListener("change", (event) => {       // 10. IF USER HAS PRESSED ENTER OR CHANGED EVENT, THE TEXT AREA WILL REATIN THE TEXT BUT WE NOW HAVE TO INSERT IT INTO THE DIV
        const value = event.target.value ;              // 11. STORE THE TEXT AREA VALUE
        // console.log(value) ;
        mainDiv.innerHTML = value ;                     // 12. STORE IT INTO THE MAIN DIV
        
        updateLSData() ;                                // 13. UPDATE THE LOCAL STORAGE
        
    })
    
    editButton.addEventListener("click",()=>{           // 14. SET UNSET THE CLASSES
        mainDiv.classList.toggle('hidden') ;
        txtAr.classList.toggle('hidden') ;
    })
    
    
    //  Deleting the Note
    // delButton is a subset of nBox, if nBox exist then only delButton exists. Thus by by the subset we are accessing the nBox and removing it
    delButton.addEventListener("click", ()=> {          // 15. IF SOMEONE HAS CLICKED THE BUTTON INSIDE nBox, THEN DELETE nBox
        nBox.remove() ;
        updateLSData() ;        // 16. EACH TIME A DATA / (NOTES BOX) IS REMOVED, UPDATE THE LOCAL STORAGE
    })
}


// ------- {

//  Get data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes')) ;

if (notes) {
    notes.forEach((note) => addNewNote(note) ) ;
}

// ------- }    // THIS IS NOT MENTIONED INSIDE ANY ASYNCHRONOUS FUNCTION, THUS IT WILL RUN LIKE A NORMAL PIECE OF CODE
//          THUS ON LOAD, WHEN THE PROGRAM RUN, IRRESPECTIVE OF ANY EVENT, THIS PART WILL RUN

newNote.addEventListener("click",() =>{         // 1. IF CLICKED ADD A NEW NOTE
    addNewNote() ;
}) ;