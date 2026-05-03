'use client';
import React from 'react';
import Component from './scroll-animation';

function componentDemo() {
  return (
    <>
      <div className='h-[500px] grid place-content-center'>
        <p className="text-white/20 uppercase tracking-widest">Scroll Down to see animations</p>
      </div>
      <div className='py-2'>
        <div>
          <Component
            direction='left'
            viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
            className='text-5xl text-left py-44 text-white font-serif'
          >
            <p>Scroll Left</p>
          </Component>
          <Component
            direction='right'
            viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
            className='text-5xl text-right py-44 text-white font-serif'
          >
            <p>Scroll Right</p>
          </Component>
          <Component
            viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
            className='text-5xl text-center py-44 text-white font-serif'
          >
            <p>Scroll bottom</p>
          </Component>
        </div>
      </div>
    </>
  );
}

export { componentDemo as DemoOne };
