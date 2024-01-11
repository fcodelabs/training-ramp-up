import React from 'react'

const Header: React.FC<{ text: string }> = ({ text }) => {
    const headerStyle = {
        paddingRight: '50px',
    }
    return <div style={headerStyle}>{text}</div>
}

export { Header }
