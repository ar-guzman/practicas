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
              case 2:{
                    renderTemplate(modal,
                        {title:'PRACTICA2: INSTALACION DE DISTINTOS SOs Y COMUNICACIÓN ENTRE ESTOS',
                        image: "./static/media/practica2-foto.jpeg",
                        instructions: ['Objetivos',
                                        `Que el estudiante plantee soluciones para la grabación y edición de video de escritorio.
                                        Familiarizar al estudiante con el entorno Linux, instalando cualquiera de la amplia variedad de distribuciones
                                        que este ofrece.
                                        <br>Plantear soluciones para instalar Linux, sin necesidad de eliminar por completo, el sistema operativo
                                        Windows.
                                        <br>Que el estudiante investigue sobre las diferentes opciones que existen en Internet, para poder publicar el
                                        video realizado.`,
                                        'Descripción',
                                        `Se realizaron 2 videos donde se explica como instalar linux junto a windows como solución al problema planteado,
                                        en el primer video se instala la última versión de ubuntu (18.04 LTS) junto a una versión de windows, se realizó
                                        sobre una máquina virtual para facilitar la captura del escritorio. En el segundo video mostramos como crear un cable de
                                        red para conectar dos máquinas y las configuraciones correspondientes con diferentes sistemas operativos,
                                        así como la misma configuración para redes inalámbricas.`,
                                        'Videos del desarrollo de la práctica'
                                      ],},
                          'blog-post');
                      let divs = [createElement('div',{class:"section"}),createElement('div',{class:"section"}),createElement('div',{class:"section"}),createElement('div',{class:"section"})];
                      divs[0].appendChild(createElement('button',{class:'show','textContent':'VIDEO 1 (YOUTUBE)',url:"https://www.youtube.com/embed/rr9hXvsZhkA?playlist=rr9hXvsZhkA&loop=1",index:1, name:"VIDEO 1 (YOUTUBE)"}));
                      divs[1].appendChild(createElement('button',{class:'show','textContent':'VIDEO 2 (YOUTUBE)',url:"https://www.youtube.com/embed/hjJVumplIow?playlist=hjJVumplIow&loop=1",index:2, name:"VIDEO 2 (YOUTUBE)"}));
                      divs[2].appendChild(createElement('button',{class:'show','textContent':'VIDEO 1 (VIMEO)',url:"https://player.vimeo.com/video/286289937",index:3, name:"VIDEO 1 (VIMEO)"}));
                      divs[3].appendChild(createElement('button',{class:'show','textContent':'VIDEO 2 (VIMEO)',url:"https://player.vimeo.com/video/286280546",index:4, name:"VIDEO 2 (VIMEO)"}));
                      let modalBody = modal.querySelector('.modal-body');
                      modalBody.appendChild(divs[0]);
                      modalBody.appendChild(divs[1]);
                      modalBody.appendChild(divs[2]);
                      modalBody.appendChild(divs[3]);
                      modalBody.querySelectorAll('button.show').forEach((item)=>{item.addEventListener('click',()=>{
                        let index = Number(item.getAttribute('index'));
                        if(item.classList.contains('clicked')){
                          item.classList.remove('clicked');
                          item.parentNode.querySelector('iframe').remove();
                          item.parentNode.style.background = "";
                          item.textContent = item.getAttribute("name");
                        }
                        else{
                          item.classList.add('clicked');
                          item.textContent = 'Cerrar Video';
                          item.parentNode.insertBefore(createElement('iframe',{src:item.getAttribute('url')}),item.nextSibling);
                          item.parentNode.style.background = "black";
                        }
                      });
                    });
                    let docFrag = document.createElement('template');
                    renderTemplate(docFrag,{title:'Link a los videos',links:[
                      ["https://www.youtube.com/watch?v=rr9hXvsZhkA",'Video 1 (YOUTUBE)'],
                      ["https://www.youtube.com/watch?v=hjJVumplIow",'Video 2 (YOUTUBE)'],
                      ["https://vimeo.com/286289937",'Video 1 (VIMEO)'],
                      ["https://vimeo.com/286280546",'Video 2 (VIMEO)'],
                      ]},'links');
                    modalBody.appendChild(docFrag.content.cloneNode(true));
                    let newDocFrag = document.createElement('template');
                    renderTemplate(newDocFrag,{title:'Link a descargas y documentos de apoyo',links:[
                      ["http://releases.ubuntu.com/18.04/",'Descargar Ubuntu 18.04 LTS'],
                      ["https://www.tecmint.com/install-ubuntu-16-04-alongside-with-windows-10-or-8-in-dual-boot/",'Como instalar Ubuntu junto a windows'],
                      ["http://informatica.gonzalonazareno.org/plataforma/pluginfile.php/1557/mod_resource/content/0/Latiguillo_UTP_Directo.pdf",'Pasos para crear un cable de red'],
                      ["https://sites.google.com/site/portafoliobeatrizelizabeth/unidad-tres-1/configuracion-de-cable-utp",'Configuraciones de cables de red'],
                      ]},'links');
                    modalBody.appendChild(newDocFrag.content.cloneNode(true));
                  }
                  break;
                  case 3:{
                  renderTemplate(modal,
                        {title:'PRACTICA3: COMPARTIR ARCHIVOS E IMPRESORAS EN UNA RED A DISTINTOS SOs',
                        image: "./static/media/practica3-foto.jpeg",
                        instructions: ['Objetivos',
                                       'Aplicar los conocimientos adquiridos en los diferentes informes realizados anteriormente, con el fin de evaluar \
										presencialmente la aplicación de estos conocimientos.',
                                       'Descripción',
                                       `Se elaboró un video-tutorial de "COMO COMPARTIR CARPETAS ENTRE SOs WINDOWS Y LINUX". El video se encuentra en la parte de
                                       abajo dentro de este mismo cuadro. En el video se explica como compartir carpetas entre Windows y Ubuntu, además de como configurar
                                       el acceso remoto entre los distintos sistemas operativos y finalmente como compartir una impresora dentro de la red.`,
                                       'Video de la practica'
                                    ],},
                        'blog-post');
                    let divs = [createElement('div',{class:"section"})];
                    divs[0].appendChild(createElement('button',{class:'show','textContent':'Mostrar Video',url:"https://www.youtube.com/embed/8xS_rJ-KK5E?playlist=8xS_rJ-KK5E&loop=1",index:1}));
                    let modalBody = modal.querySelector('.modal-body');
                    modalBody.appendChild(divs[0]);
                    modalBody.querySelectorAll('button.show').forEach((item)=>{item.addEventListener('click',()=>{
                      if(item.classList.contains('clicked')){
                        item.classList.remove('clicked');
                        item.parentNode.querySelector('iframe').remove();
                        item.parentNode.style.background = "";
                      }
                      else{
                        item.classList.add('clicked');
                        item.textContent = 'Cerar Video';
                        item.parentNode.insertBefore(createElement('iframe',{src:item.getAttribute('url')}),item.nextSibling);
                        item.parentNode.style.background = "black";
                      }
                    });
                  });
                  let docFrag = document.createElement('template');
                  renderTemplate(docFrag,{title:'Link a los videos',links:[
                    ["https://youtu.be/8xS_rJ-KK5E",'VIDEO TUTORIAL'],
                    ]},'links');
                  modalBody.appendChild(docFrag.content.cloneNode(true));
                  let newDocFrag = document.createElement('template');
                  renderTemplate(newDocFrag,{title:'Link a los documentos y videos de apoyo',links:[
                    ["https://www.howtogeek.com/176471/how-to-share-files-between-windows-and-linux/",'Cómo compartir carpetas entre windows y ubuntu'],
                    ["https://winscp.net/eng/docs/guide_windows_openssh_server",'Instalar ssh en windows'],
                    ["https://www.howtogeek.com/191323/how-to-share-printers-between-windows-mac-and-linux-pcs-on-a-network/","Compartir impresora entre windows y ubuntu"]
                    ]},'links');
                  modalBody.appendChild(newDocFrag.content.cloneNode(true));
              	}
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

    document.getElementById('home').addEventListener('click',()=>{
      renderSubMain();
      main.style.display = '';
      main.style.display = '';
    });

})(_)
