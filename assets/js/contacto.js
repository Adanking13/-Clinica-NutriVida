document.addEventListener('DOMContentLoaded',()=>
{
    const form=document.getElementById('form-contacto');
    if (!form)return;
    form.addEventListener('submit',e=>
    {
        e.preventDefault();
        clearAllFieldErrors(form);
        showFormMessage('mensaje-contacto','');
        const v=Object.fromEntries(new FormData(form).entries());
        if (!v.nombre.trim())return setFieldError('nombre','Ingresa tu nombre.');
        if (!validName(v.nombre.trim()))return setFieldError('nombre','Ingresa un nombre válido.');
        if (!v.correo.trim())return setFieldError('correo','Ingresa tu correo.');
        if (!validEmail(v.correo.trim()))return setFieldError('correo','Ingresa un correo institucional o Gmail válido.');
        if (!v.telefono.trim())return setFieldError('telefono','Ingresa tu teléfono.');
        if (!validPhone(v.telefono.trim()))return setFieldError('telefono','Ingresa un teléfono válido.');
        if (!v.asunto.trim())return setFieldError('asunto','Ingresa un asunto.');
        if (v.asunto.trim().length<3)return setFieldError('asunto','El asunto debe tener al menos 3 caracteres.');
        if (!v.mensaje.trim())return setFieldError('mensaje','Ingresa tu mensaje.');
        if (v.mensaje.trim().length<10)return setFieldError('mensaje','El mensaje debe tener al menos 10 caracteres.');
        showFormMessage('mensaje-contacto','Mensaje enviado correctamente.','success');
        form.reset()
    }
    )
}
)
