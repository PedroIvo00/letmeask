import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
// GANCHO PARA CHAMAR O CONTEXTO DE AUTENTICAÇÃO QUANDO PRECISAR
export function useAuth() {
    const value = useContext(AuthContext)

    return value;
}