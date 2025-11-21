import React from 'react';
import { NewsCard } from '../molecules/NewsCard';
import { Spinner } from '../atoms/Spinner';

const news = [{id:1, title:"PC Gamer", description:"Nueva generación...", link:"#"}, {id:2, title:"Ofertas", description:"Descuentos...", link:"#"}];

export const NewsFeed = () => <div>{news.map(n => <NewsCard key={n.id} {...n} />)}</div>;