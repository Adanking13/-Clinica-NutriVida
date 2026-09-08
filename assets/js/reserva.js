document.addEventListener('DOMContentLoaded', () =>
{
    const form = document.getElementById('form-reserva');

    if (!form) return;

    const params = new URLSearchParams(location.search);

    const service = document.getElementById('servicio');

    if (params.get('servicio') && service)
    {
        service.value = params.get('servicio');
    }

    const date = document.getElementById('fecha');

    if (date)
    {
        date.min = new Date()
            .toISOString()
            .split('T')[0];
    }

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

        campo.addEventListener('change', () =>
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
            return 'Ingresa tu nombre completo.';
        }

        return validName(value.trim())
            ? true
            : 'Usa solo letras y espacios (2 a 100 caracteres).';
    });

    validarCampoEnTiempoReal('correo', value =>
    {
        if (!value.trim())
        {
            return 'Ingresa tu correo electrónico.';
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
            : 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.';
    });

    validarCampoEnTiempoReal('fecha', value =>
    {
        if (!value)
        {
            return 'Selecciona una fecha.';
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const selected =
            new Date(value + 'T00:00:00');

        return selected >= today
            ? true
            : 'La fecha no puede ser anterior al día de hoy.';
    });

    validarCampoEnTiempoReal('hora', value =>
    {
        if (!value)
        {
            return 'Selecciona una hora.';
        }

        return value >= '09:00' && value <= '18:00'
            ? true
            : 'Selecciona un horario entre 09:00 y 18:00.';
    });

    validarCampoEnTiempoReal('motivo', value =>
    {
        if (!value.trim())
        {
            return 'Describe brevemente el motivo de consulta.';
        }

        return value.trim().length >= 10
            ? true
            : 'El motivo debe tener al menos 10 caracteres.';
    });

    form.addEventListener('submit', e =>
    {
        e.preventDefault();

        clearAllFieldErrors(form);
        showFormMessage('mensaje-reserva', '');

        const values =
            Object.fromEntries(
                new FormData(form).entries()
            );

        if (!values.nombre.trim())
        {
            return setFieldError(
                'nombre',
                'Ingresa tu nombre completo.'
            );
        }

        if (!validName(values.nombre.trim()))
        {
            return setFieldError(
                'nombre',
                'Usa solo letras y espacios (2 a 100 caracteres).'
            );
        }

        if (!values.correo.trim())
        {
            return setFieldError(
                'correo',
                'Ingresa tu correo electrónico.'
            );
        }

        if (!validEmail(values.correo.trim()))
        {
            return setFieldError(
                'correo',
                'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.'
            );
        }

        if (!values.telefono.trim())
        {
            return setFieldError(
                'telefono',
                'Ingresa tu teléfono.'
            );
        }

        if (!validPhone(values.telefono.trim()))
        {
            return setFieldError(
                'telefono',
                'Ingresa un teléfono válido.'
            );
        }

        if (!values.nutricionista)
        {
            return setFieldError(
                'nutricionista',
                'Selecciona un nutricionista.'
            );
        }

        if (!values.servicio)
        {
            return setFieldError(
                'servicio',
                'Selecciona un servicio.'
            );
        }

        if (!values.fecha)
        {
            return setFieldError(
                'fecha',
                'Selecciona una fecha.'
            );
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const selected =
            new Date(values.fecha + 'T00:00:00');

        if (selected < today)
        {
            return setFieldError(
                'fecha',
                'La fecha no puede ser anterior al día de hoy.'
            );
        }

        if (!values.hora)
        {
            return setFieldError(
                'hora',
                'Selecciona una hora.'
            );
        }

        if (
            values.hora < '09:00' ||
            values.hora > '18:00'
        )
        {
            return setFieldError(
                'hora',
                'Selecciona un horario entre 09:00 y 18:00.'
            );
        }

        if (!values.motivo.trim())
        {
            return setFieldError(
                'motivo',
                'Describe brevemente el motivo de consulta.'
            );
        }

        if (values.motivo.trim().length < 10)
        {
            return setFieldError(
                'motivo',
                'El motivo debe tener al menos 10 caracteres.'
            );
        }

        sessionStorage.setItem(
            'nutrivida_reserva',
            JSON.stringify(values)
        );

        location.href = 'confirmacion.html';
    });
});