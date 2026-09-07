function getField(id)
{
    return document.getElementById(id)
}
function ensureErrorElement(field)
{
    if (!field)return null;
    const id='error-'+field.id;
    let el=document.getElementById(id);
    if (!el)
    {
        el=document.createElement('p');
        el.id=id;
        el.className='field-error';
        el.setAttribute('aria-live','polite');
        field.insertAdjacentElement('afterend',el)
    }
    field.setAttribute('aria-describedby',id);
    return el
}
function setFieldError(id,message)
{
    const field=getField(id);
    const error=ensureErrorElement(field);
    if (!field||!error)return false;
    field.setAttribute('aria-invalid','true');
    error.textContent=message;
    return false
}
function clearFieldError(id)
{
    const field=getField(id);
    if (!field)return;
    const error=document.getElementById('error-'+id);
    field.removeAttribute('aria-invalid');
    if (error)error.textContent=''
}
function clearAllFieldErrors(form)
{
    form.querySelectorAll('[aria-invalid="true"]').forEach(el=>el.removeAttribute('aria-invalid'));
    form.querySelectorAll('.field-error').forEach(el=>el.textContent='')
}
function showFormMessage(id,message,type='error')
{
    const el=getField(id);
    if (!el)return;
    el.textContent=message;
    el.className='form-message '+type
}
function normalizeEmail(value)
{
    return value.trim().toLowerCase()
}
function validEmail(value)
{
    return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com|nutrivida\.cl)$/i.test(value)
}
function validName(value)
{
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,100}$/.test(value)
}
function validPhone(value)
{
    return /^\+?\d[\d\s-]{7,14}$/.test(value)
}
document.addEventListener('DOMContentLoaded',()=>
{
    document.querySelectorAll('.password-toggle').forEach(btn=>btn.addEventListener('click',()=>
    {
        const input=getField(btn.dataset.target);
        if (!input)return;
        const show=input.type==='password';
        input.type=show?'text':'password';
        btn.textContent=show?'Ocultar':'Mostrar';
        btn.setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña')
    }
    ))
}
)
