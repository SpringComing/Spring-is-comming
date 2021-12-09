import React from 'react';
import Info from "./Info.js";
import Search from "./Search.js";
import Messages from "./Messages.js";
import Notification from "./Notification.js";

const Header = () => {
    return (
        <section className="kanban__header">
        <Search />
        <div className="kanban__header-info">
          <Messages />
          <Notification />
          <Info />
        </div>
      </section>
    );
};

export default Header;