import React from 'react';
import SiteLayout from "../layout/SiteLayout"
import Calendar from './Calendar';

const Schedule = () => {
    return (
        <div>
        <SiteLayout>
            <section className="kanban__nav">
                <div className="kanban__nav-wrapper">
                    <div className="kanban__nav-name">
                    <div className="kanban-name">Studio Schedule</div>
                    </div>
                </div>
            </section>
            <section className="kanban__main">
                <Calendar />
                <div className="kanban__main-wrapper" />
            </section>
        </SiteLayout>
        
        
        </div>
    );
};

export default Schedule;