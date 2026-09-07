const parametros=new URLSearchParams(location.search);
const idProducto=parametros.get('id');
const productos=
{
    EV002:
    {
        nombre:'Bioimpedanciometría',descripcion:'Evaluación de composición corporal.',precio:12000,imagen:'bioimpedanciometria.jpg'
    }
    ,EV003:
    {
        nombre:'Encuesta de hábitos alimentarios',descripcion:'Análisis de hábitos y patrón alimentario.',precio:10000,imagen:'habitos-alimentarios.jpg'
    }
    ,EV004:
    {
        nombre:'Análisis de exámenes',descripcion:'Interpretación nutricional de exámenes.',precio:15000,imagen:'analisis-examenes.jpg'
    }
    ,TG001:
    {
        nombre:'Taller de alimentación saludable',descripcion:'Taller sobre alimentación equilibrada.',precio:15000,imagen:'alimentacion-saludable.jpg'
    }
    ,TG002:
    {
        nombre:'Taller de cocina nutritiva',descripcion:'Preparación de recetas saludables.',precio:20000,imagen:'cocina-nutritiva.jpg'
    }
    ,TG003:
    {
        nombre:'Taller de nutrición para deportistas',descripcion:'Alimentación e hidratación para deportistas.',precio:18000,imagen:'nutricion-deportiva.jpg'
    }
}
;
const p=productos[idProducto];
if (p)
{
    document.querySelector('#nombre-producto').textContent=p.nombre;
    document.querySelector('#descripcion-producto').textContent=p.descripcion;
    document.querySelector('#codigo-producto').textContent=idProducto;
    document.querySelector('#precio-producto').textContent=p.precio.toLocaleString('es-CL');
    const img=document.querySelector('#imagen-producto');
    img.src='assets/img/'+p.imagen;
    img.alt='Imagen representativa de '+p.nombre;
    document.querySelector('#btn-agregar-detalle').addEventListener('click',()=>
    {
        let c=[];
        try
        {
            c=JSON.parse(localStorage.getItem('carrito'))||[]
        } catch
        {
        }
        const found=c.find(x=>x.id===idProducto);
        if (found)found.cantidad=Number(found.cantidad||1)+1;
        else c.push(
        {
            id:idProducto,nombre:p.nombre,precio:p.precio,cantidad:1
        }
        );
        localStorage.setItem('carrito',JSON.stringify(c));
        const m=document.querySelector('#mensaje-producto');
        m.textContent='Servicio agregado al carrito.';
        m.className='form-message success';
        window.dispatchEvent(new Event('storage'))
    }
    )
} else
{
    document.querySelector('#nombre-producto').textContent='Servicio no encontrado';
    document.querySelector('#descripcion-producto').textContent='El servicio solicitado no existe. Vuelve al catálogo para continuar.';
    document.querySelector('#btn-agregar-detalle').disabled=true
}
