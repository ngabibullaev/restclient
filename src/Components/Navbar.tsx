import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import type { RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../Redux/Logic/logicSlice';

const categories: string[] = ['Все', 'Пиццы', 'Роллы', 'Гр.Роллы', 'Фастфуд', 'Салаты']

export const Navbar: React.FC = () => {

  const dispatch = useDispatch()
  const {categoryId} = useSelector((state: RootState) => state.logic)

  return (
    <div>
        <ButtonGroup size='sm' className="navigation w-100">
            {categories.map((c: string, i: number) => (
                <Button key={i} onClick={() => dispatch(setCategoryId(i))} className={categoryId === i ? 'nav-radius-active pt-2 pb-2' : 'nav-radius pt-2 pb-2'} variant="dark">{c}</Button>
            ))}
      </ButtonGroup>
    </div>
  )
}
