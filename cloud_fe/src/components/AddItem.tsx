import React, { useState } from 'react';
import './AddItem.css';

interface Props {
    buttonValue: string;
    placeholder: string;
    onClick: (value, setValue) => void;
}

const AddItem = (props: Props) => {
    const [value, setValue] = useState('');

    return (
        <div className='AddItem'>
            <form>
                <input 
                    type='text' 
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    required
                    placeholder={props.placeholder}
                />
                <button 
                    onClick={event => {
                        if (value) {
                            event.preventDefault();
                            props.onClick(value, setValue);
                        }
                    }
                }>
                    {props.buttonValue}
                </button>
            </form>
        </div>
    );
}

export default AddItem;