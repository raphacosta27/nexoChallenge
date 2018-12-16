# nexoChallenge
Repositorio para desenvolvimento do Nexo Challenge 2018/2

Para o desafio utilizei as seguintes ferramentas: </br>
<h4> Back </h4>

- [Python Flask](http://flask.pocoo.org) - Servidor para a API </br>
- [Firebase](https://firebase.google.com/) - Banco de Dados </br>
- [Pyrebase](https://github.com/thisbejim/Pyrebase) - Python Firebase Wrapper </br>

[Arquivo Correspondente - server.py](https://github.com/raphacosta27/nexoChallenge/blob/master/server.py)

<h4> Front </h4>

- HTML</br>
- [Javascript](https://www.javascript.com) - Modificações e inserções no DOM</br>
- [Materialize](https://materializecss.com/) - Front-End Framework </br>
- [GIPHY](https://developers.giphy.com/) - API externa utilizada

[Arquivos estáticos - /static](https://github.com/raphacosta27/nexoChallenge/tree/master/static) </br>
[Arquivos de html - /templates](https://github.com/raphacosta27/nexoChallenge/tree/master/templates) </br>

Descrição da aplicação: o Rapha Nexo Challenge é um quick-reminder de modo que ele permite salvar tarefas contendo um título e um contéudo (este sendo editável). Ainda, tudo isso sendo possível utilizando um ambiente de homologação na qual o usuário se cadastra na aplicação com um email e uma senha, possibilitando futuros logins no mesmo usuário. Cada usuário por sua vez possui um idToken único gerado na hora do cadastramento e armaezenado no Authentication do Firebase. Abaixo seguem imagens de demonstração de utilização da plataforma. </br>

1) Execute o script de instalação [install.sh](https://github.com/raphacosta27/nexoChallenge/blob/master/install.sh). ATENÇÃO: Este script é escrito apenas para usuários de Linux. É um Script básico que instala o python3, o pip3, flask, o pyrebase e executa o [server.py](https://github.com/raphacosta27/nexoChallenge/blob/master/server.py). Caso o script não rode com sucesso ou esteja em outra plataforma, apenas garanta que as depedências citadas estejam funcionando em sua máquina. 

2) Assim que o servidor começar a rodar, basta abrir um browser na página http://localhost:3000. Você deverá ver uma página como na imagem abaixo. Assim, preencha os campos com um email e uma senha qualquer e clique em Cadastrar-se caso ainda não possua cadastro, ou clique em login caso contrário.

![Cadastramento](https://github.com/raphacosta27/nexoChallenge/blob/master/cadastrar.png)

3) Ao entrar na aplicação pela primeira vez você encontrará algo como a imagem abaixo. Para adicionar uma tarefa basta colocar um título e um conteúdo nos campos indicados e clicar no + ao lado.

![Index](https://github.com/raphacosta27/nexoChallenge/blob/master/index.png)

4) Após adicionar uma tarefa, você verá algo como na imagem abaixo. Para editar uma nota, basta clicar em cima do texto do conteúdo, colocar o texto desejado e clicar em EDITAR ao final. Para remover a nota, basta clicar em REMOVER.

![Adicionado](https://github.com/raphacosta27/nexoChallenge/blob/master/addNota.png)

5) Para fazer log out, basta clicar em Sign Out na parte superior direita e logar/criar outro usuário. 

Observações:
- O Banco de dados utilizado é o Firebase e está utilizando uma versão gratuita com minha conta do Google, retiro as chaves em breve quando a avaliação for concluída. 
- Assim como no Firebase, a API KEY utilzada para requests na GIPHY também é minha.
- Ao fim da página, em cinza claro, pode ser visto a idToken do usuário. Deixei visível apesar do tamanho para facilitar a avaliação. 

Problemas encontrados e implementações futuras
- Perto do final, descobri que apesar do pyrebase criar uma chave única para o usuário, ao parsear este token para dar push no documento, a key de cada tarefa no Firebase, esta key está presente na chave de outro usuário. Resumindo: queria que cada usuário tivesse suas tarefas sem que outro usuário pudesse visializar, mas por falta de tempo, não consegui fazer tal correção. Em contrapartida, o idToken de cada usuário esta correto e é único. Abaixo segue uma imagem exemplificando como as tarefas são guardadas no Firebase.

![Imagem das tarefas](https://github.com/raphacosta27/nexoChallenge/blob/master/tarefas.png)

