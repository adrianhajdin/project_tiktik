import React from 'react';
import { NextPage } from 'next';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: any) => (
      <p key={item} className='text-gray-400 text-sm  hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className='mt-6 hidden xl:block'>
    <List items={['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory']} mt={false} />
    <List items={[ 'TikTok for Good','Advertise','Developers','Transparency','TikTok Rewards' ]} mt />
    <List items={[ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]} mt />
    <p className='text-gray-400 text-sm mt-5'>© 2022 TikTok</p>
  </div>
);

export default Footer;
