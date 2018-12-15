const server = "http://localhost:5000"
$(document).ready(() => {
    email = localStorage.getItem('email')
    if(email){
        $('#user').text(email)
    }

    fetch(server+"/getTarefas", {
        method: "POST",
        body: JSON.stringify({idToken: localStorage.idToken})
    }).then((response) => {
        response.json().then((data) => {
            if(data.isEmpty){
                console.log("Sem tarefas para esse usuário")
            }
            else{
                for([k,v] of Object.entries(data)) {
                    console.log(v)
                    $('#tarefas').append(  
                        "<div class='col s3 m3'>" +
                        "<div class='card cyan darken-3' id='card"+k+"'>" +
                            "<div class='card-content white-text'>" + 
                                "<span class='card-title'>"+ v.title +"</span>" + 
                                "<p contenteditable='true'>"+v.content+"</p>"+
                            "</div>"+
                            "<div class='card-action' id='"+k+"'>"+
                                "<a href='#' class='edit'>Editar</a>"+
                                "<a href='#' class='remove'>Remover</a>"+
                            "</div>"+
                        "</div>"+
                        "</div>"
                )
                }   
                $(".remove").click((e) => {
                    onRemoveClick(e)
                })
        
                $(".edit").click((e) => {
                    onEditClick(e)
                })
            }
        })
    })

  $("#addButton").click((e) => {
    title = $("#title").val()
    content = $("#content").val()
    idToken = localStorage.idToken
    newTarefa = {"title": title, "content": content, "idToken": idToken}
    console.log(newTarefa)
    fetch(server+"/addTarefa", {
          method: 'POST',
          body: JSON.stringify(newTarefa)
    }).then((response) => {
        response.json().then((data) => {
              if(data.status == "200"){
                    console.log("Done")
                    location.reload()
              }
        })
    })
  })
  

  var onRemoveClick = ((e) =>{
    // title = $(e.target).parent().parent().children("div.card-content.white-text").children("span.card-title").text()
    id = $(e.target).parent()[0].id
    fetch(server+"/removeTarefa", {
        method: 'POST',
        body: JSON.stringify({"id": id})
    }).then((response) => {
        response.json().then((data) => {
            if(data.status == "200"){
                location.reload()
            }
        })
    })
  })

  var onEditClick = ((e) =>{
    id = $(e.target).parent()[0].id
    content = $(e.target).parent().parent().children("div.card-content.white-text").children("p").text()
    fetch(server+"/updateTarefa", {
        method: 'POST',
        body: JSON.stringify({"id": id, "content": content})
    }).then((response) => {
        response.json().then((data) => {
            if(data.status == "200"){
                location.reload()
            }
        })
    })
  })
})