document.addEventListener('DOMContentLoaded',()=>
{
    const form=document.getElementById('form-login');
    if (!form)return;
    form.addEventListener('submit',e=>
    {
        e.preventDefault();
        clearAllFieldErrors(form);
        showFormMessage('mensaje-login','');
        const v=Object.fromEntries(new FormData(form).entries());
        if (!validEmail(v.correo.trim()))return setFieldError('correo','Ingresa un correo @duoc.cl, @profesor.duoc.cl, @gmail.com o @nutrivida.cl.');
        if (v.password.length<4||v.password.length>20)return setFieldError('password','La contraseña debe tener entre 4 y 20 caracteres.');
        let role='Paciente';
        if (v.correo.trim().toLowerCase()==='admin@duoc.cl')role='Administrador';
        else if (v.correo.trim().toLowerCase().includes('nutricionista'))role='Nutricionista';
        sessionStorage.setItem('nutrivida_sesion',JSON.stringify(
        {
            correo:v.correo.trim().toLowerCase(),rol:role
        }
        ));
        showFormMessage('mensaje-login','Inicio de sesión realizado correctamente.','success');
        const box=document.getElementById('acceso-rol');
        box.hidden=false;
        box.innerHTML='';
        const p=document.createElement('p');
        p.textContent='Perfil detectado: '+role;
        const a=document.createElement('a');
        a.className='btn';
        a.href=role==='Administrador'?'admin.html':'index.html';
        a.textContent=role==='Administrador'?'Ir a administración':'Continuar al sitio';
        box.append(p,a)
    }
    )
}
)
