import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #e1e9fc;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  max-height: ${p => p.isSelected() ? '60px' : '0'};
  height: 60px;
  overflow: hidden;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  transition: all 0.5s cubic-bezier(0, 1, 0, 1);

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
   
`;

const SubMenu = ({ item, key, idx, selected, toggle }) => {
    const location = useLocation();

    const isSelected = () => {
        return selected === idx;
    }

  return (
    <>
      <SidebarLink to={item.path ? item.path : location.pathname} onClick={item.subNav && toggle}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && isSelected()
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {item.subNav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink isSelected={() => isSelected()} to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;