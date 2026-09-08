document.addEventListener('DOMContentLoaded', () =>
{
    const form = document.getElementById('form-login');

    if (!form) return;

    const validarCampoEnTiempoReal = (id, validar) =>
    {
        const campo = document.getElementById(id);

        if (!campo) return;

        campo.addEventListener('input', () =>
        {
            const resultado = validar(campo.value);

            if (resultado === true)
            {
                clearFieldError(id);
            }
            else
            {
                setFieldError(id, resultado);
            }
        });
    };

    validarCampoEnTiempoReal('correo', value =>
    {
        return validEmail(value.trim())
            ? true
            : 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    });

    validarCampoEnTiempoReal('password', value =>
    {
        return value.length >= 4 && value.length <= 10
            ? true
            : 'La contraseña debe tener entre 4 y 10 caracteres.';
    });

    form.addEventListener('submit', e =>
    {
        e.preventDefault();

        clearAllFieldErrors(form);
        showFormMessage('mensaje-login', '');

        const v =
            Object.fromEntries(
                new FormData(form).entries()
            );

        const correo = v.correo.trim().toLowerCase();

        if (!validEmail(correo))
        {
            return setFieldError(
                'correo',
                'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.'
            );
        }

        if (
            v.password.length < 4 ||
            v.password.length > 10
        )
        {
            return setFieldError(
                'password',
                'La contraseña debe tener entre 4 y 10 caracteres.'
            );
        }

        let role = 'Paciente';

        if (correo === 'admin@duoc.cl')
        {
            role = 'Administrador';
        }
        else if (correo.includes('nutricionista'))
        {
            role = 'Nutricionista';
        }

        sessionStorage.setItem(
            'nutrivida_sesion',
            JSON.stringify(
            {
                correo: correo,
                rol: role
            })
        );

        showFormMessage(
            'mensaje-login',
            'Inicio de sesión realizado correctamente.',
            'success'
        );

        const box = document.getElementById('acceso-rol');

        box.hidden = false;
        box.innerHTML = '';

        const p = document.createElement('p');

        p.textContent = 'Perfil detectado: ' + role;

        const a = document.createElement('a');

        a.className = 'btn';
        a.href =
            role === 'Administrador'
                ? 'admin.html'
                : 'index.html';

        a.textContent =
            role === 'Administrador'
                ? 'Ir a administración'
                : 'Continuar al sitio';

        box.append(p, a);
    });
});