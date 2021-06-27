import { InputHTMLAttributes } from 'react';

import '../styles/toggleButton.scss';

type ToggleButtonProps = InputHTMLAttributes<HTMLInputElement> & {
    toggle: string;
};

export function ToggleButton(props: ToggleButtonProps) {

    if (props.toggle === "light") {
        return (
            <div className="toggle-container">
                <span>{props.toggle}</span>
                <input id="switch-toggle" className={`switch switch-toggle ${props.toggle}`}
                    {...props} />
                <label htmlFor="switch-toggle" />
                <span> ☀ </span>
            </div>
        )
    } else {
        return (
            <div className="toggle-container">
                <span> ☾ </span>
                <input id="switch-toggleButton" className={`switch switch-toggle ${props.toggle}`}
                    {...props} />
                <label htmlFor="switch-toggleButton" />
                <span>{props.toggle}</span>
            </div>
        )
    }
}
// <p>Tema: {theme}</p>