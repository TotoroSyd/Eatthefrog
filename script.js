"use strict";
let edit_btn = document.querySelector("#edit_btn");
let create_btn = document.querySelector("#create_btn");
let modal_title = document.querySelector("#modal_title");
edit_btn.onclick = function () {
  modal_title.innerText = "Edit Task";
  modal_title.value = modal_title.innerText;
};

create_btn.onclick = function () {
  modal_title.innerText = "Create Task";
  modal_title.value = modal_title.innerText;
};
