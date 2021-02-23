import React from 'react';

// This file exports the Input, TextArea, and FormBtn components

export function Input (props) {
  return (
    <input className='form-control' {...props} />
  );
}

export function FormBtn (props) {
  return (
    <button {...props} style={{ float: 'right', marginBottom: 10 }} className='btn btn-primary'>
      {props.children}
    </button>
  );
}
