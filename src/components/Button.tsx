import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';
// ADICIONA TODAS AS PROPRIEDADES DE BOTÃO HTML À FUNÇÃO BUTTON
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean

};

// "..." se chama REST OPERATOR, que pega o resto e joga no prop
export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        // VAI RETORNAR TODAS AS PROPRIEDADES DE BUTTON HTML
        <button className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}