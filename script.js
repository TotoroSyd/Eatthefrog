let edit_btn = document.querySelector("#edit_btn");
let create_btn = document.querySelector("#create_btn");

edit_btn.onclick = function (){
    modal_title.innerText = "Edit Task";
    modal_Title.value = modal_Title.innerText;
    }

    create_btn.onclick = function (){
        modal_title.innerText = "Create Task";
        modal_Title.value = modal_Title.innerText;
        }