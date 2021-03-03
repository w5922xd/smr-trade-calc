import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { Calculate } from './Calculate';
import { TradeMode } from './Types';

// test('renders calculate component', () => {
//   const { container } = render(<Calculate trade={{
//     Distance: 5, 
//     Good: { Name: 'Luxury Items', Price: 231, StockMax: 4000 },
//     Mode: TradeMode.Buy,    
//     Stock: 4000,
//     NumberOfGoods: 250, 
//     PortRelation: {Race: 'Neutral', Value: 4}
// }} />);
//     const buttons = container.querySelectorAll('button');
//     expect(buttons[0].textContent).toBe('Calculate')
// });
