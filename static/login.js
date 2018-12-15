const server = "http://localhost:5000"
$(document).ready(() => {
	$('#login').click((e) =>{
		if($('#email').val() != ""){
			if($('#password').val() != ""){
				email  = $('#email').val();
				password = $('#password').val();
				newJson = {"email": email, "password": password}
				fetch(server+"/login",{
					method: "POST",
					body: JSON.stringify(newJson)
				}).then((response)=>{
					response.json().then((data)=> {
						if(data.status == "200"){
							console.log("logged")
							localStorage.setItem('email', data.email);		
							localStorage.setItem('password', data.password);		
							localStorage.setItem('idToken', data.idToken);
							window.location.replace("/index	")	
						}
						else{
							if(data.status == "404"){
								console.log("Email ou senha incorreto")
							}
						}
					})
				})
			}
			else{
				alert("A senha nao pode ser vazia");
			}
		}
		else{
			alert("Usuario vazio");
		}
	})

	$("#signup").click((e) => {
		if($('#email').val() != ""){
			if($('#password').val() != ""){
				if($('#password').val().length < 6){
					alert("Senha deve ter no minimo 6 caracteres")
				}
				else{
					newUser  = $('#email').val();
					newPass = $('#password').val();
					json = {"email": newUser, "password": newPass};
					fetch(server+"/singup", {
						method: "POST",
						body : JSON.stringify(json)
					}).then ((response)=> {
						response.json().then((data)=> {
							if(data.status == "200"){
								console.log("created")
								localStorage.setItem('email', data.email);		
								localStorage.setItem('password', data.password);		
								localStorage.setItem('idToken', data.idToken);		
								window.location.replace("/index	")
							}
							else{
								if(data.status == "404"){
									console.log("Email ja existe")
								}
							}
						})
					})
				}
			}
			else{
				alert("A senha nao pode ser vazia");
			}
		}
		else{
			alert("Usuario vazio");
		}	
    })

})