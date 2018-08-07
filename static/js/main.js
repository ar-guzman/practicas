(function(){
  
    createElement = (tagName,properties)=>{
        let el = document.createElement(tagName);
        Object.keys(properties).forEach((item)=>{
            if(item == 'textContent') 
                el.textContent = properties[item];
            else
                el.setAttribute(item,properties[item]);
        });
        return el;
    };

    let btn = document.getElementById('about');

    btn.addEventListener('click',()=>{
        let vw = document.getElementById('window'),
            div = document.createElement('div');
        vw.appendChild(createElement('h1',{'textContent':'Practica 1: Mantenimiento de una computadora.','class':'titulo'})); 
        vw.appendChild(createElement('p',{'textContent':'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab architecto accusantium laboriosam repellat, eligendi tenetur accusamus, eveniet tempore at distinctio vel sint fugit illo, illum quibusdam tempora inventore nihil. Enim.'}));
    });

})()
