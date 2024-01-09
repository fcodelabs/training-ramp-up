
const Header:React.FC<{text: any}> = ( {text} ) => {
    const headerStyle = {
        paddingRight: '50px', // Add your common styling here
    };

    return (
        <div style={headerStyle}>
            {text}
        </div>
    );
}

export { Header };