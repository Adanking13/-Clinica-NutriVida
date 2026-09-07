document.addEventListener('DOMContentLoaded',()=>
{
    const button=document.getElementById('boton-menu');
    const menu=document.getElementById('menu-lateral');
    const close=document.getElementById('cerrar-menu');
    const backdrop=document.getElementById('menu-backdrop');
    if (!button||!menu)return;
    const open=()=>
    {
        menu.classList.add('menu-visible');
        menu.setAttribute('aria-hidden','false');
        button.setAttribute('aria-expanded','true');
        button.setAttribute('aria-label','Cerrar menú principal');
        if (backdrop)
        {
            backdrop.hidden=false
        }
        document.body.classList.add('menu-open');
        const first=menu.querySelector('a');
        if (first)first.focus()
    }
    ;
    const shut=()=>
    {
        menu.classList.remove('menu-visible');
        menu.setAttribute('aria-hidden','true');
        button.setAttribute('aria-expanded','false');
        button.setAttribute('aria-label','Abrir menú principal');
        if (backdrop)
        {
            backdrop.hidden=true
        }
        document.body.classList.remove('menu-open')
    }
    ;
    button.addEventListener('click',()=>menu.classList.contains('menu-visible')?shut():open());
    if (close)close.addEventListener('click',shut);
    if (backdrop)backdrop.addEventListener('click',shut);
    document.addEventListener('keydown',e=>
    {
        if (e.key==='Escape'&&menu.classList.contains('menu-visible'))
        {
            shut();
            button.focus()
        }
    }
    );
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',shut));
    const current=window.location.pathname.split('/').pop()||'index.html';
    menu.querySelectorAll('a').forEach(a=>
    {
        const href=(a.getAttribute('href')||'').split('?')[0];
        if (href===current)a.setAttribute('aria-current','page')
    }
    );
    window.addEventListener('resize',()=>
    {
        if (window.innerWidth>700&&menu.classList.contains('menu-visible'))shut()
    }
    );
    const updateCartBadge=()=>
    {
        let cart=[];
        try
        {
            cart=JSON.parse(localStorage.getItem('carrito'))||[]
        } catch
        {
        }
        const count=cart.reduce((n,p)=>n+Number(p.cantidad||1),0);
        document.querySelectorAll('.cart-count').forEach(el=>el.textContent=count)
    }
    ;
    updateCartBadge();
    window.addEventListener('storage',updateCartBadge)
}
)
