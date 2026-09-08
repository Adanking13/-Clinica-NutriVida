document.addEventListener('DOMContentLoaded', () =>
{
    const form = document.getElementById('form-contacto');

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

    validarCampoEnTiempoReal('nombre', value =>
    {
        if (!value.trim())
        {
            return 'Ingresa tu nombre.';
        }

        return validName(value.trim())
            ? true
            : 'Ingresa un nombre válido.';
    });

    validarCampoEnTiempoReal('correo', value =>
    {
        if (!value.trim())
        {
            return 'Ingresa tu correo.';
        }

        return validEmail(value.trim())
            ? true
            : 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    });

    validarCampoEnTiempoReal('telefono', value =>
    {
        if (!value.trim())
        {
            return 'Ingresa tu teléfono.';
        }

        return validPhone(value.trim())
            ? true
            : 'Ingresa un teléfono válido.';
    });

    validarCampoEnTiempoReal('asunto', value =>
    {
        if (!value.trim())
        {
            return 'Ingresa un asunto.';
        }

        return value.trim().length >= 3
            ? true
            : 'El asunto debe tener al menos 3 caracteres.';
    });

    validarCampoEnTiempoReal('mensaje', value =>
    {
        if (!value.trim())
        {
            return 'Ingresa tu mensaje.';
        }

        return value.trim().length >= 10
            ? true
            : 'El mensaje debe tener al menos 10 caracteres.';
    });

    form.addEventListener('submit', e =>
    {
        e.preventDefault();

        clearAllFieldErrors(form);
        showFormMessage('mensaje-contacto', '');

        const v =
            Object.fromEntries(
                new FormData(form).entries()
            );

        if (!v.nombre.trim())
        {
            return setFieldError(
                'nombre',
                'Ingresa tu nombre.'
            );
        }

        if (!validName(v.nombre.trim()))
        {
            return setFieldError(
                'nombre',
                'Ingresa un nombre válido.'
            );
        }

        if (!v.correo.trim())
        {
            return setFieldError(
                'correo',
                'Ingresa tu correo.'
            );
        }

        if (!validEmail(v.correo.trim()))
        {
            return setFieldError(
                'correo',
                'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.'
            );
        }

        if (!v.telefono.trim())
        {
            return setFieldError(
                'telefono',
                'Ingresa tu teléfono.'
            );
        }

        if (!validPhone(v.telefono.trim()))
        {
            return setFieldError(
                'telefono',
                'Ingresa un teléfono válido.'
            );
        }

        if (!v.asunto.trim())
        {
            return setFieldError(
                'asunto',
                'Ingresa un asunto.'
            );
        }

        if (v.asunto.trim().length < 3)
        {
            return setFieldError(
                'asunto',
                'El asunto debe tener al menos 3 caracteres.'
            );
        }

        if (!v.mensaje.trim())
        {
            return setFieldError(
                'mensaje',
                'Ingresa tu mensaje.'
            );
        }

        if (v.mensaje.trim().length < 10)
        {
            return setFieldError(
                'mensaje',
                'El mensaje debe tener al menos 10 caracteres.'
            );
        }

        showFormMessage(
            'mensaje-contacto',
            'Mensaje enviado correctamente.',
            'success'
        );

        form.reset();
    });
});