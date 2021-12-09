import React, {useEffect} from 'react';
import SiteLayout from "../../layout/SiteLayout";

export default function Settings() {

    useEffect(() => {
        console.log("요청:", "/api/user");
        console.log("응답:", "Access Denied: Unauthorized");
        location.href='/user/login';
    }, []);

    return (
        <SiteLayout>
            <div>
                <h2 style={{
                    lineHeight: '200px',
                    textAlign: 'center'
                }}>User - Settings</h2>
            </div>
        </SiteLayout>
    );
}