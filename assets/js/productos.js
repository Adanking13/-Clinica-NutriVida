let carrito=[];
try
{
    carrito=JSON.parse(localStorage.getItem('carrito'))||[]
} catch
{
    carrito=[]
}
carrito=carrito.map(p=>(
{
    ...p,cantidad:Number(p.cantidad||1)
}
));
const botones=document.querySelectorAll('.btn-agregar');
const contenido=document.querySelector('#carrito-contenido');
const total=document.querySelector('#total-carrito');
function guardar()
{
    localStorage.setItem('carrito',JSON.stringify(carrito));
    window.dispatchEvent(new Event('storage'))
}
function agregar(producto)
{
    const existente=carrito.find(p=>p.id===producto.id);
    if (existente)existente.cantidad+=1;
    else carrito.push(
    {
        ...producto,cantidad:1
    }
    );
    guardar();
    mostrarCarrito()
}
function cambiarCantidad(id,delta)
{
    const p=carrito.find(x=>x.id===id);
    if (!p)return;
    p.cantidad+=delta;
    if (p.cantidad<=0)carrito=carrito.filter(x=>x.id!==id);
    guardar();
    mostrarCarrito()
}
function mostrarCarrito()
{
    if (!contenido||!total)return;
    contenido.innerHTML='';
    if (!carrito.length)
    {
        contenido.innerHTML='<p>El carrito está vacío.</p>';
        total.textContent='$0';
        return
    }
    let suma=0;
    carrito.forEach(p=>
    {
        const item=document.createElement('div');
        item.className='cart-item';
        const info=document.createElement('div');
        info.className='cart-item-name';
        const name=document.createElement('strong');
        name.textContent=p.nombre;
        const sub=document.createElement('small');
        sub.textContent=' '+p.cantidad+' × $'+Number(p.precio).toLocaleString('es-CL');
        info.append(name,sub);
        const minus=document.createElement('button');
        minus.type='button';
        minus.textContent='−';
        minus.setAttribute('aria-label','Quitar una unidad de '+p.nombre);
        minus.addEventListener('click',()=>cambiarCantidad(p.id,-1));
        const plus=document.createElement('button');
        plus.type='button';
        plus.textContent='+';
        plus.setAttribute('aria-label','Agregar una unidad de '+p.nombre);
        plus.addEventListener('click',()=>cambiarCantidad(p.id,1));
        item.append(info,minus,plus);
        contenido.appendChild(item);
        suma+=Number(p.precio)*p.cantidad
    }
    );
    total.textContent='$'+suma.toLocaleString('es-CL')
}
botones.forEach(b=>b.addEventListener('click',()=>agregar(
{
    id:b.dataset.id,nombre:b.dataset.nombre,precio:Number(b.dataset.precio)
}
)));
mostrarCarrito()
