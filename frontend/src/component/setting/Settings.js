import React from 'react';
import SiteLayout from "../layout/SiteLayout"

const Settings = () => {
    return (
        <SiteLayout>
            <section className="kanban__nav">
                <div className="kanban__nav-wrapper">
                    <div className="kanban__nav-name">
                    <div className="kanban-name">Studio Settings</div>
                    </div>
                </div>
            </section>
            <section className="kanban__main">
                <div className="kanban__main-wrapper" />
            </section>
        </SiteLayout>
    );
};

export default Settings;