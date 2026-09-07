function setupProductForm()
{
    const form=document.getElementById('form-producto');
    if (!form)return;
    form.addEventListener('submit',e=>
    {
        e.preventDefault();
        clearAllFieldErrors(form);
        showFormMessage('mensaje-producto','');
        const v=Object.fromEntries(new FormData(form).entries());
        if (v.codigo.trim().length<3)return setFieldError('codigo','El código debe tener al menos 3 caracteres.');
        if (!v.nombre.trim())return setFieldError('nombre','Ingresa el nombre del producto.');
        if (v.descripcion.length>500)return setFieldError('descripcion','La descripción no puede superar los 500 caracteres.');
        if (v.precio===''||Number(v.precio)<0)return setFieldError('precio','Ingresa un precio mayor o igual a 0.');
        if (v.stock===''||!Number.isInteger(Number(v.stock))||Number(v.stock)<0)return setFieldError('stock','El stock debe ser un entero mayor o igual a 0.');
        if (v['stock-critico']!==''&&(!Number.isInteger(Number(v['stock-critico']))||Number(v['stock-critico'])<0))return setFieldError('stock-critico','El stock crítico debe ser un entero válido.');
        if (!v.categoria)return setFieldError('categoria','Selecciona una categoría.');
        if (v.imagen)
        {
            try
            {
                new URL(v.imagen)
            } catch
            {
                return setFieldError('imagen','Ingresa una URL de imagen válida.')
            }
        }
        showFormMessage('mensaje-producto','Producto creado correctamente.','success');
        form.reset()
    }
    )
}
function editarProducto(id)
{
    const rows=document.querySelectorAll('#tabla-productos tr');
    const row=rows[id-1];
    if (!row)return;
    const name=prompt('Nuevo nombre del producto:',row.cells[1].textContent.trim());
    if (name===null)return;
    if (name.trim().length<2)
    {
        alert('El nombre debe tener al menos 2 caracteres.');
        return
    }
    const price=prompt('Nuevo precio del producto:',row.cells[3].textContent.replace(/[$.]/g,''));
    if (price===null)return;
    if (isNaN(Number(price))||Number(price)<0)
    {
        alert('Ingresa un precio válido.');
        return
    }
    const stock=prompt('Nuevo stock del producto:',row.cells[4].textContent.split('·')[0].trim());
    if (stock===null)return;
    if (!Number.isInteger(Number(stock))||Number(stock)<0)
    {
        alert('El stock debe ser un entero mayor o igual a 0.');
        return
    }
    row.cells[1].textContent=name.trim();
    row.cells[3].textContent='$'+Number(price).toLocaleString('es-CL');
    row.cells[4].textContent=Number(stock)<=3?Number(stock)+' · Stock crítico':String(stock);
    row.cells[4].className=Number(stock)<=3?'stock-critical':'stock-ok';
    mostrarAlertaStock()
}
function mostrarAlertaStock()
{
    const table=document.getElementById('tabla-productos'),alerta=document.getElementById('alerta-stock');
    if (!table||!alerta)return;
    let count=0;
    table.querySelectorAll('tr').forEach(row=>
    {
        const cell=row.cells[4];
        if (!cell)return;
        const n=Number(cell.textContent.split('·')[0].trim());
        if (n<=3)
        {
            count++;
            cell.className='stock-critical'
        }
        else cell.className='stock-ok'
    }
    );
    alerta.textContent=count?`Hay ${count} producto(s) con stock crítico.`:'No hay productos con stock crítico.';
    alerta.className=count?'notice stock-critical':'notice stock-ok'
}
document.addEventListener('DOMContentLoaded',()=>
{
    setupProductForm();
    mostrarAlertaStock()
}
)
