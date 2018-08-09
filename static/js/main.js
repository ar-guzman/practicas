(function(_){

    var createElement = (tagName,properties)=>{
        let el = document.createElement(tagName);
        Object.keys(properties).forEach((item)=>{
            if(item == 'textContent')
              el.textContent = properties[item];
            else if(item == 'src')
              el.src = properties[item];
            else
              el.setAttribute(item,properties[item]);
        });
        return el;
    };

    var preCompiledtemplate = {};

    preCompiledtemplate['blog-post'] = _.template(`<div class="modal-header">
        <h4><%= data.title %></h4>
    </div>
    <div class="modal-body">
        <img src="<%= data.image %>">
        <% data.instructions.forEach((item,index)=> { %>
            <% if(index%2==0){ %>
                <p class="titulo"><%= item %></p>
            <% }else{ %>
                <p><%= item %></p>
            <% } %>
        <% }); %>
        </div>
    </div>`);

    preCompiledtemplate['links'] = _.template(`<p class="titulo"><%= data.title %></p>
      <% data.links.forEach(item=>{%>
        <a href="<%= item[0] %>"> <%= item[1] %></a>
      <% });%>
      `);

    preCompiledtemplate['about-template'] = _.template(`<div class="about"><h1> ACERCA DEL GRUPO 16</h1>
      <div class="linear"></div>
      <% data.info.forEach((item,index)=>{ %>
        <% if(index==0 || index==2){ %>
          <p class="titulo"><%= item %></p>
        <% }else{ %>
          <p><%= item %></p>
        <% } %>
      <% }); %>
    </div>`);

    preCompiledtemplate['actividades-template'] = _.template(`<div class="about"><h1> PRACTICAS A REALIZAR</h1>
      <div class="linear"></div>
      <% data.info.forEach((item,index)=>{ %>
        <% if(index==0){ %>
          <p class="titulo"><%= item %></p>
          <div class="actividades first">
            <p>No.</p>
            <p>Nombre</p>
            <p>Descripción</p>
            <p>Fecha</p>
          </div>
        <% }else{ %>
          <div class="actividades">
            <p><%= index %></p>
            <p><%= item[0] %></p>
            <p><%= item[1] %></p>
            <p><%= item[2] %></p>
          </div>
        <% } %>
      <% }); %>
    </div>`)
    preCompiledtemplate['comment-post'] = _.template(`<div></div>`);


    var renderTemplate = (refNode, templateData, templateName)=>{
        refNode.innerHTML = preCompiledtemplate[templateName]({data:templateData});
    };

    var modal = document.getElementById('modal-window'),
        main = document.getElementById('main'),
        submain = document.getElementById('sub-main');

    document.querySelectorAll('button.go-post').forEach(item=>{

        item.addEventListener('click',()=>{
            let val = Number(item.getAttribute('value'));
            if(val == NaN) assert("Error que no debería de pasar :/");
            modal.parentNode.classList.remove('hidden');

            switch(val){
                case 1:
                    renderTemplate(modal,
                        {title:'PRACTICA1: MANTENIMIENTO DE UN EQUIPO DE COMPUTACION',
                        image: "./static/media/practica1-foto.jpeg",
                        instructions: ['Objetivos',
                                       'Que el estudiante aprenda los componentes principales de una computadora.',
                                       'Descripción',
                                       `Se elaboró un video-tutorial de "MANTENIMIENTO DE UNA COMPUTADORA". El video se encuentra en la parte de
                                       abajo dentro de este mismo cuadro. En el video se explica como darle mantenimiento a un equipo Acer Aspire 3680/ZR1,
                                       también están el manual y el trifoliar requeridos. Finalmente se encontrarán los links que nos sirvieron de guía para
                                       realizar esta práctica.`,
                                       'Manuales y desarrollo de la práctica'
                                    ],},
                        'blog-post');
                    let divs = [createElement('div',{class:"section"}),createElement('div',{class:"section"}),createElement('div',{class:"section"})];
                    divs[0].appendChild(createElement('button',{class:'show','textContent':'Mostrar Trifoliar PDF',url:"https://drive.google.com/file/d/11ZezDrcscWrlgLc5hoMPA_dXSRRViG9g/preview",index:1}));
                    divs[1].appendChild(createElement('button',{class:'show','textContent':'Mostrar Manual PDF',url:"https://drive.google.com/file/d/1dKGUL7YdU3nySuZ8jTFPfDeZjQPV6XsX/preview",index:2}));
                    divs[2].appendChild(createElement('button',{class:'show','textContent':'Mostrar Video',url:"https://www.youtube.com/embed/https://www.youtube.com/embed/jLDT6dF9MUE&?playlist=jLDT6dF9MUE&loop=1",index:3}));
                    let modalBody = modal.querySelector('.modal-body');
                    modalBody.appendChild(divs[0]);
                    modalBody.appendChild(divs[1]);
                    modalBody.appendChild(divs[2]);
                    modalBody.querySelectorAll('button.show').forEach((item)=>{item.addEventListener('click',()=>{
                      let index = Number(item.getAttribute('index'));
                      if(item.classList.contains('clicked')){
                        item.classList.remove('clicked');
                        item.parentNode.querySelector('iframe').remove();
                        item.parentNode.style.background = "";
                        item.textContent = (index==2)?'Mostrar Manual PDF':(index==1)?'Mostrar Trifoliar PDF':'Mostrar Video';
                      }
                      else{
                        item.classList.add('clicked');
                        item.textContent = (index==3)?'Cerar Video':'Cerrar PDF';
                        item.parentNode.insertBefore(createElement('iframe',{src:item.getAttribute('url')}),item.nextSibling);
                        item.parentNode.style.background = "black";
                      }
                    });
                  });
                  let docFrag = document.createElement('template');
                  renderTemplate(docFrag,{title:'Link a los documentos del grupo',links:[
                    ["https://drive.google.com/open?id=11ZezDrcscWrlgLc5hoMPA_dXSRRViG9g",'Trifoliar en drive'],
                    ["https://drive.google.com/open?id=1dKGUL7YdU3nySuZ8jTFPfDeZjQPV6XsX",'Manual de mantenimiento en drive'],
                    ["https://youtu.be/jLDT6dF9MUE","Video de la practica"]
                    ]},'links');
                  modalBody.appendChild(docFrag.content.cloneNode(true));
                  let newDocFrag = document.createElement('template');
                  renderTemplate(newDocFrag,{title:'Link a los documentos y videos de apoyo',links:[
                    ["https://www.youtube.com/watch?v=93RzkL6dKyE&t=64s",'Video para abrir la computadora Acer Aspire 3680/ZR1'],
                    ["https://www.dell.com/support/article/gt/es/gtbsdt1/sln290711/mantenimiento-general-que-debe-realizar-para-hacer-mantenimiento-a-su-computadora-dell?lang=es",'Guía de mantenimiento general a una computadora'],
                    ]},'links');
                  modalBody.appendChild(newDocFrag.content.cloneNode(true));
                break;
                default:
                break;
            }
        });

    });

    document.getElementsByClassName('close')[0].addEventListener('click',()=>{
        modal.parentNode.classList.add('hidden');
        while(modal.firstChild) modal.firstChild.remove();
    });

    var renderSubMain = function(){
      main.style.display = 'none';
      submain.style.display = 'block';
      while(submain.firstChild) submain.firstChild.remove();
    }

    document.getElementById('about').addEventListener('click',()=>{
      renderSubMain();
      renderTemplate(submain,{info:["Integrantes intermedias",
        "Andrés Ricardo Ismael Guzmán   -   201010425",
        "Integrantes iniciales",
        "Jesús Alejandro Mansilla Villatoro   -   201709396",
        "Eli Samuel Mazariegos Ramírez   -   201709426",
        ]},'about-template');
    });

    document.getElementById('actividades').addEventListener('click',()=>{
      renderSubMain();
      renderTemplate(submain,{info:["Fecha y título de práticas a realizar",
        ["Informe 1","Video-tutorial de 'Mantenimiento de una Computadora'.","09/08/2018"],
        ["Informe 2","Instalación de Linux y comunicación de redes entre diversos SOs.","23/08/2018"],
      ]},'actividades-template');
    });

    document.getElementById('foro').addEventListener('click',()=>{
      renderSubMain();
      submain.innerHTML =`<div class="about"><h1>No se pudo cargar</h1><div class="linear"></div><p class="titulo">Esta funcionalidad está pendiente.</p></div>`
    });

})(_)
