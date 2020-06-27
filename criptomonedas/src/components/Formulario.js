import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from './../hooks/useMoneda';
import useCriptomoneda from './../hooks/useCriptomoneda';

import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolár Estadounidense' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'GBP', nombre: 'Libra esterlina' },
        { codigo: 'EUR', nombre: 'Euro' },
    ];

    const [moneda, SelectMonedas, actualizarState] = useMoneda('Elige una moneda', '', MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige una criptomoneda', '', listacripto);

    useEffect(
        () => {
            const consultarAPI = async () => {
                const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=MXN`;
                const resultado = await axios.get(url);
                console.log(resultado.data.Data);

                guardarCriptomonedas(resultado.data.Data);
            }

            consultarAPI();
        },
        []
    );

    const cotizarMoneda = e => {
        e.preventDefault();

        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form action="" onSubmit={cotizarMoneda}>
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton type="submit" value="Calcular" />
        </form>
    );
}

export default Formulario;